import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Sora, Plus_Jakarta_Sans, Hind_Siliguri } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['400','600','700','800'] })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', weight: ['500','600','700'] })
const hind = Hind_Siliguri({ subsets: ['bengali', 'latin'], weight: ['400', '500', '600', '700'], variable: '--font-hind' })

export const metadata: Metadata = {
  title: 'AI Video Bootcamp Bangladesh — Practical AI Content Creation Course',
  description: 'Learn practical AI content creation in Bangladesh. Master AI video generation, prompt engineering, product photography, and creative workflows. 10 structured modules.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com.bd'),
  openGraph: {
    type: 'website',
    title: 'AI Video Bootcamp Bangladesh',
    description: 'Learn practical AI video generation and creative workflows. BDT ৳799 one-time payment. Lifetime access.',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // GA4 Measurement ID
  const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || ''

  return (
    <html lang="bn" className={`${inter.variable} ${sora.variable} ${jakarta.variable} ${hind.variable}`}>
      <body className="font-[var(--font-hind),Inter,sans-serif] antialiased">
        {/* Meta Pixel (Dual-Pixel: Primary & Secondary / Backup) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            ${process.env.NEXT_PUBLIC_FB_PIXEL_ID ? `fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');` : ''}
            ${process.env.NEXT_PUBLIC_FB_PIXEL_ID_2 ? `fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID_2}');` : ''}
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Analytics 4 — gtag.js */}
        {GA4_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            strategy="afterInteractive"
          />
        )}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              allow_enhanced_conversions: true,
              send_page_view: true
            });
          `}
        </Script>

        {children}
      </body>
    </html>
  )
}
