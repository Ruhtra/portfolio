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



  // Adicione um efeito para mostrar loading apenas no client
  const [isClient, setIsClient] = useState(false)

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



  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mostra loading apenas no client
  if (!isClient || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          {/* Animated Logo/Spinner */}
          <div className="relative h-20 w-20">
            {/* Outer rotating ring - CSS animation */}
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

            {/* Inner pulsing circle */}
            <div className="absolute inset-0 m-auto h-14 w-14 animate-pulse rounded-full bg-gradient-to-br from-primary to-purple-500 opacity-60" />

            {/* Center dot */}
            <div className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-background" />
          </div>

          {/* Loading text with dots */}
          <div className="flex items-center gap-1">
            <span className="text-base font-medium text-foreground">Carregando</span>
            <span className="flex gap-0.5">
              <span className="animate-bounce text-base font-medium text-primary [animation-delay:0ms]">.</span>
              <span className="animate-bounce text-base font-medium text-primary [animation-delay:150ms]">.</span>
              <span className="animate-bounce text-base font-medium text-primary [animation-delay:300ms]">.</span>
            </span>
          </div>

          {/* Simple progress bar */}
          <div className="h-1 w-40 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-primary to-purple-500" />
          </div>
        </div>
      </div>
    )
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