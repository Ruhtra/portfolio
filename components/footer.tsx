"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Globe } from "lucide-react";

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context";
import { mainInfo } from "@/translations/main";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t py-8 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              <span className="gradient-text">{mainInfo.personal.name}</span>
              <span className="ml-2 text-sm font-medium text-primary">
                {mainInfo.personal.nickname}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {t("footer.role")}
            </p>
          </div>

          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href={mainInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href={mainInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={mainInfo.social.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href={`mailto:${mainInfo.personal.email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} {mainInfo.personal.name}. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
