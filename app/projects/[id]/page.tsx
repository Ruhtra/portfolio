import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

// Dados dos projetos (em produção, isso viria de uma API ou CMS)
const projects = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Uma plataforma completa de e-commerce com painel administrativo, pagamentos e gestão de produtos.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/ecommerce",
    demo: "https://ecommerce-demo.com",
    longDescription:
      "Este projeto é uma plataforma de e-commerce completa desenvolvida com React no frontend e Node.js no backend. Inclui funcionalidades como autenticação de usuários, catálogo de produtos, carrinho de compras, processamento de pagamentos via Stripe, e um painel administrativo para gerenciar produtos, pedidos e clientes. O banco de dados MongoDB é utilizado para armazenar todos os dados da aplicação, e o sistema inclui recursos de busca avançada e filtragem de produtos.",
    features: [
      "Autenticação e autorização de usuários",
      "Catálogo de produtos com categorias e filtros",
      "Carrinho de compras com persistência",
      "Processamento de pagamentos via Stripe",
      "Painel administrativo para gestão de produtos e pedidos",
      "Sistema de avaliações e comentários",
      "Histórico de pedidos para usuários",
      "Notificações por email",
    ],
    challenges:
      "Um dos principais desafios foi implementar um sistema de busca eficiente que pudesse lidar com um grande catálogo de produtos. Utilizei indexação no MongoDB e implementei uma lógica de cache para melhorar o desempenho das consultas frequentes.",
    learnings:
      "Este projeto me permitiu aprofundar meus conhecimentos em arquitetura de aplicações e-commerce, segurança de pagamentos online e otimização de desempenho em aplicações React.",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Aplicativo de gerenciamento de tarefas com recursos de colaboração em tempo real.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
    github: "https://github.com/username/taskmanager",
    demo: "https://taskmanager-demo.com",
    longDescription:
      "O Task Management App é uma aplicação web que permite aos usuários gerenciar suas tarefas diárias de forma eficiente. Desenvolvido com React e Firebase, o aplicativo oferece recursos como criação, edição e exclusão de tarefas, categorização, definição de prazos, notificações e colaboração em tempo real. O Redux é utilizado para gerenciamento de estado, enquanto o Tailwind CSS proporciona uma interface moderna e responsiva. A autenticação é feita via Firebase Authentication, e o Firestore é usado como banco de dados em tempo real.",
    features: [
      "Autenticação de usuários",
      "Criação, edição e exclusão de tarefas",
      "Categorização e etiquetas",
      "Definição de prazos e lembretes",
      "Colaboração em tempo real",
      "Notificações push",
      "Modo offline com sincronização",
      "Temas claro e escuro",
    ],
    challenges:
      "O maior desafio foi implementar a colaboração em tempo real mantendo a consistência dos dados entre múltiplos usuários. Utilizei o Firestore para sincronização em tempo real e implementei lógicas de resolução de conflitos.",
    learnings:
      "Este projeto me ensinou muito sobre gerenciamento de estado complexo com Redux e sobre como estruturar aplicações em tempo real com Firebase. Também aprimorei minhas habilidades em UX/UI para criar uma experiência intuitiva.",
  },
  {
    id: "3",
    title: "Social Media Dashboard",
    description: "Dashboard para análise de métricas de redes sociais com visualizações de dados interativas.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["Vue.js", "Express", "D3.js", "PostgreSQL"],
    github: "https://github.com/username/social-dashboard",
    demo: "https://social-dashboard-demo.com",
    longDescription:
      "O Social Media Dashboard é uma ferramenta analítica que permite aos usuários monitorar e analisar o desempenho de suas contas em diversas redes sociais. Desenvolvido com Vue.js no frontend e Express no backend, o dashboard apresenta visualizações de dados interativas criadas com D3.js, permitindo aos usuários compreender melhor suas métricas. O PostgreSQL é utilizado para armazenar dados históricos, e a aplicação inclui recursos como relatórios personalizados, exportação de dados, comparação de períodos e alertas para mudanças significativas nas métricas.",
    features: [
      "Integração com múltiplas redes sociais",
      "Visualizações de dados interativas",
      "Relatórios personalizados",
      "Exportação de dados em vários formatos",
      "Comparação de períodos",
      "Alertas para mudanças significativas",
      "Agendamento de relatórios por email",
      "Previsões baseadas em tendências históricas",
    ],
    challenges:
      "O principal desafio foi criar visualizações de dados que fossem ao mesmo tempo informativas e fáceis de entender. Utilizei D3.js para criar gráficos interativos e dediquei tempo significativo para otimizar a experiência do usuário.",
    learnings:
      "Este projeto me permitiu aprofundar meus conhecimentos em Vue.js e visualização de dados. Aprendi muito sobre como transformar dados brutos em insights acionáveis e como projetar interfaces que facilitam a compreensão de informações complexas.",
  },
  {
    id: "4",
    title: "Fitness Tracker",
    description: "Aplicativo para acompanhamento de atividades físicas, nutrição e progresso de condicionamento.",
    image: "/placeholder.svg?height=600&width=1200",
    tags: ["React Native", "GraphQL", "Apollo", "MongoDB"],
    github: "https://github.com/username/fitness-tracker",
    demo: "https://fitness-tracker-demo.com",
    longDescription:
      "O Fitness Tracker é um aplicativo móvel desenvolvido com React Native que permite aos usuários acompanhar suas atividades físicas, nutrição e progresso de condicionamento. A aplicação utiliza GraphQL com Apollo Client para comunicação eficiente com o backend, e MongoDB para armazenamento de dados. Os usuários podem registrar exercícios, refeições, peso, medidas corporais e definir metas. O aplicativo também oferece recursos como planos de treino personalizados, cálculo de calorias, gráficos de progresso e integração com dispositivos wearable para rastreamento automático de atividades.",
    features: [
      "Registro de exercícios e treinos",
      "Acompanhamento nutricional",
      "Registro de peso e medidas corporais",
      "Definição e acompanhamento de metas",
      "Planos de treino personalizados",
      "Cálculo de calorias e macronutrientes",
      "Gráficos de progresso",
      "Integração com dispositivos wearable",
    ],
    challenges:
      "Um dos maiores desafios foi otimizar o desempenho do aplicativo em dispositivos com recursos limitados. Implementei estratégias de cache com Apollo Client e otimizei as consultas GraphQL para reduzir o consumo de dados e melhorar a responsividade.",
    learnings:
      "Este projeto me permitiu aprofundar meus conhecimentos em desenvolvimento mobile com React Native e na implementação de APIs GraphQL. Aprendi muito sobre como criar interfaces móveis intuitivas e sobre como estruturar esquemas GraphQL eficientes.",
  },
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/#projects" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Projetos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden border">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Descrição</h2>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Funcionalidades</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Desafios</h2>
              <p className="text-muted-foreground">{project.challenges}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3">Aprendizados</h2>
              <p className="text-muted-foreground">{project.learnings}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Links do Projeto</h2>
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver Demo
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  Código Fonte
                </Link>
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Interessado em trabalhar comigo?</h3>
              <Button className="w-full" asChild>
                <Link href="/#contact">Entre em Contato</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
