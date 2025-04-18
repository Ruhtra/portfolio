"use client"
import { motion } from "framer-motion"
import { BookOpen, Code, Briefcase, GraduationCap } from "lucide-react"
// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context"

export default function About() {
  const { t } = useLanguage()

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
    <section id="about" className="section-container scroll-mt-16">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 className="section-title text-center" variants={itemVariants}>
            {t("about.title")}
          </motion.h2>
          <div className="mt-12">
            <div className="space-y-6 max-w-3xl mx-auto">
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{t("about.journey")}</p>
              </motion.div>

              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <Briefcase className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{t("about.experience")}</p>
              </motion.div>

              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <Code className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{t("about.tech")}</p>
              </motion.div>

              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <GraduationCap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">{t("about.learning")}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
