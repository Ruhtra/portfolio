"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("pt")
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({})

  useEffect(() => {
    // Verificar se há uma preferência de idioma salva
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }

    // Carregar as traduções
    const loadTranslations = async () => {
      const ptTranslations = await import("@/translations/pt.json").then((module) => module.default)
      const enTranslations = await import("@/translations/en.json").then((module) => module.default)

      setTranslations({
        pt: ptTranslations,
        en: enTranslations,
      })
    }

    loadTranslations()
  }, [])

  // Função para alterar o idioma e salvar a preferência
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = newLanguage === "pt" ? "pt-BR" : "en"
  }

  // Função para obter uma tradução
  const t = (key: string): string => {
    if (!translations[language]) return key
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
