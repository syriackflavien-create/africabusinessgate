'use client'

import {
  createContext,
  useContext,
  useState,
} from 'react'

type Language = 'fr' | 'en'

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext =
  createContext<LanguageContextType>({
    lang: 'fr',
    setLang: () => {},
  })

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {

  const [lang, setLang] =
    useState<Language>('fr')

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}