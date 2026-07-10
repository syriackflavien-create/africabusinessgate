'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react'
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const content = {
  fr: {
    navigation: 'Navigation',
    services: 'Services',
    contact: 'Contact',
    newsletter: 'Newsletter',
    emailPlaceholder: 'Votre email',
    description:
      'Plateforme stratégique d’accompagnement des investisseurs, entreprises, institutions et membres de la diaspora en République Centrafricaine.',
    nav: [
      ['Accueil', '/'],
      ['À propos', '/about'],
      ['Services', '/services'],
      ['Investir en RCA', '/invest-in-rca'],
      ["Appels d’offres", '/tenders'],
      ['Actualités', '/news'],
      ['Contact', '/contact'],
    ],
    serviceList: [
      'Création d’entreprise',
      'Conseil en investissement',
      'Représentation locale',
      "Appels d’offres",
      'Domiciliation',
      'Recrutement local',
      'Assistance juridique',
    ],
    address: 'Saydou, Bangui, République Centrafricaine',
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
  en: {
    navigation: 'Navigation',
    services: 'Services',
    contact: 'Contact',
    newsletter: 'Newsletter',
    emailPlaceholder: 'Your email',
    description:
      'Strategic platform supporting investors, companies, institutions and members of the diaspora in the Central African Republic.',
    nav: [
      ['Home', '/'],
      ['About', '/about'],
      ['Services', '/services'],
      ['Invest in CAR', '/invest-in-rca'],
      ['Tenders', '/tenders'],
      ['News', '/news'],
      ['Contact', '/contact'],
    ],
    serviceList: [
      'Company creation',
      'Investment consulting',
      'Local representation',
      'Tender support',
      'Business domiciliation',
      'Local recruitment',
      'Legal assistance',
    ],
    address: 'Saydou, Bangui, Central African Republic',
    rights: 'All rights reserved.',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
  },
}

export default function Footer() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const t = content[lang]

  return (
    <footer className="bg-[#071739] text-white pt-24 pb-8">
      <div className="max-w-[1450px] mx-auto px-6">

        <div className="flex justify-end mb-10 gap-3 font-bold">
  <span
    onClick={() => setLang('fr')}
    className={`${lang === 'fr' ? 'text-[#D4A63D]' : 'text-white'} cursor-pointer`}
  >
    FR
  </span>

  <span>|</span>

  <span
    onClick={() => setLang('en')}
    className={`${lang === 'en' ? 'text-[#D4A63D]' : 'text-white'} cursor-pointer`}
  >
    EN
  </span>
</div>

        <div className="grid lg:grid-cols-4 gap-14">
          <div>
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Africa Business Gate" width={70} height={70} />
              <div>
                <h2 className="text-2xl font-extrabold">AFRICA BUSINESS</h2>
                <p className="text-[#D4A63D] font-bold">GATE – RCA</p>
              </div>
            </div>

            <p className="text-gray-300 leading-8 mt-6">{t.description}</p>

            <div className="flex gap-4 mt-8">
              <a href="https://www.facebook.com/" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A63D] hover:text-[#071739] transition">
                <FaFacebookF />
              </a>
              <a href="https://www.linkedin.com/"
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A63D] hover:text-[#071739] transition">
                <FaLinkedinIn />
              </a>
              <a
                href="https://wa.me/23672165327"
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A63D] hover:text-[#071739] transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">{t.navigation}</h3>
            <ul className="space-y-4 text-gray-300">
              {t.nav.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-[#D4A63D]">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">{t.services}</h3>
            <ul className="space-y-4 text-gray-300">
              {t.serviceList.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">{t.contact}</h3>

            <div className="space-y-5 text-gray-300">
              <div className="flex gap-4">
                <MapPin className="text-[#D4A63D] shrink-0" />
                <p>{t.address}</p>
              </div>

              <div className="flex gap-4">
                <Mail className="text-[#D4A63D] shrink-0" />
                <p>contact@abg-rca.com</p>
              </div>

              <div className="flex gap-4">
                <Phone className="text-[#D4A63D] shrink-0" />
                <p>+236 72 16 53 27</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold mb-4">{t.newsletter}</h4>

              <div className="flex bg-white rounded-2xl overflow-hidden">
                <input
  suppressHydrationWarning
  placeholder={t.emailPlaceholder}
  className="flex-1 px-5 py-4 text-[#071739] outline-none"
/>
                <span className="bg-[#D4A63D] px-5 text-[#071739] flex items-center cursor-pointer">
                  <ArrowRight />
                </span>              
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4 text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} AFRICA BUSINESS GATE – RCA. {t.rights}
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-[#D4A63D]">{t.legal}</a>
            <a href="#" className="hover:text-[#D4A63D]">{t.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}