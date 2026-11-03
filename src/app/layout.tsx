import type { Metadata } from 'next'
import { Be_Vietnam_Pro, Fraunces } from 'next/font/google'
import Script from 'next/script'
import { GOOGLE_TAG_ID, CONVERSION_CONTATO } from '@/lib/googleAds'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Advogado Criminalista na Grande Vitória, ES | Garcia & Marangoni',
  description: 'Defesa criminal em prisão em flagrante, audiência de custódia, Habeas Corpus, inquérito e processo criminal. Atendimento presencial e online, com sigilo total.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={beVietnamPro.className}>
      <head>
        <style>{`h1,h2,h3,h4,h5,h6{font-family:${fraunces.style.fontFamily},serif}`}</style>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
            // Conversão "Contato": qualquer clique num link do WhatsApp da página
            document.addEventListener('click', function (e) {
              var a = e.target instanceof Element && e.target.closest('a[href*="wa.me/"]');
              if (a) gtag('event', 'conversion', { send_to: '${CONVERSION_CONTATO}' });
            });
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
