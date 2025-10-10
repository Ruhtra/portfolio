'use client'
import { useLanguage } from "@/contexts/language-context"
import { Download, Github, Globe, Linkedin, Printer, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { useRef, useState } from "react";
import Image from "next/image"
import { useReactToPrint } from "react-to-print";

export function Print() {

    const { t, language, setLanguage } = useLanguage()
    const componentRef = useRef<HTMLDivElement>(null);
    const [isPrinting, setIsPrinting] = useState(false);


    const SkillLevel = ({ level }: { level: number }) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((dot) => (
                <div key={dot} className={`h-1.5 w-1.5 rounded-full ${dot <= level ? "bg-blue-300" : "bg-blue-800/30"}`} />
            ))}
        </div>
    )

    const getIcon = (type: string) => {
        switch (type) {
            case "github":
                return <Github className="h-3 w-3 flex-shrink-0" />
            case "linkedin":
                return <Linkedin className="h-3 w-3 flex-shrink-0" />
            case "website":
                return <Globe className="h-3 w-3 flex-shrink-0" />
            default:
                return null
        }
    }


    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `${t("cv.personal.name")} - CV`,
        onBeforePrint: () => {
            setIsPrinting(true);
            return Promise.resolve();
        },
        onAfterPrint: () => {
            setIsPrinting(false);
            console.log("PDF salvo com sucesso!");
        },
        pageStyle: `
            @page {
                size: A4;
                margin: 0mm;
            }
            @media print {
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    background: white !important;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .print-container {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                }
                .a4-page {
                    margin: 0 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    width: 210mm !important;
                    height: 297mm !important;
                }
            }
        `,
    });

    const getPhotoUrl = () => {
        const photo = t("cv.personal.photo");
        // Se for uma URL válida, retorna, caso contrário usa um placeholder
        if (typeof photo === 'string' && (photo.startsWith('http') || photo.startsWith('/'))) {
            return photo;
        }
        return "/placeholder.svg";
    }




    return (
        <>
            <Button
                size="lg"
                className="rounded-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handlePrint}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                        backgroundSize: '200% 100%',
                        animation: 'gradientShift 3s ease infinite'
                    }}
                />
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                <span className="font-semibold relative z-10">{t("hero.cta.cv")}</span>
                <Download className="h-4 w-4 ml-2 group-hover:translate-y-1 transition-transform relative z-10" />
            </Button>
            {/* Componente de impressão - só renderiza quando necessário */}
            {(isPrinting) && (
                <div className="hidden">
                    <div ref={componentRef} className="p-0 m-0">
                        <div className="cv-print-content print:flex min-h-screen items-center justify-center bg-slate-100">
                            <div className="a4-page bg-white shadow-2xl">
                                <div className="flex h-full">
                                    {/* Sidebar */}
                                    <div className="w-1/3 bg-gradient-to-b from-blue-900 to-blue-950 p-5 text-white">
                                        <div className="mb-5 flex justify-center">
                                            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white">
                                                <img
                                                    src={getPhotoUrl()}
                                                    alt={t("cv.personal.name").toString()}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        // Fallback se a imagem não carregar
                                                        e.currentTarget.src = "/placeholder.svg";
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-5 text-center">
                                            <h1 className="mb-1 text-xl font-bold">{t("cv.personal.name")}</h1>
                                            <p className="text-sm text-blue-200">{t("cv.personal.title")}</p>
                                            <p className="mt-1 text-sm text-blue-300">{t("cv.personal.age")}</p>
                                        </div>

                                        {/* Contact */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b border-blue-700 pb-1 text-sm font-bold uppercase tracking-wide">
                                                {t("cv.contact.title")}
                                            </h2>
                                            <div className="space-y-2 text-xs">
                                                <div>
                                                    <p className="mb-0.5 font-semibold">{t("cv.contact.email.label")}</p>
                                                    <p className="text-blue-200">{t("cv.contact.email.value")}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0.5 font-semibold">{t("cv.contact.phone.label")}</p>
                                                    <p className="text-blue-200">{t("cv.contact.phone.value")}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0.5 font-semibold">{t("cv.contact.address.label")}</p>
                                                    <p className="text-blue-200">{t("cv.contact.address.value")}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0.5 font-semibold">{t("cv.contact.birthdate.label")}</p>
                                                    <p className="text-blue-200">{t("cv.contact.birthdate.value")}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b border-blue-700 pb-1 text-sm font-bold uppercase tracking-wide">
                                                {t("cv.links.title")}
                                            </h2>
                                            <div className="space-y-2 text-xs">
                                                <div className="flex items-center gap-2">
                                                    {getIcon("github")}
                                                    <span className="text-blue-200">{t("cv.links.github")}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getIcon("linkedin")}
                                                    <span className="text-blue-200">{t("cv.links.linkedin")}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getIcon("website")}
                                                    <span className="text-blue-200">{t("cv.links.website")}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Technical Skills */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b border-blue-700 pb-1 text-sm font-bold uppercase tracking-wide">
                                                {t("cv.skills.title")}
                                            </h2>
                                            <div className="space-y-2.5 text-xs">
                                                {/* Languages */}
                                                <div>
                                                    <p className="mb-1.5 font-semibold text-blue-200">{t("cv.skills.languages.title")}</p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.languages.typescript")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.languages.typescript.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.languages.javascript")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.languages.javascript.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.languages.csharp")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.languages.csharp.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.languages.python")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.languages.python.level"))} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Frameworks */}
                                                <div>
                                                    <p className="mb-1.5 font-semibold text-blue-200">{t("cv.skills.frameworks.title")}</p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.frameworks.react")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.frameworks.react.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.frameworks.nextjs")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.frameworks.nextjs.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.frameworks.nodejs")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.frameworks.nodejs.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.frameworks.aspnet")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.frameworks.aspnet.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.frameworks.vue")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.frameworks.vue.level"))} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Databases */}
                                                <div>
                                                    <p className="mb-1.5 font-semibold text-blue-200">{t("cv.skills.databases.title")}</p>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.databases.sqlserver")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.databases.sqlserver.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.databases.postgresql")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.databases.postgresql.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.databases.mongodb")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.databases.mongodb.level"))} />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span>{t("cv.skills.databases.firebird")}</span>
                                                            <SkillLevel level={Number(t("cv.skills.databases.firebird.level"))} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* DevOps */}
                                                <div>
                                                    <p className="mb-1.5 font-semibold text-blue-200">{t("cv.skills.devops.title")}</p>
                                                    <div className="space-y-0.5 text-xs">
                                                        <div>{t("cv.skills.devops.item1")}</div>
                                                        <div>{t("cv.skills.devops.item2")}</div>
                                                        <div>{t("cv.skills.devops.item3")}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Languages */}
                                        <div>
                                            <h2 className="mb-2 border-b border-blue-700 pb-1 text-sm font-bold uppercase tracking-wide">
                                                {t("cv.languages.title")}
                                            </h2>
                                            <div className="space-y-1.5 text-xs">
                                                <p>
                                                    <span className="font-semibold">{t("cv.languages.portuguese")}:</span>{" "}
                                                    <span className="text-blue-200">{t("cv.languages.portuguese.level")}</span>
                                                </p>
                                                <p>
                                                    <span className="font-semibold">{t("cv.languages.english")}:</span>{" "}
                                                    <span className="text-blue-200">{t("cv.languages.english.level")}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="w-2/3 p-5">
                                        {/* About */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b-2 border-blue-900 pb-1 text-base font-bold text-blue-900">
                                                {t("cv.about.title")}
                                            </h2>
                                            <p className="text-xs leading-relaxed text-slate-700">{t("cv.about.content")}</p>
                                        </div>

                                        {/* Experience */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b-2 border-blue-900 pb-1 text-base font-bold text-blue-900">
                                                {t("cv.experience.title")}
                                            </h2>
                                            {/* N3 Experience */}
                                            <div className="mb-3">
                                                <div className="mb-1 flex items-start justify-between">
                                                    <h3 className="text-sm font-bold text-slate-900">{t("cv.experience.n3.company")}</h3>
                                                    <span className="text-xs text-slate-500">{t("cv.experience.n3.period")}</span>
                                                </div>
                                                <p className="mb-1.5 text-xs font-medium text-blue-700">{t("cv.experience.n3.position")}</p>
                                                <ul className="space-y-0 text-xs leading-snug text-slate-600">
                                                    <li>• {t("cv.experience.n3.responsibility1")}</li>
                                                    <li>• {t("cv.experience.n3.responsibility2")}</li>
                                                    <li>• {t("cv.experience.n3.responsibility3")}</li>
                                                    <li>• {t("cv.experience.n3.responsibility4")}</li>
                                                </ul>
                                            </div>

                                            {/* Freelancer Experience */}
                                            <div>
                                                <div className="mb-1 flex items-start justify-between">
                                                    <h3 className="text-sm font-bold text-slate-900">{t("cv.experience.freelancer.company")}</h3>
                                                    <span className="text-xs text-slate-500">{t("cv.experience.freelancer.period")}</span>
                                                </div>
                                                <p className="mb-1.5 text-xs font-medium text-blue-700">{t("cv.experience.freelancer.position")}</p>
                                                <ul className="space-y-0 text-xs leading-snug text-slate-600">
                                                    <li>• {t("cv.experience.freelancer.responsibility1")}</li>
                                                    <li>• {t("cv.experience.freelancer.responsibility2")}</li>
                                                    <li>• {t("cv.experience.freelancer.responsibility3")}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Projects */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b-2 border-blue-900 pb-1 text-base font-bold text-blue-900">
                                                {t("cv.projects.title")}
                                            </h2>
                                            {/* Zahir Project */}
                                            <div className="mb-3">
                                                <h3 className="mb-1 text-sm font-bold text-slate-900">{t("cv.projects.zahir.name")}</h3>
                                                <ul className="space-y-0 text-xs leading-snug text-slate-600">
                                                    <li>• {t("cv.projects.zahir.description1")}</li>
                                                    <li>• {t("cv.projects.zahir.description2")}</li>
                                                    <li className="text-blue-700">• {t("cv.projects.zahir.description3")}</li>
                                                </ul>
                                            </div>

                                            {/* Estude Ai Project */}
                                            <div>
                                                <h3 className="mb-1 text-sm font-bold text-slate-900">{t("cv.projects.estudeai.name")}</h3>
                                                <ul className="space-y-0 text-xs leading-snug text-slate-600">
                                                    <li>• {t("cv.projects.estudeai.description1")}</li>
                                                    <li>• {t("cv.projects.estudeai.description2")}</li>
                                                    <li>• {t("cv.projects.estudeai.description3")}</li>
                                                    <li className="text-blue-700">• {t("cv.projects.estudeai.description4")}</li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Education */}
                                        <div className="mb-4">
                                            <h2 className="mb-2 border-b-2 border-blue-900 pb-1 text-base font-bold text-blue-900">
                                                {t("cv.education.title")}
                                            </h2>
                                            <div className="space-y-2 text-xs leading-relaxed">
                                                <div>
                                                    <p className="font-bold text-slate-900">{t("cv.education.technical.degree")}</p>
                                                    <p className="text-slate-600">{t("cv.education.technical.institution")}</p>
                                                    <p className="text-slate-500">{t("cv.education.technical.period")}</p>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{t("cv.education.highschool.degree")}</p>
                                                    <p className="text-slate-600">{t("cv.education.highschool.institution")}</p>
                                                    <p className="text-slate-500">{t("cv.education.highschool.period")}</p>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{t("cv.education.datascience.degree")}</p>
                                                    <p className="text-slate-600">{t("cv.education.datascience.institution")}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Differentials */}
                                        <div>
                                            <h2 className="mb-2 border-b-2 border-blue-900 pb-1 text-base font-bold text-blue-900">
                                                {t("cv.differentials.title")}
                                            </h2>
                                            <ul className="space-y-0 text-xs leading-snug text-slate-700">
                                                <li>• {t("cv.differentials.item1")}</li>
                                                <li>• {t("cv.differentials.item2")}</li>
                                                <li>• {t("cv.differentials.item3")}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}


        </>
    )
}