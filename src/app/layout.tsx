import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'AFRICA BUSINESS GATE – RCA',
    template: '%s | AFRICA BUSINESS GATE – RCA',
  },

  description:
    'Plateforme stratégique d’accompagnement des investisseurs, entreprises et partenaires en République Centrafricaine.',

  keywords: [
    'RCA',
    'République Centrafricaine',
    'Investissement RCA',
    'Business RCA',
    'Création entreprise RCA',
    'Invest in CAR',
    'Africa Business Gate',
    'Appels d’offres RCA',
    'Conseil investissement Afrique',
  ],

  authors: [
    {
      name: 'AFRICA BUSINESS GATE – RCA',
    },
  ],

  creator: 'AFRICA BUSINESS GATE – RCA',

  metadataBase: new URL('https://abg-rca.com'),

  openGraph: {
    title: 'AFRICA BUSINESS GATE – RCA',

    description:
      'Votre passerelle stratégique vers les affaires et l’investissement en République Centrafricaine.',

    url: 'https://abg-rca.com',

    siteName: 'AFRICA BUSINESS GATE – RCA',

    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'Africa Business Gate',
      },
    ],

    locale: 'fr_FR',

    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',

    title: 'AFRICA BUSINESS GATE – RCA',

    description:
      'Votre partenaire stratégique en République Centrafricaine.',

    images: ['/images/hero-bg.jpg'],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>

        <LanguageProvider>
          {children}
        </LanguageProvider>

      </body>
    </html>
  )
}