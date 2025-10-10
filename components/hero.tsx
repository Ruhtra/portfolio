"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Globe, Download, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"


import { Github, Linkedin, Printer } from "lucide-react"

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context"
import { Print } from "./print"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Adiciona um pequeno delay para garantir que a animação de entrada tenha terminado
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 relative">
      <motion.div className="space-y-6 max-w-3xl" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <motion.div
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src="/picture.jpeg?height=400&width=400"
              alt="Kawan Arthur"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 224px, 288px"
              priority
              quality={95}
            />
          </motion.div>
          <motion.div className="space-y-4" variants={itemVariants}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Kawan Arthur</span>
              {/* Nickname com mais destaque */}
              <div className="flex items-center justify-center mt-1 mb-2">
                <span className="text-xl sm:text-2xl font-medium bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
                  Ruhtra
                </span>
              </div>
              <span className="block mt-2 gradient-text">{t("hero.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("hero.subtitle")}</p>
          </motion.div>
        </div>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" variants={itemVariants}>
          <Button size="lg" className="rounded-full group" onClick={() => scrollToSection("projects")}>
            <span>{t("hero.cta.projects")}</span>
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full group bg-transparent"
            onClick={() => scrollToSection("about")}
          >
            <span>{t("hero.cta.about")}</span>
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
          </Button>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Print />

          </motion.div>
        </motion.div>

        {/* Language notice for recruiters */}
        <motion.div className="mt-8 pt-4 border-t border-border/50" variants={itemVariants}>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4 text-primary" />
            <p className="text-sm">
              {language === "pt"
                ? "This portfolio is also available in English. You can change the language in the navigation bar."
                : "Este portfólio também está disponível em Português. Você pode alterar o idioma na barra de navegação."}
            </p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <button
          onClick={() => scrollToSection("about")}
          aria-label="Rolar para baixo"
          className="block p-2 hover:text-primary transition-colors"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </motion.div>
        </button>
      </motion.div>



    </section>



  )
}
