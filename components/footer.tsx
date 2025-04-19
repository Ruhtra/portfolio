"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">Kawan Arthur</span>
              <span className="ml-2 text-sm font-medium text-primary">
                Ruhtra
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {t("footer.role")}
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="https://github.com/ruhtra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/kawan-arthur/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://ruhtra.work"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:kawanarthurtech@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} Kawan Arthur. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
