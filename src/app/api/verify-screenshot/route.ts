import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'
import type { VerificationResult } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Your bKash account number for Bangladesh
const VALID_RECIPIENT_NUMBERS = [
  process.env.NEXT_PUBLIC_BKASH_NUMBER ?? '01896195441',
].filter(Boolean)

const COURSE_PRICE = parseInt(process.env.COURSE_PRICE ?? '1499')
const PRICE_TOLERANCE_LOW  = COURSE_PRICE - 150   // e.g. 1349
const PRICE_TOLERANCE_HIGH = COURSE_PRICE + 500   // e.g. 1999

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fileBase64, contentType, localTime } = body

    if (!fileBase64 || !contentType?.startsWith('image/')) {
      return NextResponse.json({ valid: false, reason: 'Invalid file type.' })
    }

    // ── Layer 1: SHA-256 duplicate check ──────────────────────────────────
    const imageBuffer = Buffer.from(fileBase64, 'base64')
    const imageHash = crypto.createHash('sha256').update(imageBuffer).digest('hex')

    const { data: dupCheck } = await supabaseAdmin
      .from('payments')
      .select('id, lead_id')
      .eq('image_hash', imageHash)
      .maybeSingle()

    if (dupCheck) {
      return NextResponse.json({
        valid: false,
        reason: 'This screenshot has already been submitted. Please send a fresh payment and upload the new receipt.',
        duplicate: true,
      })
    }

    // ── Layer 2: Gemini Flash Vision AI Verification ──────────────────────
    const prompt = `You are a payment verification system for a Bangladeshi online course.
Analyze this payment screenshot and extract the following information as JSON.

RULES:
- Look for Bangladeshi mobile financial service apps: bKash, Nagad, Rocket (Dutch-Bangla Mobile Banking), Upay, or any Bangladeshi bank app
- bKash is the primary expected method — it has a bright pink/red app interface with white text
- Identify the direction: was money SENT or RECEIVED by the screenshot owner
- Extract the recipient bKash/mobile number (the TO field — should be an 11-digit Bangladeshi mobile number starting with 01)
- Extract the exact amount transferred in BDT (Bangladeshi Taka, ৳)
- Extract the Transaction ID (TrxID) — bKash uses alphanumeric IDs like "ABP5G03JDY"
- Extract the timestamp of the transaction
- Determine if this is a genuine payment receipt. You MUST rigorously check for signs of manipulation, photo editing, text-overlay, AI generation, or if it is a screenshot of a screenshot. If it looks fake, tampered with, or AI generated, set valid to false and provide a reason.

Return ONLY valid JSON, no markdown, no explanation:
{
  "valid": boolean,
  "platform": "bkash" | "nagad" | "rocket" | "bank_transfer" | "unknown",
  "direction": "sent" | "received" | "unknown",
  "recipient_number": "string or null",
  "sender_name": "string or null",
  "amount": number or null,
  "transaction_id": "string or null",
  "date_time": "string or null",
  "status": "successful" | "pending" | "failed" | "unknown",
  "reason": "brief explanation if invalid, null if valid"
}

Submitted at local time: ${localTime}`

    const FALLBACK_MODELS = [
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-3.1-flash-lite',
      'gemini-2.5-flash',
      'gemini-flash-latest'
    ]

    let result;
    let lastError;

    for (const modelName of FALLBACK_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        result = await model.generateContent([
          prompt,
          { inlineData: { mimeType: contentType, data: fileBase64 } },
        ])
        break
      } catch (e) {
        console.warn(`Model ${modelName} failed, trying next...`)
        lastError = e
      }
    }

    if (!result) {
      throw lastError || new Error('All Gemini models are currently unavailable.')
    }

    let aiResult: VerificationResult
    try {
      const text = result.response.text().trim()
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      aiResult = JSON.parse(jsonMatch?.[0] ?? text)
    } catch {
      return NextResponse.json({
        valid: false,
        reason: 'Could not read the screenshot. Please upload a clear, unedited screenshot.',
      })
    }

    // ── Layer 3: Business Rule Validation ─────────────────────────────────
    const validationErrors: string[] = []

    // Must be a SENT transaction (not received)
    if (aiResult.direction === 'received') {
      validationErrors.push('This screenshot shows money being received, not sent.')
    }

    // Recipient number must match your bKash account
    const recipientNormalized = aiResult.recipient_number?.replace(/\s|-/g, '') ?? ''
    const recipientValid = VALID_RECIPIENT_NUMBERS.some(n =>
      recipientNormalized.includes(n.replace(/\s|-/g, ''))
    )
    if (aiResult.recipient_number && !recipientValid) {
      validationErrors.push(`Payment was sent to wrong bKash number (${aiResult.recipient_number}). Please send to the correct bKash number.`)
    }

    // Amount must be within tolerance
    if (aiResult.amount !== null && aiResult.amount !== undefined) {
      if (aiResult.amount < PRICE_TOLERANCE_LOW) {
        validationErrors.push(`Amount ৳${aiResult.amount} is less than required ৳${COURSE_PRICE}. Please send the correct amount.`)
      } else if (aiResult.amount > PRICE_TOLERANCE_HIGH) {
        validationErrors.push(`Amount ৳${aiResult.amount} seems too high. Please contact us on WhatsApp.`)
      }
    }

    // Payment must be successful
    if (aiResult.status === 'failed') {
      validationErrors.push('This transaction shows as failed. Please complete the payment and upload a successful receipt.')
    }
    if (aiResult.status === 'pending') {
      validationErrors.push('This transaction is still pending. Please wait for it to complete and then upload the receipt.')
    }

    // Check transaction ID for duplicates (in addition to image hash)
    if (aiResult.transaction_id) {
      const { data: txDup } = await supabaseAdmin
        .from('payments')
        .select('id')
        .eq('transaction_id', aiResult.transaction_id)
        .maybeSingle()

      if (txDup) {
        validationErrors.push('This transaction ID has already been used. Please contact us on WhatsApp if you think this is an error.')
      }
    }

    const isValid = aiResult.valid && validationErrors.length === 0

    return NextResponse.json({
      valid: isValid,
      imageHash,
      aiResult,
      senderName: aiResult.sender_name,
      amount: aiResult.amount,
      transactionId: aiResult.transaction_id,
      recipientNumber: aiResult.recipient_number,
      direction: aiResult.direction,
      reason: validationErrors.length > 0
        ? validationErrors[0]
        : (!isValid ? aiResult.reason : null),
    })
  } catch (err) {
    console.error('[POST /api/verify-screenshot]', err)
    return NextResponse.json({
      valid: false,
      reason: err instanceof Error ? `System Error: ${err.message}` : 'Verification failed. Please try again or contact support.',
    }, { status: 500 })
  }
}
