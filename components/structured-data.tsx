export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Kawan Arthur",
          url: "https://ruhtra.work",
          jobTitle: "Desenvolvedor Full-Stack",
          worksFor: {
            "@type": "Organization",
            name: "N3 Soluções Empresariais e Contábeis",
          },
          sameAs: ["https://github.com/ruhtra", "https://linkedin.com/in/kawan-arthur/"],
          knowsAbout: ["React", "Next.js", "TypeScript", "C#", "ASP.NET Core", "SQL Server", "Delphi", "Firebird"],
        }),
      }}
    />
  )
}
