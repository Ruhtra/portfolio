"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Importe o hook useLanguage
import { useLanguage } from "@/contexts/language-context";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { t, language } = useLanguage();

  // Dados dos projetos com suporte a múltiplos idiomas
  const projects = [
    {
      id: 1,
      title: "EstudeAi",
      description:
        language === "pt"
          ? "Aplicativo móvel preparatório para o IF, com plataforma interativa para estudantes."
          : "Mobile application designed as preparatory for the IF, providing an interactive platform for students.",
      image: "/Dashboard.png?height=400&width=600",
      tags: [
        "Next.js",
        "Node.js",
        "TypeScript",
        "shadcn",
        "Prisma",
        "PostgreSQL",
        "Supabase",
        "Auth.js",
        "Tailwind CSS",
        "Framer Motion",
        "Radix",
        "Zod",
      ],
      github: "https://github.com/ruhtra/estudeai",
      demo: "https://estudeai.ruhtra.work",
      longDescription:
        language === "pt"
          ? "O EstudeAi é um aplicativo móvel desenvolvido como preparatório para o IF. Ele oferece uma plataforma interativa onde os usuários podem criar, editar e excluir textos, provas e questões. Além disso, possui um painel administrativo para visualização de receitas e outros dados importantes. Construído com tecnologias modernas como Next.js, Node.js, TypeScript, shadcn, Prisma, PostgreSQL e Supabase, o aplicativo foi projetado para suportar expansões e melhorias futuras."
          : "EstudeAi is a mobile application designed as preparatory for the IF. It provides an interactive platform where users can create, edit, and delete texts, exams, and questions. Additionally, it features an administrative dashboard for viewing revenue and other important data. Built with modern technologies like Next.js, Node.js, TypeScript, shadcn, Prisma, PostgreSQL, and Supabase, the app is designed to support future feature expansions and improvements.",
    },
    // {
    //   id: 2,
    //   title: "E-commerce Platform",
    //   description:
    //     language === "pt"
    //       ? "Uma plataforma completa de e-commerce com painel administrativo, pagamentos e gestão de produtos."
    //       : "A complete e-commerce platform with admin panel, payments, and product management.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["React", "Node.js", "TypeScript", "MongoDB"],
    //   github: "https://github.com/ruhtra/ecommerce",
    //   demo: "https://ecommerce-demo.com",
    //   longDescription:
    //     language === "pt"
    //       ? "Este projeto é uma plataforma de e-commerce completa desenvolvida com React no frontend e Node.js no backend. Inclui funcionalidades como autenticação de usuários, catálogo de produtos, carrinho de compras, processamento de pagamentos, e um painel administrativo para gerenciar produtos, pedidos e clientes."
    //       : "This project is a complete e-commerce platform developed with React on the frontend and Node.js on the backend. It includes features such as user authentication, product catalog, shopping cart, payment processing, and an admin panel to manage products, orders, and customers.",
    // },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        language === "pt"
          ? "Site de portfólio profissional desenvolvido com Next.js e Tailwind CSS."
          : "Professional portfolio website developed with Next.js and Tailwind CSS.",
      image: "/Portfolio.png?height=400&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/ruhtra/portfolio",
      demo: "https://ruhtra.work",
      longDescription:
        language === "pt"
          ? "Este portfólio foi desenvolvido com Next.js, TypeScript e Tailwind CSS, apresentando meus projetos e habilidades de forma moderna e responsiva. Inclui animações suaves com Framer Motion, modo claro/escuro e formulário de contato funcional."
          : "This portfolio was developed with Next.js, TypeScript, and Tailwind CSS, showcasing my projects and skills in a modern and responsive way. It includes smooth animations with Framer Motion, light/dark mode, and a functional contact form.",
    },
    // {
    //   id: 4,
    //   title: "Task Management App",
    //   description:
    //     language === "pt"
    //       ? "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real."
    //       : "Task management application with real-time collaboration features.",
    //   image: "/placeholder.svg?height=400&width=600",
    //   tags: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
    //   github: "https://github.com/ruhtra/taskmanager",
    //   demo: "https://taskmanager-demo.com",
    //   longDescription:
    //     language === "pt"
    //       ? "O Task Management App é uma aplicação web que permite aos usuários gerenciar suas tarefas diárias de forma eficiente. Desenvolvido com React e Firebase, o aplicativo oferece recursos como criação, edição e exclusão de tarefas, categorização, definição de prazos, notificações e colaboração em tempo real."
    //       : "The Task Management App is a web application that allows users to efficiently manage their daily tasks. Developed with React and Firebase, the app offers features such as task creation, editing, and deletion, categorization, deadline setting, notifications, and real-time collaboration.",
    // },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="projects"
      className="section-container scroll-mt-16 bg-muted/30"
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="section-title text-center"
            variants={itemVariants}
          >
            {t("projects.title")}
          </motion.h2>
          <motion.p
            className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
            variants={itemVariants}
          >
            {t("projects.subtitle")}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="overflow-hidden group h-full flex flex-col transition-all duration-300 hover:shadow-lg border-primary/10 hover:border-primary/30">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="group"
                        >
                          <span>{t("projects.viewDetails")}</span>
                          <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
                            →
                          </span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                          <DialogTitle>{selectedProject?.title}</DialogTitle>
                          <DialogDescription>
                            {selectedProject?.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative h-64 w-full mt-4">
                          <Image
                            src={selectedProject?.image || "/placeholder.svg"}
                            alt={selectedProject?.title}
                            fill
                            className="object-cover rounded-md"
                            sizes="(max-width: 768px) 100vw, 625px"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 my-4">
                          {selectedProject?.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {selectedProject?.longDescription}
                        </p>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={selectedProject?.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Github className="h-4 w-4" />
                              {t("projects.github")}
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link
                              href={selectedProject?.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {t("projects.demo")}
                            </Link>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 transition-colors"
                      >
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                        >
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:bg-primary/10 transition-colors"
                      >
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
