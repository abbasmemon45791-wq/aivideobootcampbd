'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles, CheckCircle, ArrowRight, ArrowDown,
  ChevronDown, Shield, Clock, Users, Star, Zap,
  TrendingUp, Lock, Infinity, RefreshCw, MonitorSmartphone,
  HeadphonesIcon, CalendarDays, Wallet, CirclePlay,
  Briefcase, DollarSign, GraduationCap, Rocket, Mic, Check
} from 'lucide-react'

// ── Config ────────────────────────────────────────────────────────────────
const ENROLLED = 1057
const PRICE = 799
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '8801847800664'
const SUPPORT_EMAIL = 'aivideoboootcamp@gmail.com'

const MODULES = [
  {
    num: '01',
    title: 'Welcome to the Future & AI Creative Stack',
    desc: 'কোর্স ওভারভিউ, AI ক্রিয়েটিভ ইন্ডাস্ট্রির নতুন সুযোগ এবং পুরো কোর্সে যেসব প্রিমিয়াম টুলস ও ওয়ার্কফ্লো ফ্রিতে ব্যবহার করবেন তার কমপ্লিট সেটআপ।'
  },
  {
    num: '02',
    title: 'Mastering AI Logic & Prompt Foundations',
    desc: 'AI যেভাবে চিন্তা ও কাজ করে — Prompt Structures, Context Windows, Tokenization এবং যেকোনো কন্টেন্টের জন্য পারফেক্ট আউটপুট পাওয়ার ফান্ডামেন্টালস।'
  },
  {
    num: '03',
    title: 'Advanced Prompt Engineering Formulas',
    desc: 'প্রুভেন প্রম্পট ফর্মুলা এবং ফ্রেমওয়ার্ক যা দিয়ে প্রতিবার রিয়েলিস্টিক, স্টুডিও-লেভেল ও ব্র্যান্ড-রেডি আউটপুট জেনারেট করবেন।'
  },
  {
    num: '04',
    title: 'AI Image Generation & Studio Product Photography',
    desc: 'Midjourney, Flux, Ideogram — গ্রাফিক ডিজাইনার বা দামি ক্যামেরা ছাড়াই ব্র্যান্ড অ্যাড এবং ই-কমার্সের জন্য 4K স্টুডিও-কোয়ালিটি ভিজ্যুয়াল তৈরি।'
  },
  {
    num: '05',
    title: 'AI Voiceovers & Studio Audio Engineering',
    desc: 'ElevenLabs, Suno — কোনো মাইক বা স্টুডিও ছাড়া আল্ট্রা-রিয়েলিস্টিক বাংলা ও ইংলিশ ভয়েসওভার এবং কাস্টম ব্যাকগ্রাউন্ড মিউজিক জেনারেশন।'
  },
  {
    num: '06',
    title: 'AI Video Generation & Cinematic Motion',
    desc: 'Kling, Runway, Pika — শুধু টেক্সট বা ছবি দিয়ে সিনেমাটিক মোশন ভিডিও ও হাই-কনভার্টিং ভিডিও অ্যাডস তৈরি। আজকের মার্কেটের সবচেয়ে ডিমান্ডিং স্কিল।'
  },
  {
    num: '07',
    title: 'CapCut Pro Editing & Ad Assembly',
    desc: 'CapCut Pro প্রফেশনাল ওয়ার্কফ্লো, অটো-ক্যাপশন, কালার গ্রেডিং এবং সোশ্যাল মিডিয়া (Facebook/TikTok/Reels) অপ্টিমাইজড এক্সপোর্ট সেটিংস।'
  },
  {
    num: '08',
    title: 'Faceless AI Content & Audience Growth',
    desc: 'নিজের মুখ না দেখিয়ে ভাইরাল রিলস ও শর্টস তৈরি, ফেসবুক পেজ অটোমেশন এবং অর্গানিক ফলোয়ার গ্রো করার সিক্রেট স্ট্র্যাটেজি।'
  },
  {
    num: '09',
    title: 'Client Acquisition & Freelancing Systems',
    desc: 'Upwork, Fiverr এবং লোকাল ক্লায়েন্টদের জন্য কোল্ড আউটরিচ স্ক্রিপ্ট, পোর্টফোলিও সেটআপ, প্রজেক্ট প্রাইসিং এবং পেমেন্ট উইথড্রল গাইড।'
  },
  {
    num: '10',
    title: 'Reverse-Engineering Viral Campaigns',
    desc: 'যেকোনো ভাইরাল ভিডিও AI দিয়ে হুবহু রিক্রিয়েট করা এবং লোকাল বা গ্লোবাল ব্র্যান্ডের জন্য হাই-পারফর্মিং ক্যাম্পেইন ডিজাইন করা।'
  },
]

const REVIEWS = [
  {
    name: 'Tanvir Ahmed',
    city: 'Dhaka',
    tag: 'Client Work',
    text: 'প্রথম AI ব্র্যান্ড অ্যাড ক্যাম্পেইন সাকসেসফুলি কমপ্লিট করে ডেলিভার করলাম! ক্লায়েন্ট ভিজ্যুয়াল কোয়ালিটি দেখে ইনস্ট্যান্ট অ্যাপ্রুভ করেছে।'
  },
  {
    name: 'Farhana Yeasmin',
    city: 'Chittagong',
    tag: 'Content Creator',
    text: 'প্রোডাক্ট ফটোগ্রাফি আর ফেসলেস রিলস বানানো এখন অনেক সহজ। আগে যে কাজ ৩ দিন লাগত, এখন ১ ঘণ্টায় সুন্দরভাবে হয়ে যায়।'
  },
  {
    name: 'Saiful Islam',
    city: 'Sylhet',
    tag: 'Viral Reach',
    text: 'একটা AI পডকাস্ট রিল থেকে ২.৮ মিলিয়ন ভিউ এসেছে! ফেসলেস কন্টেন্ট তৈরির স্ট্র্যাটেজি সত্যি ১০০% কার্যকর।'
  },
  {
    name: 'Nazmul Hossain',
    city: 'Rajshahi',
    tag: 'Freelancing',
    text: 'Upwork-এ প্রথম AI ডিজাইন প্রোজেক্ট কমপ্লিট করলাম $120-এ। মডিউল ৯ এর আউটরিচ টেমপ্লেট সত্যি গেম চেঞ্জার ছিল।'
  },
  {
    name: 'Mehedi Hasan',
    city: 'Khulna',
    tag: 'Faceless Page',
    text: 'ফেসবুক পেজ জিরো থেকে ৫০k ফলোয়ারে নিয়ে আসলাম মাত্র ৬ সপ্তাহে। সম্পূর্ণ AI জেনারেটেড ভিডিও দিয়ে অর্গানিক গ্রোথ।'
  },
  {
    name: 'Nusrat Jahan',
    city: 'Gazipur',
    tag: 'Skillset',
    text: 'প্রম্পট ইঞ্জিনিয়ারিং আর প্রোডাক্ট লাইটিং মডিউল একাই পুরো কোর্সের ফি উসুল করার মতো ভ্যালু প্রোভাইড করেছে।'
  },
]

const FAQS = [
  {
    q: 'How will I receive the course? (কোর্সটি কীভাবে পাব?)',
    a: 'পেমেন্ট সম্পন্ন হওয়ার পর আপনি ইমেইল ও WhatsApp-এ আমাদের Learning Management System (LMS) এবং Skool কমিউনিটির প্রাইভেট অ্যাক্সেস লিংক পাবেন। মোবাইল বা পিসি যেকোনো ডিভাইস থেকে যেকোনো সময় দেখতে পারবেন।'
  },
  {
    q: 'Is this suitable for complete beginners? (আমি কি কোনো অভিজ্ঞতা ছাড়াই শিখতে পারব?)',
    a: 'হ্যাঁ, অবশ্যই! কোর্সটি একদম জিরো থেকে স্টেপ-বাই-স্টেপ সাজানো হয়েছে। কোনো পূর্ব কোডিং, ডিজাইনিং বা এডিটিং অভিজ্ঞতার প্রয়োজন নেই। শুধু স্মার্টফোন/ল্যাপটপ ও ইন্টারনেট থাকলেই হবে।'
  },
  {
    q: 'How soon can I start offering services or making content? (কত দিনে কাজ শুরু করতে পারব?)',
    a: 'অধিকাংশ স্টুডেন্ট প্রথম ৩-৪টি মডিউল শেষ করার পরই প্র্যাকটিক্যাল প্রজেক্ট ও পোর্টফোলিও বানানো শুরু করেন। মডিউল ৯-এ ক্লায়েন্ট খোঁজা ও আর্নিং-এর সরাসরি গাইডলাইন রয়েছে।'
  },
  {
    q: 'Can I use free tools throughout the course? (পেইড টুলস কি কিনতে হবে?)',
    a: 'না, কোনো পেইড টুল কেনার বাধ্যবাধকতা নেই। আমরা কোর্সের সাথে স্পেশাল বোনাস মডিউলে প্রিমিয়াম AI টুলস (যেমন Midjourney, ElevenLabs) ফ্রিতে ব্যবহারের লিগ্যাল ট্রিকস শিখিয়ে দিয়েছি।'
  },
  {
    q: 'What is the refund policy? (রিফান্ড পলিসি কী?)',
    a: 'কোর্সের প্রথম ৪টি মডিউল দেখার পর যদি আপনার কাছে ভ্যালুয়েবল মনে না হয়, তাহলে ৭ দিনের মধ্যে আমাদের WhatsApp বা ইমেইলে জানালে কোনো প্রশ্ন ছাড়াই ১০০% ফুল রিফান্ড দেওয়া হবে।'
  },
  {
    q: 'Is this recorded or live? (এটি কি লাইভ নাকি রেকর্ডেড?)',
    a: 'এটি হাই-কোয়ালিটি রেকর্ডেড ভিডিও কোর্স — আপনি নিজের সুবিধামতো সময়ে বারবার দেখতে পারবেন। সাথে থাকবে Skool এবং WhatsApp কমিউনিটি সাপোর্ট এবং ফিউচার সব আপডেটের ফ্রি অ্যাক্সেস।'
  },
]

// ── Module Accordion ───────────────────────────────────────────────────────
function ModuleAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2">
      {MODULES.map((mod, i) => (
        <div key={i} className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${open === i ? 'border-blue-300 shadow-glow-sm' : 'border-slate-200'}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 font-['Sora'] text-xs font-bold text-blue-600">
                Module {mod.num}
              </span>
              <span className="font-['Sora'] text-sm font-bold text-slate-800 sm:text-base">{mod.title}</span>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open === i ? 'rotate-180 text-blue-600' : ''}`} />
          </button>
          {open === i && (
            <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
              {mod.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── FAQ Accordion ──────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-2">
      {FAQS.map((faq, i) => (
        <div key={i} className={`overflow-hidden rounded-xl border transition-colors duration-300 ${open === i ? 'border-blue-200 bg-blue-50/40 shadow-sm' : 'border-slate-200 bg-white'}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold transition-colors duration-300 cursor-pointer ${open === i ? 'text-blue-700' : 'text-slate-800'}`}
          >
            {faq.q}
            <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
          </button>
          {open === i && (
            <div className="border-t border-slate-200/50 px-4 py-3 text-sm leading-relaxed text-slate-600">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── WhatsApp Mockups ───────────────────────────────────────────────────────
function WhatsAppChat({ name, avatarInitial, messages }: { name: string, avatarInitial: string, messages: any[] }) {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border-8 border-slate-900 bg-[#0B141A] shadow-2xl">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-white">
        <span>4:16</span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-white/80" />
          <div className="h-2 w-3 rounded-[2px] bg-white/80" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 bg-[#202C33] px-3 py-2">
        <ArrowRight className="h-5 w-5 rotate-180 text-white" />
        <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 font-bold text-white">
          {avatarInitial}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-white text-sm">{name}</div>
          <div className="text-[10px] text-emerald-400">online</div>
        </div>
        <div className="flex gap-4 pr-2 text-white">
          <MonitorSmartphone className="h-4 w-4" />
          <HeadphonesIcon className="h-4 w-4" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex h-[500px] flex-col gap-2 overflow-y-auto bg-[#0B141A] p-3 pb-6 relative" style={{ backgroundImage: "url('https://static.whatsapp.net/rsrc.php/v3/yl/r/119h9eZ0W9N.png')", backgroundSize: 'cover', opacity: 0.95 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative max-w-[85%] rounded-lg p-1.5 ${msg.isMe ? 'bg-[#005C4B] text-white' : 'bg-[#202C33] text-white'}`}>
              {msg.image && (
                <div className="mb-1 overflow-hidden rounded border border-white/10 bg-slate-800 text-center">
                  {msg.image}
                </div>
              )}
              {msg.text && (
                <div className="px-1 text-[13px] leading-snug">
                  {msg.text}
                </div>
              )}
              <div className="flex items-center justify-end gap-1 px-1 pt-1 text-[9px] text-white/60">
                <span>{msg.time}</span>
                {msg.isMe && <CheckCircle className="h-3 w-3 text-sky-400" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 bg-[#202C33] p-2">
        <div className="flex-1 rounded-full bg-[#2A3942] px-4 py-2 text-sm text-white/50">Message</div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#00A884]">
          <Mic className="h-5 w-5 text-white" />
        </div>
      </div>
    </div>
  )
}

function WhatsAppTestimonials() {
  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:justify-center">
      <WhatsAppChat
        name="Tanvir (Batch 1)"
        avatarInitial="T"
        messages={[
          {
            isMe: false,
            time: '4:13 PM',
            image: (
              <div className="flex h-48 w-full flex-col items-center justify-center bg-slate-900 text-white p-3">
                <div className="text-[10px] font-semibold text-emerald-400 w-full text-left">✓ Asset Delivered</div>
                <div className="text-sm font-bold mt-2 text-center text-slate-100">AI Product Ad Campaign</div>
                <div className="text-[10px] text-slate-400 mt-1">4K Resolution · Studio Lighting</div>
                <div className="mt-4 flex w-full justify-between text-[10px] bg-slate-800/80 rounded p-2">
                  <span>Status</span>
                  <span className="font-bold text-emerald-400">Client Approved</span>
                </div>
                <div className="mt-1 flex w-full justify-between text-[10px] bg-slate-800/80 rounded p-2">
                  <span>Format</span>
                  <span className="font-bold text-cyan-400">9:16 Video + Stills</span>
                </div>
              </div>
            ),
            text: 'প্রথম AI ব্র্যান্ড অ্যাড ক্যাম্পেইন সফলভাবে ডেলিভার করলাম! ক্লায়েন্ট ভিজ্যুয়াল কোয়ালিটি দেখে ইনস্ট্যান্ট অ্যাপ্রুভ করেছে 🤗'
          },
          { isMe: false, time: '4:13 PM', text: 'প্রোডাক্ট লাইটিং আর প্রম্পট ইঞ্জিনিয়ারিং মডিউল থেকে একদম স্টুডিও লেভেল আউটপুট আসছে।' },
          { isMe: false, time: '4:16 PM', text: 'ট্রেইনিংটা ১০০% প্র্যাকটিক্যাল এবং সহজ বাংলায় বোঝানো।' },
          { isMe: true, time: '4:16 PM', text: 'অসাধারণ! শুভকামনা Tanvir ভাই।' }
        ]}
      />

      <WhatsAppChat
        name="Farhana (Batch 1)"
        avatarInitial="F"
        messages={[
          { isMe: true, time: '8:50 AM', text: 'কেমন চলছে আপনার প্রজেক্ট?' },
          {
            isMe: false,
            time: '8:50 AM',
            image: (
              <div className="flex h-48 w-full flex-col items-center justify-center bg-slate-900 text-white p-3">
                <div className="text-[10px] font-semibold w-full text-left mb-2 text-emerald-400">Analytics Overview</div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-slate-800 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-400">Total Views</div>
                    <div className="font-bold text-sm text-cyan-300">2,824,240</div>
                  </div>
                  <div className="bg-slate-800 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-400">Accounts Reached</div>
                    <div className="font-bold text-sm text-emerald-300">2,170,610</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  <div className="bg-slate-800 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-400">Avg Watch Time</div>
                    <div className="font-bold text-sm">11s</div>
                  </div>
                  <div className="bg-slate-800 rounded p-2 text-left">
                    <div className="text-[9px] text-slate-400">New Followers</div>
                    <div className="font-bold text-sm text-cyan-300">+12,240</div>
                  </div>
                </div>
              </div>
            ),
            text: 'ভাইয়া একটা AI পডকাস্ট রিল পুরা ভাইরাল 😍'
          },
          { isMe: false, time: '8:50 AM', text: 'Elevenlabs আর মোশন ভিডিও লেকচারগুলো ফলো করে পেজে ১২k নতুন ফলোয়ার আসলো মাত্র ২৮ দিনে💖' },
          { isMe: false, time: '8:53 AM', text: 'এখন বাচ্চাদের অ্যানিমেশন কনটেন্ট নিয়ে কাজ শুরু করেছি।' }
        ]}
      />
    </div>
  )
}

// ── Outcomes Grid ────────────────────────────────────────────────────────
const OUTCOMES = [
  { icon: '📸', title: 'AI Product Photography', price: 'High Demand', desc: 'কোনো ফিজিক্যাল স্টুডিও বা ক্যামেরা ছাড়াই যেকোনো ব্র্যান্ডের জন্য 4K ফটোশুট।' },
  { icon: '🎬', title: 'UGC Talking Ads', price: 'In-Demand Skill', desc: 'Meta ও TikTok-এর জন্য রিয়েলিস্টিক AI মডেল দিয়ে স্ক্রিপ্ট-বেসড কনভার্টিং অ্যাড।' },
  { icon: '🧠', title: 'AI Influencer Builds', price: 'Growing Market', desc: 'নিজের ফেস না দেখিয়ে সোশ্যাল মিডিয়ায় ভার্চুয়াল পারসোনা ও ফেসলেস ব্র্যান্ড তৈরি।' },
  { icon: '🛍️', title: 'E-com Creative Sets', price: 'Popular Service', desc: 'ই-কমার্স ও এফ-কমার্স শপের জন্য কমপ্লিট প্রোডাক্ট ফটো ও ভিডিও ক্রিয়েটিভ কিট।' },
  { icon: '💬', title: 'Multi-language Ads', price: 'Global Reach', desc: 'বাংলা, ইংলিশ, আরবি সহ যেকোনো ভাষায় এক ক্লিকেই ভিডিও ও ভয়েস ডাবিং।' },
  { icon: '🎨', title: 'Brand Style Systems', price: 'Premium Skill', desc: 'ক্লায়েন্টের জন্য ধারাবাহিক এবং আকর্ষণীয় ব্র্যান্ড ভিজ্যুয়াল ডিজাইন ও প্যালেট।' },
  { icon: '🎙️', title: 'AI Voiceover Reels', price: 'Quick Delivery', desc: 'ক্যাচি হুক, ন্যাচারাল ভয়েস এবং ডায়নামিক মোশন ভিজ্যুয়াল দিয়ে ভাইরাল রিলস।' },
  { icon: '📈', title: 'Performance Creative', price: 'Agency-Level', desc: 'ফেসবুক অ্যাড ক্যাম্পেইনের জন্য হাই-কনভার্টিং রিটার্গেটিং ও টেস্টিং ক্রিয়েটিভ।' },
]

function OutcomesGrid() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
          Core Outcomes
        </div>
        <h2 className="mt-4 font-['Sora'] text-3xl font-bold tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl">
          By the end of this course, you will be able to:
        </h2>
        <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
          কোর্সটি শেষ করার পর আপনি সরাসরি যেসব প্র্যাকটিক্যাল স্কিল ও সার্ভিস প্রোভাইড করতে সক্ষম হবেন:
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="flex flex-col items-start rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 text-left shadow-glass card-premium-hover">
              <div className="text-3xl">{o.icon}</div>
              <h3 className="mt-4 font-['Sora'] font-bold text-slate-900">{o.title}</h3>
              <div className="mt-1 text-xs font-bold text-blue-600 uppercase tracking-wider">{o.price}</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Income Potential & Roadmap ─────────────────────────────────────────────
const INCOMES = [
  { icon: <MonitorSmartphone className="h-5 w-5 text-white" />, title: 'AI Product Photography', price: 'High Demand', desc: 'স্টুডিও ভাড়া ছাড়াই স্টুডিও-কোয়ালিটি প্রোডাক্ট ভিজ্যুয়াল। লোকাল এফ-কমার্স ও গ্লোবাল ই-কমার্স ক্লায়েন্ট।' },
  { icon: <Mic className="h-5 w-5 text-white" />, title: 'UGC Talking Ad Videos', price: 'In-Demand Skill', desc: 'Meta ও TikTok-এ প্রোডাক্ট সেলিংয়ের জন্য রিয়েলিস্টিক AI মডেল অবতার ভিডিও অ্যাডস।' },
  { icon: <TrendingUp className="h-5 w-5 text-white" />, title: 'Monthly Brand Retainers', price: 'Recurring Income', desc: 'প্রতি মাসে ৮ থেকে ৩০টি কনটেন্ট প্যাক ডেলিভারি দিয়ে ব্র্যান্ডের সাথে ফিক্সড মান্থলি কন্ট্রাক্ট।' },
  { icon: <Star className="h-5 w-5 text-white" />, title: 'Faceless AI Channels', price: 'Scalable Growth', desc: 'ইউটিউব, ফেসবুক ও টিকটকে ফেসলেস পেজ বানিয়ে মনিটাইজেশন ও স্পন্সরশিপ ইনকাম।' },
]

function IncomeAndRoadmap() {
  return (
    <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Income Potential */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Market Potential
          </div>
          <h2 className="mt-4 font-['Sora'] text-3xl font-bold tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl">
            In-Demand Skills You&apos;ll Master
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-2xl mx-auto">
            যেসব প্র্যাকটিক্যাল স্কিল শিখে আপনি লোকাল মার্কেট ও আন্তর্জাতিক ফ্রিল্যান্সিংয়ে সার্ভিস অফার করতে পারবেন
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCOMES.map((inc, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 shadow-glass card-premium-hover">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 shadow-md">
                {inc.icon}
              </div>
              <h3 className="mt-4 font-['Sora'] text-sm font-bold text-slate-900 leading-tight">{inc.title}</h3>
              <div className="mt-1 text-xs font-bold text-blue-600 uppercase tracking-wider">{inc.price}</div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">{inc.desc}</p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Bootcamp Roadmap
          </div>
          <h2 className="mt-4 font-['Sora'] text-3xl font-bold tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl">
            From Zero to Professional Creator
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            জিরো থেকে একজন কনফিডেন্ট AI ক্রিয়েটর হওয়ার ৪-ধাপের স্টেপ-বাই-স্টেপ রোডম্যাপ
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { day: 'PHASE 1', step: '01', title: 'Foundations', desc: 'AI ক্রিয়েটিভ স্ট্যাক, টুলস এবং প্রম্পট আর্কিটেকচার মাস্টার করা।' },
            { day: 'PHASE 2', step: '02', title: 'First Asset', desc: 'আপনার প্রথম 4K AI ব্র্যান্ড অ্যাড জেনারেট করে পোর্টফোলিও তৈরি।' },
            { day: 'PHASE 3', step: '03', title: 'First Project', desc: 'কোল্ড আউটরিচ স্ক্রিপ্ট ও প্রপোজাল দিয়ে ক্লায়েন্ট ও ব্র্যান্ডের সাথে কানেক্ট হওয়া।' },
            { day: 'PHASE 4', step: '04', title: 'Scale Skills', desc: 'মাসিক রিটেইনার ও রিকারিং ক্রিয়েটিভ সার্ভিস ডেলিভারি দেওয়া।' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 shadow-glass card-premium-hover relative pt-10">
              <div className="absolute -top-3 left-6 rounded-full bg-[#1A233A] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest">
                {r.day}
              </div>
              <div className="font-['Sora'] text-4xl font-extrabold text-blue-600">{r.step}</div>
              <h3 className="mt-2 font-['Sora'] text-lg font-bold text-slate-900">{r.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Bonuses Bar ────────────────────────────────────────────────────────────
function BonusesBar() {
  return (
    <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl">
      <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
        🎁 FREE BONUSES INCLUDED WITH ENROLLMENT
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {[
          '২০০+ প্রুভেন AI প্রম্পটস প্যাক (Tested Formulas)',
          'পেইড AI টুলস ফ্রিতে ব্যবহারের লিগ্যাল ট্রিকস',
          'bKash ও ফ্রিল্যান্স পেমেন্ট গাইড (Payoneer, Wise)',
          'ক্লায়েন্ট হান্টিং ও আউটরিচ ই-বুক (Cold Email & DM Scripts)',
          'প্রাইভেট WhatsApp ও Skool সাপোর্ট কমিউনিটি অ্যাক্সেস'
        ].map((bonus, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0" />
            <span className="text-slate-300">{bonus}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Who Is This For ────────────────────────────────────────────────────────
const AUDIENCES = [
  { icon: <Sparkles className="h-5 w-5 text-white" />, title: 'Beginner (নতুন শিক্ষার্থী)', desc: 'কোনো আগের কোডিং বা ডিজাইনিং অভিজ্ঞতা নেই? একদম জিরো থেকে প্র্যাকটিক্যাল স্টেপ-বাই-স্টেপ গাইড।' },
  { icon: <Briefcase className="h-5 w-5 text-white" />, title: 'Freelancer (ফ্রিল্যান্সার)', desc: 'Fiverr, Upwork বা লোকাল মার্কেটে হাই-ডিমান্ড AI ক্রিয়েটিভ সার্ভিস অফার করে ইনকাম বাড়ান।' },
  { icon: <Users className="h-5 w-5 text-white" />, title: 'F-Commerce & Shop Owner', desc: 'দামি এজেন্সি বা ডিজাইনারের খরচ বাঁচিয়ে নিজেই নিজের শপের জন্য আকর্ষণীয় প্রোডাক্ট অ্যাড তৈরি করুন।' },
  { icon: <DollarSign className="h-5 w-5 text-white" />, title: 'Global Digital Creator', desc: 'আন্তর্জাতিক ক্লায়েন্টদের জন্য হাই-কোয়ালিটি ভিডিও ও ডিজিটাল ব্র্যান্ডিং অ্যাসেট তৈরি করুন।' },
  { icon: <GraduationCap className="h-5 w-5 text-white" />, title: 'Student (কলেজ/ভার্সিটি)', desc: 'পড়াশোনার পাশাপাশি ইন-ডিমান্ড AI স্কিল শিখে পার্ট-টাইম বা ফ্রিল্যান্সিং ক্যারিয়ার শুরু করুন।' },
  { icon: <Rocket className="h-5 w-5 text-white" />, title: 'Content Creator (ইউটিউবার/পেজ)', desc: 'ইউটিউব, ফেসবুক ও টিকটকে ফেসলেস চ্যানেল বানিয়ে অটোমেটেড ওয়ার্কফ্লোতে অডিয়েন্স গ্রো করুন।' },
]

function WhoIsThisFor() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Target Audience
          </div>
          <h2 className="mt-4 font-['Sora'] text-3xl font-bold tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl">
            Who Is This Bootcamp For?
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            আপনি যদি নিচের যেকোনো একটি ক্যাটাগরির মধ্যে পড়েন — এই কোর্সটি আপনার জন্যই
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((aud, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 shadow-glass card-premium-hover">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 shadow-md">
                {aud.icon}
              </div>
              <h3 className="mt-5 font-['Sora'] text-base font-bold text-slate-900">{aud.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{aud.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const enrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent')
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const utm = params.get('utm_source') || params.get('ref')
      if (utm) {
        localStorage.setItem('lead_source', utm.toLowerCase())
      } else if (!localStorage.getItem('lead_source') && document.referrer) {
        const ref = document.referrer.toLowerCase()
        if (ref.includes('facebook') || ref.includes('fb.com') || ref.includes('instagram')) localStorage.setItem('lead_source', 'facebook')
        else if (ref.includes('google')) localStorage.setItem('lead_source', 'google')
        else if (ref.includes('tiktok')) localStorage.setItem('lead_source', 'tiktok')
        else if (ref.includes('youtube')) localStorage.setItem('lead_source', 'youtube')
      }

      const gclid = params.get('gclid')
      if (gclid && !localStorage.getItem('lead_gclid')) {
        localStorage.setItem('lead_gclid', gclid)
        if (!localStorage.getItem('lead_source')) localStorage.setItem('lead_source', 'google')
      }

      const fbclid = params.get('fbclid')
      if (fbclid && !localStorage.getItem('lead_fbclid')) {
        localStorage.setItem('lead_fbclid', fbclid)
        if (!localStorage.getItem('lead_source')) localStorage.setItem('lead_source', 'facebook')
      }
    }

    const onScroll = () => setHeaderScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-800">
      {/* ── Header ── */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${headerScrolled ? 'shadow-sm' : ''} border-b border-slate-200/60 bg-white/85 backdrop-blur-xl`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white font-bold text-sm shadow-glow-sm">AI</div>
            <div className="leading-tight">
              <div className="font-['Sora'] text-sm font-bold tracking-tight sm:text-base">AI Bootcamp</div>
              <div className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-600">Bangladesh</div>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 md:flex">
            <GraduationCap className="h-3.5 w-3.5" />
            <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
            {ENROLLED}+ স্টুডেন্ট এনরোলড
          </div>

          <Link
            href="/enroll"
            className="btn-premium inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white sm:text-sm"
          >
            Enroll Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="top" className="hero-bg relative overflow-hidden dot-grid">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-8 text-center sm:px-6 sm:pb-8 sm:pt-12 md:pt-10">

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-blue-700 shadow-sm backdrop-blur sm:text-xs">
            🎓 প্র্যাকটিক্যাল AI স্কিলস কোর্স · 10 Structured Modules
          </span>

          <h1 className="mx-auto mt-3 max-w-4xl text-balance font-['Sora'] text-[28px] font-bold leading-[1.15] tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl md:text-5xl">
            Learn <span className="text-gradient">AI Content Creation</span> — From Zero to Professional
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-relaxed text-slate-600 sm:text-base">
            কোনো কোডিং বা দামি ক্যামেরা ছাড়াই শিখুন প্রফেশনাল AI ভিডিও, প্রোডাক্ট ফটোগ্রাফি, UGC অ্যাডস এবং ভাইরাল রিলস তৈরির ফুল ওয়ার্কফ্লো।
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/enroll"
              className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white sm:w-auto sm:text-base"
            >
              Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#modules"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:text-base"
            >
              See Curriculum (সিলেবাস দেখুন) <ArrowDown className="h-5 w-5" />
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm">
            {['১০০% রিফান্ড পলিসি', 'লাইফটাইম অ্যাক্সেস', 'bKash পেমেন্ট সাপোর্টেড'].map(t => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-blue-600" /> {t}
              </span>
            ))}
          </div>

          {/* Stats grid */}
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
            {[
              { val: '10 Modules', label: 'কমপ্লিট মডিউল' },
              { val: 'Lifetime Access', label: 'নিজের সুবিধামতো শিখুন' },
              { val: `৳${PRICE.toLocaleString()}`, label: 'আজকের অফার প্রাইস' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-white px-4 py-4 text-center">
                <div className="text-gradient font-['Sora'] text-sm font-bold leading-tight sm:text-xl md:text-2xl">{s.val}</div>
                {s.label && <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:text-xs">{s.label}</div>}
              </div>
            ))}
          </div>

          {/* Badges row */}
          <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle className="h-3.5 w-3.5" /> All Sessions Recorded · যেকোনো সময় দেখুন
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
              🎓 Hosted on Skool Community
            </span>
          </div>
        </div>
      </section>

      {/* ── Community Section ── */}
      <section className="px-4 pt-8 pb-14 sm:px-6 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-['Sora'] text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
            Inside the <span className="text-gradient">AI Bootcamp BD</span> Skool Community
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            বাংলাদেশের ১,১০০+ AI ক্রিয়েটর ও ফ্রিল্যান্সারদের সাথে নেটওয়ার্কিং, রিসোর্স শেয়ারিং এবং নিয়মিত সাপোর্ট পান।
          </p>
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image src="/community.png" alt="AI Bootcamp BD Skool Community" width={1200} height={800} className="w-full h-auto object-cover" />
          </div>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/enroll" className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white sm:w-auto">
              Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#reviews" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto">
              Read Reviews (রিভিউ দেখুন) <ArrowDown className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="gradient-brand overflow-hidden border-y border-blue-400/30 py-3 text-white">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap text-sm font-semibold">
          {[...Array(3)].flatMap(() => [
            `✦ ৳${PRICE.toLocaleString()} One-Time Payment`,
            `✦ ${ENROLLED}+ Students Enrolled in BD`,
            '✦ 10 Complete Video Modules',
            '✦ Lifetime Access Included',
            '✦ Free Bonus Tools & Prompts',
            '✦ 4-Module Full Refund Policy',
          ]).map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              {item} <span className="opacity-40">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Enrollment Pricing Card ── */}
      <section ref={enrollRef} id="enroll" className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/60 bg-white p-8 shadow-glow sm:p-12">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative text-center sm:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                <GraduationCap className="h-3.5 w-3.5" /> Full Course Enrollment · ফুল কোর্স এনরোলমেন্ট
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-baseline gap-2">
                <div className="font-['Sora'] text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                  ৳{PRICE.toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-slate-500">
                  এককালীন পেমেন্ট · কোনো হিডেন ফি নেই · লাইফটাইম অ্যাক্সেস
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-xl">
                বাংলাদেশের {ENROLLED}+ স্টুডেন্টদের সাথে জয়েন করুন — প্র্যাকটিক্যাল AI কনটেন্ট ক্রিয়েশন, প্রোডাক্ট ফটোগ্রাফি, ভিডিও প্রোডাকশন এবং ক্লায়েন্ট ওয়ার্কফ্লো শিখুন।
              </p>

              <Link
                href="/enroll"
                className="btn-premium mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white"
              >
                Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
              </Link>

              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5 text-blue-600" /> bKash Personal Payment · ১০০% রিফান্ড পলিসি অন্তর্ভুক্ত
              </p>

              {/* What's included */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: <Wallet className="h-5 w-5 text-blue-600" />, label: 'Course Fee', val: `৳${PRICE.toLocaleString()}` },
                  { icon: <Clock className="h-5 w-5 text-blue-600" />, label: 'Duration', val: '10 Hours' },
                  { icon: <Infinity className="h-5 w-5 text-blue-600" />, label: 'Access', val: 'Lifetime' },
                  { icon: <RefreshCw className="h-5 w-5 text-blue-600" />, label: 'Updates', val: 'Free Forever' },
                  { icon: <MonitorSmartphone className="h-5 w-5 text-blue-600" />, label: 'Watch On', val: 'Mobile & PC' },
                  { icon: <CirclePlay className="h-5 w-5 text-blue-600" />, label: 'Replays', val: 'Unlimited' },
                  { icon: <HeadphonesIcon className="h-5 w-5 text-blue-600" />, label: 'Support', val: 'Skool & WhatsApp' },
                  { icon: <CalendarDays className="h-5 w-5 text-blue-600" />, label: 'Batch', val: '2026' },
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
          <BonusesBar />
        </div>
      </section>

      {/* ── Success Stories / Student Showcase ── */}
      <section className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              Student Showcase
            </div>
            <h2 className="mt-3 font-['Sora'] text-3xl font-bold tracking-tight md:-tracking-[0.02em] text-slate-900 sm:text-4xl">
              Real Work Created by Students
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              কোর্সের প্র্যাকটিক্যাল AI ওয়ার্কফ্লো শিখে স্টুডেন্টদের তৈরি করা লাইভ প্রজেক্ট আউটপুট
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { stat: '4K Studio Quality', desc: 'পারফেক্ট লাইটিং ও শ্যাডো ম্যাচিং সহ কমার্শিয়াল প্রোডাক্ট ফটোগ্রাফি শুট।', tag: 'AI Product Shoot' },
              { stat: '2.8M+ Viral Reach', desc: 'কাস্টম ভয়েসওভার এবং সিনেমাটিক মোশন দিয়ে অর্গানিক ভাইরাল রিলস।', tag: 'Content Reach' },
              { stat: 'Client-Approved', desc: 'লোকাল ও ইন্টারন্যাশনাল ক্লায়েন্টদের জন্য সরাসরি ব্র্যান্ড-রেডি ভিডিও অ্যাডস।', tag: 'Client Projects' },
            ].map((story, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-6 shadow-glass card-premium-hover">
                <div className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">{story.tag}</div>
                <div className="mt-3 font-['Sora'] text-2xl font-extrabold text-gradient">{story.stat}</div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{story.desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Chat Testimonials */}
          <div className="mt-16">
            <WhatsAppTestimonials />
          </div>
        </div>
      </section>

      {/* ── Modules (Curriculum) ── */}
      <section id="modules" className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              Complete Curriculum
            </div>
            <h2 className="mt-3 font-['Sora'] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              10 Modules. Zero Fluff.
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              প্রতিটি মডিউল সাজানো হয়েছে প্র্যাকটিক্যাল, পোর্টফোলিও-রেডি স্কিল ডেভেলপমেন্টের জন্য
            </p>
          </div>
          <div className="mt-10">
            <ModuleAccordion />
          </div>

          {/* Bonus card */}
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600">🎁 Exclusive Bonus Module</div>
                <h4 className="mt-1 font-['Sora'] text-xl font-bold text-slate-900">How to Access Paid AI Tools for Free (Legal Workflows)</h4>
                <p className="mt-1 text-sm text-slate-600">Midjourney, ElevenLabs, Runway সহ প্রিমিয়াম AI টুলস কোনো অতিরিক্ত খরচ ছাড়া ব্যবহারের মেথড।</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-slate-400 line-through">৳২,৫০০ Value</div>
                <div className="text-gradient font-['Sora'] text-2xl font-bold">FREE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              Student Reviews
            </div>
            <h2 className="mt-3 font-['Sora'] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              {ENROLLED}+ AI ক্রিয়েটর ও শিক্ষার্থীদের বাস্তব অভিজ্ঞতা ও রিভিউ
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-md p-5 shadow-glass card-premium-hover">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.city}, Bangladesh</div>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">{r.tag}</span>
                </div>
                <div className="mt-2 flex gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OutcomesGrid />
      <IncomeAndRoadmap />
      <WhoIsThisFor />

      {/* ── FAQ ── */}
      <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-4">
              Frequently Asked Questions
            </div>
            <h2 className="font-['Sora'] text-3xl font-bold text-slate-900 sm:text-4xl">Everything You Need to Know</h2>
            <p className="mt-2 text-sm text-slate-500">কোর্স সংক্রান্ত সাধারণ প্রশ্ন ও উত্তর</p>
          </div>
          <div className="mt-8">
            <FAQ />
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ── */}
      <section className="bg-[#0F172A] px-4 py-12 text-white sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <Clock className="mx-auto h-8 w-8 mb-6 text-cyan-400" />
          <h2 className="font-['Sora'] text-3xl font-bold leading-tight sm:text-5xl">
            Start Building Practical <span className="text-cyan-400">AI Skills</span> Today.
          </h2>
          <p className="mt-4 text-sm text-slate-300 sm:text-base max-w-xl mx-auto">
            মাত্র ৳৭৯৯ এককালীন ফি-তে পুরো ১০টি মডিউল, বোনাস প্রম্পট প্যাক এবং Skool কমিউনিটি লাইফটাইম অ্যাক্সেস পান।
          </p>
          <Link
            href="/enroll"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Enroll Now — ৳{PRICE.toLocaleString()} <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Educational & Trademark Disclaimer */}
      <div className="bg-slate-100 border-t border-slate-200 px-4 py-6 sm:px-6 space-y-2">
        <p className="mx-auto max-w-4xl text-center text-[11px] leading-relaxed text-slate-500">
          <strong>Educational Disclaimer:</strong> AI Bootcamp Bangladesh is a digital educational training service. Results depend on individual effort, skill level, practice, and market conditions. We do not guarantee any specific income, earnings, or financial outcomes. See our <Link href="/terms" className="underline hover:text-slate-700">Terms of Service</Link>, <Link href="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>, and <Link href="/refund" className="underline hover:text-slate-700">Refund Policy</Link> for details.
        </p>
        <p className="mx-auto max-w-4xl text-center text-[10px] leading-relaxed text-slate-400">
          <strong>Trademark Notice:</strong> All product names, logos, brands, and trademarks (including Midjourney, ElevenLabs, Runway, Kling, Suno, CapCut) are property of their respective owners. AI Bootcamp Bangladesh is an independent educational program and is not affiliated with, endorsed by, or sponsored by these entities.
        </p>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-900 px-4 py-10 text-white/70 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl gradient-brand text-white font-bold text-sm">AI</div>
            <div>
              <div className="font-['Sora'] text-sm font-bold text-white">AI Bootcamp Bangladesh</div>
              <div className="text-[11px] text-white/50">
                Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-400 hover:underline">{SUPPORT_EMAIL}</a>
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

      {/* ── Floating WhatsApp ── */}
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
