'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Flame, Sparkles, CheckCircle, ArrowRight, ArrowDown,
  ChevronDown, Shield, Clock, Users, Star, Zap, Play,
  TrendingUp, Lock, Infinity, RefreshCw, MonitorSmartphone,
  HeadphonesIcon, CalendarDays, Wallet, CirclePlay, X,
  Briefcase, DollarSign, GraduationCap, Rocket, Mic
} from 'lucide-react'

// ── Config ────────────────────────────────────────────────────────────────
const ENROLLED = 1057
const PRICE = Number(process.env.NEXT_PUBLIC_COURSE_PRICE) || 1499
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801847800664'
const SUPPORT_EMAIL = 'aivideoboootcamp@gmail.com'
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/oxlf7CQxPP4?rel=0&modestbranding=1&playsinline=1'

const MODULES = [
  { num: '01', title: 'Welcome to the Future', desc: 'Course overview, what you will learn and build, and all the tools used throughout the course.' },
  { num: '02', title: 'Understand How AI Works', desc: 'How AI models think and operate — prompts, context windows, and why understanding this gives you an unfair advantage.' },
  { num: '03', title: 'Prompt Engineering Mastery', desc: 'The exact prompt structures, frameworks, and formulas that consistently generate professional-quality results.' },
  { num: '04', title: 'AI Image Generation & Product Photos', desc: 'Midjourney, Flux, Ideogram — create stunning marketing visuals, ecommerce product shots, and ads without a graphic designer.' },
  { num: '05', title: 'AI Voice & Studio Audio', desc: 'ElevenLabs, Suno, and free tools — generate studio-quality voiceovers, sound effects, and custom background music without a microphone.' },
  { num: '06', title: 'AI Video Generation & Cinematic Shots', desc: 'Kling, Runway, Pika — convert text and images into high-quality cinematic video ads. The most in-demand digital skill right now.' },
  { num: '07', title: 'Video Editing & Final Ad Assembly', desc: 'CapCut Pro workflows, auto-captions, pacing, color grading, and optimal export presets for Facebook, Instagram, and TikTok ads.' },
  { num: '08', title: 'Faceless AI Content & Audience Building', desc: 'Build and monetize high-engagement faceless pages and reels channels using automated content systems.' },
  { num: '09', title: 'Client Acquisition & Freelance Business', desc: 'Cold outreach scripts, portfolio building, pricing strategies, client proposals, and closing high-ticket freelance projects.' },
  { num: '10', title: 'Reverse-Engineering Viral Content', desc: 'How to break down top-performing viral ads and replicate high-converting video structures with AI tools.' },
]

const REVIEWS = [
  { name: 'Tanvir Ahmed', city: 'Dhaka', tag: 'Client Work', text: 'Delivered my first paid AI ad campaign right after finishing Module 7! The course teaches practical, real-world skills.' },
  { name: 'Nusrat Jahan', city: 'Chittagong', tag: 'Content Creator', text: 'AI product photography and faceless reels became so effortless. My content creation speed is easily 10x faster now.' },
  { name: 'Shakib Hasan', city: 'Sylhet', tag: 'Viral Reach', text: 'Generated over 2.8 million organic views on Facebook with the AI podcast video workflow taught in Module 8.' },
  { name: 'Ayesha Rahman', city: 'Rajshahi', tag: 'Freelancing', text: 'Secured my first international client project on Upwork for AI video creation. Module 9 alone paid for the course.' },
  { name: 'Hasan Mahmud', city: 'Khulna', tag: 'Faceless Page', text: 'Grew a brand new Facebook page to 50k followers in just 6 weeks using the automated AI content generation techniques.' },
  { name: 'Zarin Tasnim', city: 'Gazipur', tag: 'Prompting', text: 'The prompt engineering formulas are pure gold. The quality of outputs I get from Midjourney and Kling is incredible.' },
]

const FAQS = [
  { q: 'How will I receive the course?', a: 'After completing payment, you will receive instant access to our learning platform via email and WhatsApp. Watch on any smartphone or PC, anytime.' },
  { q: 'Is this suitable for complete beginners?', a: 'Yes! All modules start from zero. No prior experience with video editing, design, or coding is required.' },
  { q: 'What tools will I need?', a: 'A smartphone or computer with internet access. We teach industry-standard tools and include free alternatives so you can start with zero extra cost.' },
  { q: 'Can I watch at my own pace?', a: 'Yes, all modules are fully recorded with lifetime access and unlimited replays. You can learn whenever you have time.' },
  { q: 'What is the refund policy?', a: 'If after watching the first 4 modules you feel this course did not deliver value, simply contact us on WhatsApp for a full refund.' },
  { q: 'How do I pay with bKash?', a: 'Click Enroll Now, fill in your name and WhatsApp, and follow the simple 3-step bKash Send Money instructions on the checkout page.' },
]

const BANGLADESHI_CITIES = [
  'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Gazipur',
  'Barisal', 'Rangpur', 'Comilla', 'Mymensingh', 'Narayanganj', 'Bogra',
  'Jessore', 'Cox\'s Bazar', 'Other'
]

// ── Module Accordion ───────────────────────────────────────────────────────
function ModuleAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {MODULES.map((m, i) => (
        <div
          key={m.num}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-50 text-xs font-bold text-blue-600">
                {m.num}
              </span>
              <span className="text-sm font-bold sm:text-base">{m.title}</span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform ${open === i ? 'rotate-180 text-blue-600' : ''}`}
            />
          </button>
          {open === i && (
            <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 text-xs text-slate-600 sm:text-sm leading-relaxed">
              {m.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── FAQ Accordion ──────────────────────────────────────────────────────────
function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm font-bold sm:text-base">{faq.q}</span>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform shrink-0 ml-2 ${open === i ? 'rotate-180 text-blue-600' : ''}`}
            />
          </button>
          {open === i && (
            <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 text-xs text-slate-600 sm:text-sm leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── Main Page Component ────────────────────────────────────────────────────
export default function LandingPage() {
  const enrollRef = useRef<HTMLDivElement>(null)

  const scrollToEnroll = () => {
    enrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* ── Top Announcement Banner ── */}
      <div className="gradient-brand px-4 py-2 text-center text-xs font-semibold text-white shadow-sm">
        <span className="inline-flex items-center gap-1.5">
          <Flame className="h-4 w-4 fill-amber-300 text-amber-300 animate-pulse" />
          <span>Special Offer: Batch 2026 Registration Open — Only ৳{PRICE.toLocaleString()} (One-Time)</span>
        </span>
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white font-bold text-sm shadow-sm">
              AI
            </div>
            <div>
              <span className="font-['Sora'] text-base font-bold tracking-tight text-slate-900">
                AI Bootcamp
              </span>
              <span className="ml-1.5 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                Bangladesh
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/enroll"
              className="btn-premium inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white sm:text-sm"
            >
              Enroll Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden px-4 pt-10 pb-14 text-center sm:px-6 sm:pt-16 sm:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white" />
        <div className="mx-auto max-w-4xl">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Structured AI Skills Course · 10 Modules</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-['Sora'] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-[1.15]">
            Learn <span className="text-gradient">AI Content Creation</span> — From Zero to Professional
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
            A comprehensive 10-module masterclass teaching you how to create viral AI videos, photorealistic product images, studio voiceovers, and monetizable faceless channels.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/enroll"
              className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white sm:w-auto shadow-lg"
            >
              Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#curriculum"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
            >
              See Curriculum <ArrowDown className="h-5 w-5" />
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-600" /> 100% Money-Back Policy
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-blue-600" /> Lifetime Video Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-purple-600" /> Dedicated bKash Checkout
            </span>
          </div>

          {/* Stats Bar */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
            <div className="bg-white p-4 text-center">
              <div className="font-['Sora'] text-xl font-bold text-slate-900 sm:text-2xl">10</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Video Modules</div>
            </div>
            <div className="bg-white p-4 text-center">
              <div className="font-['Sora'] text-xl font-bold text-slate-900 sm:text-2xl">100% Self-Paced</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">Watch Anytime</div>
            </div>
            <div className="bg-white p-4 text-center">
              <div className="font-['Sora'] text-xl font-bold text-blue-600 sm:text-2xl">৳{PRICE.toLocaleString()}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">One-Time Fee</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video Trailer / Preview ── */}
      <section className="bg-slate-900 px-4 py-12 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-cyan-300">
            <Play className="h-3.5 w-3.5 fill-cyan-300" /> Course Overview
          </div>
          <h2 className="mt-3 font-['Sora'] text-2xl font-bold sm:text-4xl">
            Watch What You Will Create
          </h2>
          <p className="mt-2 text-xs text-white/70 sm:text-sm max-w-lg mx-auto">
            From photorealistic product ads to viral cinematic short films — here is a quick look at the skills you will master.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-video bg-black">
            <iframe
              src={YOUTUBE_EMBED}
              title="AI Bootcamp Course Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* ── Curriculum / Modules ── */}
      <section id="curriculum" className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
              <GraduationCap className="h-3.5 w-3.5" /> Full Curriculum
            </div>
            <h2 className="mt-3 font-['Sora'] text-2xl font-extrabold sm:text-4xl text-slate-900">
              10 In-Depth Modules
            </h2>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Step-by-step practical videos covering prompt engineering, image design, audio, video, editing, and client acquisition.
            </p>
          </div>
          <div className="mt-8">
            <ModuleAccordion />
          </div>
        </div>
      </section>

      {/* ── Reviews / Social Proof ── */}
      <section className="bg-white px-4 py-14 border-y border-slate-200 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> Student Success Stories
            </div>
            <h2 className="mt-3 font-['Sora'] text-2xl font-extrabold sm:text-4xl text-slate-900">
              Feedback From Students in Bangladesh
            </h2>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              See what creators and freelancers across Dhaka, Chittagong, Sylhet, and Rajshahi are saying.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <span className="text-xs text-slate-500">{rev.city}, Bangladesh</span>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                    {rev.tag}
                  </span>
                </div>
                <div className="mt-2 flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Section ── */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-['Sora'] text-2xl font-bold text-slate-900 sm:text-4xl">
            Join The <span className="text-gradient">AI Bootcamp Bangladesh</span> Community
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">
            Connect with over 1,000+ active students, participate in weekly challenges, and collaborate with top creators.
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/community.png"
              alt="AI Bootcamp BD Skool Community"
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="bg-slate-100/70 px-4 py-14 border-t border-slate-200 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700">
              Frequently Asked Questions
            </div>
            <h2 className="mt-3 font-['Sora'] text-2xl font-extrabold sm:text-4xl text-slate-900">
              Got Questions? We&apos;ve Got Answers.
            </h2>
          </div>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ── Enrollment Section ── */}
      <section ref={enrollRef} className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/80 bg-white p-8 shadow-xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <GraduationCap className="h-3.5 w-3.5" /> Complete Video Course
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline gap-2">
                <div className="font-['Sora'] text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                  ৳{PRICE.toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  One-time payment · No subscriptions · Lifetime access
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-xl">
                Join {ENROLLED}+ students in Bangladesh mastering practical AI video generation, image creation, studio voiceovers, and freelance workflows.
              </p>

              <Link
                href="/enroll"
                className="btn-premium mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg"
              >
                Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
              </Link>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5 text-blue-600" /> Secure bKash payment · 100% Refund Guarantee
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: <Wallet className="h-5 w-5 text-blue-600" />, label: 'Fee', val: `৳${PRICE.toLocaleString()}` },
                  { icon: <Clock className="h-5 w-5 text-blue-600" />, label: 'Duration', val: '10 Modules' },
                  { icon: <Infinity className="h-5 w-5 text-blue-600" />, label: 'Access', val: 'Lifetime' },
                  { icon: <RefreshCw className="h-5 w-5 text-blue-600" />, label: 'Updates', val: 'Free Forever' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-center">
                    {item.icon}
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-400">{item.label}</div>
                    <div className="mt-0.5 font-['Sora'] text-sm font-bold text-slate-800">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 bg-slate-900 px-4 py-10 text-white/70 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white font-bold text-sm">
              AI
            </div>
            <div>
              <div className="font-['Sora'] text-sm font-bold text-white">AI Bootcamp Bangladesh</div>
              <div className="text-[11px] text-white/50">
                Contact: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:underline">{SUPPORT_EMAIL}</a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/60 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="text-white/60 hover:text-white transition-colors">Refund Policy</Link>
            <Link href="/contact" className="text-white/60 hover:text-white transition-colors">Contact Us</Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">WhatsApp Support</a>
          </div>
          <div className="text-xs text-white/40">© 2026 AI Bootcamp Bangladesh. All rights reserved.</div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ── */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 5.834h-.004c-1.271-.05-2.521-.349-3.67-.877l-.263-.119-2.727.716.73-2.66-.172-.273a7.53 7.53 0 0 1-1.16-4.03c0-4.188 3.406-7.592 7.594-7.592 4.188 0 7.592 3.404 7.592 7.592 0 4.188-3.404 7.593-7.592 7.593m6.743-13.831c-1.807-1.808-4.209-2.804-6.765-2.804-5.27 0-9.56 4.29-9.56 9.56 0 1.683.439 3.321 1.271 4.762l-1.351 4.94 5.051-1.324a9.55 9.55 0 0 0 4.589 1.173c5.27 0 9.56-4.29 9.56-9.56 0-2.556-.996-4.958-2.795-6.767" />
        </svg>
      </a>
    </div>
  )
}
