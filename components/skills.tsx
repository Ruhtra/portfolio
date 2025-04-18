"use client"

// Replace the hardcoded skills data with a function that uses translations
import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context"

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = React.useState("frontend")
  const { t } = useLanguage()

  // Define skill keys for each category
  const skillsData = {
    frontend: [
      { name: "React", key: "skills.frontend.react" },
      { name: "Next.js", key: "skills.frontend.nextjs" },
      { name: "TypeScript", key: "skills.frontend.typescript" },
      { name: "JavaScript", key: "skills.frontend.javascript" },
      { name: "HTML5/CSS3", key: "skills.frontend.html5css3" },
      { name: "Tailwind CSS", key: "skills.frontend.tailwindcss" },
      { name: "shadcn/ui", key: "skills.frontend.shadcnui" },
      { name: "Blazor", key: "skills.frontend.blazor" },
    ],
    backend: [
      { name: "C#", key: "skills.backend.csharp" },
      { name: "ASP.NET Core", key: "skills.backend.aspnetcore" },
      { name: "Node.js", key: "skills.backend.nodejs" },
      { name: "Express", key: "skills.backend.express" },
      { name: "Auth.js", key: "skills.backend.authjs" },
      { name: "Delphi", key: "skills.backend.delphi" },
    ],
    database: [
      { name: "SQL Server", key: "skills.database.sqlserver" },
      { name: "PostgreSQL", key: "skills.database.postgresql" },
      { name: "MongoDB", key: "skills.database.mongodb" },
      { name: "Firebird", key: "skills.database.firebird" },
      { name: "Prisma", key: "skills.database.prisma" },
      { name: "Dapper", key: "skills.database.dapper" },
    ],
    libraries: [
      { name: "TanStack Query", key: "skills.libraries.tanstack" },
      { name: "Zod", key: "skills.libraries.zod" },
      { name: "Framer Motion", key: "skills.libraries.framer" },
      { name: "React Hook Form", key: "skills.libraries.reacthookform" },
      { name: "Axios", key: "skills.libraries.axios" },
      { name: "Radix UI", key: "skills.libraries.radix" },
    ],
    tools: [
      { name: "Git", key: "skills.tools.git" },
      { name: "GitHub", key: "skills.tools.github" },
      { name: "VS Code", key: "skills.tools.vscode" },
      { name: "Visual Studio", key: "skills.tools.visualstudio" },
      { name: "Figma", key: "skills.tools.figma" },
      { name: "Vercel", key: "skills.tools.vercel" },
      { name: "Heroku", key: "skills.tools.heroku" },
      { name: "Render", key: "skills.tools.render" },
      { name: "Supabase", key: "skills.tools.supabase" },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="section-container scroll-mt-16">
      <div className="container">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <motion.h2 className="section-title text-center" variants={titleVariants}>
            {t("skills.title")}
          </motion.h2>
          <motion.p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12" variants={titleVariants}>
            {t("skills.subtitle")}
          </motion.p>

          <Tabs defaultValue="frontend" className="w-full" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto mb-8">
              <TabsTrigger
                value="frontend"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {t("skills.frontend")}
              </TabsTrigger>
              <TabsTrigger
                value="backend"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {t("skills.backend")}
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {t("skills.database")}
              </TabsTrigger>
              <TabsTrigger
                value="libraries"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {t("skills.libraries")}
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                {t("skills.tools")}
              </TabsTrigger>
            </TabsList>

            {Object.keys(skillsData).map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={selectedCategory === category ? "show" : "hidden"}
                >
                  {skillsData[category].map((skill) => (
                    <motion.div key={skill.name} variants={itemVariants}>
                      <Card className="h-full bg-card rounded-lg p-5 border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                        <h3 className="font-medium text-lg mb-2">{skill.name}</h3>
                        <p className="text-sm text-muted-foreground">{t(skill.key)}</p>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
