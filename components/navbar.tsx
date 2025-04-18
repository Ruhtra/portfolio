"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
// Importe o useLanguage
import { useLanguage } from "@/contexts/language-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Modifique a função Navbar para usar as traduções
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  // Adicionar o efeito de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Atualize os links de navegação para usar as traduções
  const navLinks = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ]

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
  }

  // Função para scroll suave
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    // Fechar o menu mobile se estiver aberto
    if (isOpen) {
      setIsOpen(false)
    }
  }

  // Obter o nome do idioma atual para exibição
  const getCurrentLanguageName = () => {
    return language === "pt" ? "Português" : "English"
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xl font-bold transition-colors hover:text-primary"
            >
              <span className="gradient-text">Kawan Arthur</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-6"
            initial="hidden"
            animate="visible"
            variants={navVariants}
          >
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={itemVariants}>
                <button
                  onClick={() => scrollToSection(link.href.substring(1))}
                  className="text-sm font-medium transition-colors hover:text-primary relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </button>
              </motion.div>
            ))}

            {/* Enhanced Language Dropdown with Globe icon */}
            <motion.div variants={itemVariants}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 h-9 px-3 border-primary/20">
                    <Globe className="h-4 w-4 text-primary mr-1" />
                    <span>{getCurrentLanguageName()}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={() => setLanguage("pt")}
                    className={language === "pt" ? "bg-primary/10 font-medium" : ""}
                  >
                    Português
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-primary/10 font-medium" : ""}
                  >
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ModeToggle />
            </motion.div>
          </motion.nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Language Dropdown with Globe icon */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 h-8 px-2 text-xs border-primary/20"
                >
                  <Globe className="h-3 w-3 text-primary" />
                  <span>{getCurrentLanguageName()}</span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem
                  onClick={() => setLanguage("pt")}
                  className={language === "pt" ? "bg-primary/10 font-medium" : ""}
                >
                  Português
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "bg-primary/10 font-medium" : ""}
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="container mx-auto px-4 py-4 bg-background border-b">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.name}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.href.substring(1))}
                      className="text-sm font-medium transition-colors hover:text-primary py-2 block text-left w-full"
                    >
                      {link.name}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
