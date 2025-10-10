'use client'
import Hero from "@/components/hero"
import About from "@/components/about"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import { useLanguage } from "@/contexts/language-context"

export default function Home() {

  const { t, isLoading } = useLanguage()
  if (isLoading) {
    return (<>Aqui entra um loading pra pagina</>)
  }

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>

  )
}
