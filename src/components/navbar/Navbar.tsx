'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'

const translations = {
  fr: {
    navItems: [
      { name: 'ACCUEIL', href: '/' },
      { name: 'À PROPOS', href: '/about' },
      { name: 'SERVICES', href: '/services', dropdown: true },
      { name: 'INVESTIR EN RCA', href: '/invest-in-rca' },
      { name: "APPELS D'OFFRES", href: '/tenders' },
      { name: 'ACTUALITÉS', href: '/news' },
      { name: 'CONTACT', href: '/contact' },
    ],
    client: 'ESPACE CLIENT',
  },
  en: {
    navItems: [
      { name: 'HOME', href: '/' },
      { name: 'ABOUT', href: '/about' },
      { name: 'SERVICES', href: '/services', dropdown: true },
      { name: 'INVEST IN CAR', href: '/invest-in-rca' },
      { name: 'TENDERS', href: '/tenders' },
      { name: 'NEWS', href: '/news' },
      { name: 'CONTACTS', href: '/contact' },
    ],
    client: 'CLIENT AREA',
  },
}

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const { lang, setLang } = useLanguage()

  const t = translations[lang]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#071739]/95 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-[1450px] mx-auto px-6">
        <div className="flex justify-between items-center h-[90px]">

          <a href="/" className="flex items-center gap-3">
            <Image
              src="logo.png"
              alt="Africa Business Gate"
              width={120}
              height={120}
              className="h-12 w-auto"
              priority
              sizes="100vw"
            />

            <div className="leading-tight">
              <h2 className="text-white font-bold text-xl">
                AFRICA BUSINESS
              </h2>

              <span className="text-[#D4A63D] font-semibold text-lg">
                GATE
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-8">
            {t.navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 text-white text-sm font-semibold hover:text-[#D4A63D] transition duration-300"
              >
                {item.name}
                {item.dropdown && <ChevronDown size={16} />}
              </a>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <button
                onClick={() => setLang('fr')}
                className={lang === 'fr' ? 'text-[#D4A63D]' : 'hover:text-[#D4A63D] transition'}
              >
                FR
              </button>

              <span>|</span>

              <button
                onClick={() => setLang('en')}
                className={lang === 'en' ? 'text-[#D4A63D]' : 'hover:text-[#D4A63D] transition'}
              >
                EN
              </button>
            </div>

            <a
              href="/client/login"
              className="bg-[#D4A63D] hover:bg-[#e0b04a] transition px-6 py-3 rounded-lg text-[#071739] font-bold text-sm shadow-lg"
            >
              {t.client}
            </a>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="xl:hidden text-white"
          >
            {mobileMenu ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div className="xl:hidden bg-[#071739] border-t border-white/10">
          <div className="flex flex-col px-6 py-6 gap-5">
            {t.navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="text-white font-medium"
              >
                {item.name}
              </a>
            ))}

            <div className="flex items-center gap-4 pt-4 border-t border-white/20">
              <button
                onClick={() => setLang('fr')}
                className={lang === 'fr' ? 'text-[#D4A63D] font-semibold' : 'text-white'}
              >
                FR
              </button>

              <button
                onClick={() => setLang('en')}
                className={lang === 'en' ? 'text-[#D4A63D] font-semibold' : 'text-white'}
              >
                EN
              </button>
            </div>

            <a
              href="/client/login"
              className="bg-[#D4A63D] text-center py-4 rounded-xl text-[#071739] font-bold mt-4"
            >
              {t.client}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}