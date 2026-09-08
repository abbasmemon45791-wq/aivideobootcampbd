import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

const hashData = (data: string) => crypto.createHash('sha256').update(data).digest('hex')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      leadId,
      fileBase64,
      contentType,
      fileName,
      imageHash,
      aiResult,
      transactionId,
      amount,
      recipientNumber,
      senderName,
      direction,
      eventId,
      gaClientId,
    } = body

    if (!leadId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Verify lead exists
    const { data: lead } = await supabaseAdmin
      .from('leads')
      .select('id, name, email, whatsapp, status')
      .eq('id', leadId)
      .maybeSingle()

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 })
    }

    let screenshotUrl: string | undefined

    // Upload screenshot to Supabase Storage if provided
    if (fileBase64) {
      try {
        const imageBuffer = Buffer.from(fileBase64, 'base64')
        const safeFileName = fileName ? `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}` : `${Date.now()}-screenshot.jpg`
        const storagePath = `screenshots/${leadId}/${safeFileName}`

        const { error: uploadError } = await supabaseAdmin.storage
          .from('payment-screenshots')
          .upload(storagePath, imageBuffer, {
            contentType: contentType || 'image/jpeg',
            upsert: false,
          })

        if (!uploadError) {
          const { data: urlData } = supabaseAdmin.storage
            .from('payment-screenshots')
            .getPublicUrl(storagePath)
          screenshotUrl = urlData?.publicUrl
        } else {
          console.warn('[Storage Upload Warning]:', uploadError.message)
        }
      } catch (uploadErr) {
        console.warn('[Storage Upload Error]:', uploadErr)
      }
    }

    const coursePrice = Number(amount) || (process.env.COURSE_PRICE && process.env.COURSE_PRICE !== '1499' ? Number(process.env.COURSE_PRICE) : 799)

    // Insert payment record
    const { error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        lead_id: leadId,
        screenshot_url: screenshotUrl,
        image_hash: imageHash || null,
        transaction_id: transactionId || null,
        amount: coursePrice,
        recipient_number: recipientNumber || null,
        sender_name: senderName || null,
        direction: direction || 'unknown',
        ai_verified: aiResult?.valid ?? false,
        ai_result: aiResult || null,
      })

    if (paymentError) throw paymentError

    // Update lead status
    await supabaseAdmin
      .from('leads')
      .update({ status: 'payment_submitted' })
      .eq('id', leadId)

    // Send Facebook CAPI Purchase Event (Dual-Pixel supported, deduplicated with browser fbq via eventId)
    try {
      const pixelConfigs = [
        { pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID, accessToken: process.env.META_ACCESS_TOKEN },
        { pixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID_2, accessToken: process.env.META_ACCESS_TOKEN_2 || process.env.META_ACCESS_TOKEN },
      ].filter((p): p is { pixelId: string; accessToken: string } => Boolean(p.pixelId && p.accessToken))

      if (pixelConfigs.length > 0 && lead.email && lead.whatsapp) {
        const hashedEmail = hashData(lead.email.toLowerCase().trim())
        const digitsOnly = lead.whatsapp.replace(/\D/g, '')
        const hashedPhone = digitsOnly ? hashData(digitsOnly) : undefined

        const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown'

        // Extract Meta browser cookies for CAPI signal quality
        const cookieHeader = req.headers.get('cookie') ?? ''
        const fbc = cookieHeader.match(/_fbc=([^;]+)/)?.[1]
        const fbp = cookieHeader.match(/_fbp=([^;]+)/)?.[1]

        for (const { pixelId, accessToken } of pixelConfigs) {
          await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: [
                {
                  event_name: 'Purchase',
                  event_time: Math.floor(Date.now() / 1000),
                  action_source: 'website',
                  event_source_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com.bd'}/enroll`,
                  ...(eventId && { event_id: eventId }),
                  user_data: {
                    em: [hashedEmail],
                    ...(hashedPhone && { ph: [hashedPhone] }),
                    client_ip_address: ip,
                    client_user_agent: req.headers.get('user-agent') ?? '',
                    ...(fbc && { fbc }),
                    ...(fbp && { fbp }),
                  },
                  custom_data: {
                    currency: 'BDT',
                    value: coursePrice,
                  }
                }
              ]
            })
          }).catch(err => console.error(`FB CAPI Error (Purchase) for pixel ${pixelId}:`, err))
        }
      }
    } catch (fbErr) {
      console.error('FB CAPI Error (Purchase):', fbErr)
    }

    // Send GA4 Measurement Protocol Purchase Event (Fail-safe server tracking)
    try {
      const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_ID || 'G-ZGRD9GQF40'
      const ga4ApiSecret = process.env.GA4_API_SECRET || 'BjRjRAuDRMKLe5CWhFAF_g'
      if (ga4MeasurementId && ga4ApiSecret) {
        const cid = gaClientId || (lead.email ? hashData(lead.email).substring(0, 16) : 'anonymous_client')
        await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${ga4MeasurementId}&api_secret=${ga4ApiSecret}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: cid,
            events: [{
              name: 'purchase',
              params: {
                transaction_id: transactionId || eventId || leadId,
                value: coursePrice,
                currency: 'BDT',
                items: [{
                  item_id: 'ai-video-bootcamp-bd',
                  item_name: 'AI Video Bootcamp Bangladesh',
                  price: coursePrice,
                  quantity: 1
                }]
              }
            }]
          })
        }).catch(err => console.error('GA4 Measurement Protocol error:', err))
      }
    } catch (ga4Err) {
      console.error('GA4 Measurement Protocol error:', ga4Err)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[POST /api/submit-payment]', err)
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 })
  }
}
