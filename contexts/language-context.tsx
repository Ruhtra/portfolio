"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string | number
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

// Importações estáticas com lazy loading
const translations = {
  pt: () => import("@/translations/pt").then(module => module.pt),
  en: () => import("@/translations/en").then(module => module.en)
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("pt")
  const [isLoading, setIsLoading] = useState(true)
  const [translationsData, setTranslationsData] = useState<Record<string, Record<string, string | number>>>({})

  useEffect(() => {
    const initializeLanguage = async () => {
      setIsLoading(true)

      try {
        // Verificar preferência salva
        const savedLanguage = localStorage.getItem("language") as Language
        const currentLanguage = savedLanguage && (savedLanguage === "pt" || savedLanguage === "en")
          ? savedLanguage
          : "pt"

        setLanguage(currentLanguage)

        // Carregar traduções do idioma atual primeiro
        const currentTranslations = await translations[currentLanguage]()

        // Carregar outras traduções em background
        const allTranslations = {
          [currentLanguage]: currentTranslations
        } as Record<string, Record<string, string | number>>

        // Carregar outros idiomas sem bloquear
        const otherLanguage = currentLanguage === "pt" ? "en" : "pt"
        translations[otherLanguage]().then(otherTranslations => {
          allTranslations[otherLanguage] = otherTranslations
          setTranslationsData(allTranslations)
        })

        setTranslationsData(allTranslations)

        // Atualizar o atributo lang do HTML
        document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en"
      } catch (error) {
        console.error("Error loading translations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeLanguage()
  }, [])

  const handleSetLanguage = async (newLanguage: Language) => {
    // Se as traduções do novo idioma ainda não foram carregadas, carregue-as
    if (!translationsData[newLanguage]) {
      setIsLoading(true)
      try {
        const newTranslations = await translations[newLanguage]()
        setTranslationsData(prev => ({
          ...prev,
          [newLanguage]: newTranslations
        }))
      } catch (error) {
        console.error("Error loading new language:", error)
      } finally {
        setIsLoading(false)
      }
    }

    setLanguage(newLanguage)
    localStorage.setItem("language", newLanguage)
    document.documentElement.lang = newLanguage === "pt" ? "pt-BR" : "en"
  }

  const t = (key: string): string | number => {
    if (isLoading || !translationsData[language]) return key
    return translationsData[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isLoading }}>
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