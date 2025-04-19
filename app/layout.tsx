import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kawan Arthur | Ruhtra | Desenvolvedor Full-Stack",
    template: "%s | Kawan Arthur",
  },
  description:
    "Portfolio profissional de Kawan Arthur (Ruhtra), desenvolvedor Full-Stack especializado em React, Next.js, TypeScript, C# e ASP.NET Core.",
  keywords: [
    "desenvolvedor",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "c#",
    "asp.net core",
    "portfolio",
    "kawan arthur",
    "ruhtra",
    "web developer",
    "frontend",
    "backend",
  ],
  authors: [{ name: "Kawan Arthur" }],
  creator: "Kawan Arthur",
  publisher: "Kawan Arthur",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ruhtra.work"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/pt-BR",
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Kawan Arthur | Ruhtra | Desenvolvedor Full-Stack",
    description:
      "Portfolio profissional de Kawan Arthur (Ruhtra), desenvolvedor Full-Stack especializado em React, Next.js, TypeScript, C# e ASP.NET Core.",
    url: "https://ruhtra.work",
    siteName: "Portfolio de Kawan Arthur",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kawan Arthur | Ruhtra | Desenvolvedor Full-Stack",
    description:
      "Portfolio profissional de Kawan Arthur (Ruhtra), desenvolvedor Full-Stack especializado em React, Next.js, TypeScript, C# e ASP.NET Core.",
    creator: "@kawanarthur",
  },
  verification: {
    // Adicione quando tiver as verificações
    // google: "google-site-verification-code",
  },
  category: "technology",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kawan Arthur",
              alternateName: "Ruhtra",
              url: "https://ruhtra.work",
              jobTitle: "Desenvolvedor Full-Stack",
              worksFor: {
                "@type": "Organization",
                name: "N3 Soluções Empresariais e Contábeis",
              },
              sameAs: [
                "https://github.com/ruhtra",
                "https://linkedin.com/in/kawan-arthur/",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "C#",
                "ASP.NET Core",
                "SQL Server",
                "Delphi",
                "Firebird",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased vsc-initialized`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
