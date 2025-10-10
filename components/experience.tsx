"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, MapPin, Code, Briefcase } from "lucide-react"

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context"

export default function Experience() {
  const { t, language } = useLanguage()

  // Dados das experiências com suporte a múltiplos idiomas
  const experiences = [
    {
      title:
        language === "pt" ? "Analista de Suporte (Full Stack Developer)" : "Support Analyst (Full Stack Developer)",
      company: "N3 Soluções Empresariais e Contábeis",
      period: language === "pt" ? "julho de 2023 - presente" : "July 2023 - present",
      location: language === "pt" ? "Natal, RN, Brasil (presencial)" : "Natal, RN, Brazil (on-site)",
      description:
        language === "pt"
          ? "Trabalho como desenvolvedor Full Stack, utilizando React, Next.js, TypeScript, C# e ASP.NET Core, com SQL Server, para desenvolver e manter aplicações web escaláveis. Também contribuo na manutenção de sistemas legados em Delphi com Firebird, garantindo continuidade e suporte."
          : "I work as a Full Stack developer, using React, Next.js, TypeScript, C# and ASP.NET Core, with SQL Server, to develop and maintain scalable web applications. I also contribute to the maintenance of legacy systems in Delphi with Firebird, ensuring continuity and support.",
      technologies: ["React", "Next.js", "TypeScript", "C#", "ASP.NET Core", "SQL Server", "Delphi", "Firebird"],
    },
    {
      title: language === "pt" ? "Freelancer" : "Freelancer",
      company: language === "pt" ? "Desenvolvimento Web" : "Web Development",
      period: language === "pt" ? "janeiro de 2022 - presente" : "January 2022 - present",
      location: language === "pt" ? "Remoto" : "Remote",
      description:
        language === "pt"
          ? "Atuei como desenvolvedor freelancer em projetos variados, criando sites institucionais, landing pages e aplicações web com React, Next.js, Node.js e bancos de dados relacionais. Entreguei soluções personalizadas conforme demandas de clientes, focando em performance, usabilidade e SEO."
          : "I worked as a freelance developer on various projects, creating institutional websites, landing pages, and web applications with React, Next.js, Node.js, and relational databases. I delivered customized solutions according to client demands, focusing on performance, usability, and SEO.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL", "HTML/CSS", "JavaScript"],
    },
  ]

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

  return (
    <section id="experience" className="section-container scroll-mt-16">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-center" variants={itemVariants}>
            {t("experience.title")}
          </motion.h2>
          <motion.p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12" variants={itemVariants}>
            {t("experience.subtitle")}
          </motion.p>

          <div className="space-y-8 max-w-4xl mx-auto">
            {experiences.map((experience, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                      <div className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <CardTitle className="text-xl md:text-2xl">{experience.title}</CardTitle>
                          <CardDescription className="text-lg font-medium mt-1">{experience.company}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{experience.description}</p>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4 text-primary" />
                        <span className="font-medium">{t("experience.technologies")}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
