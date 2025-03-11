"use client";

import { motion } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Layout,
  GitBranch,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Workflow,
} from "lucide-react";
import AnimatedSectionHeader from "./AnimatedSectionHeader";

const SkillIcon = ({ icon: Icon, color }: { icon: any; color: string }) => (
  <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg`}>
    <Icon className={`w-6 h-6 ${color}`} />
  </div>
);

const skills = [
  {
    icon: Code,
    name: "Desenvolvimento Frontend",
    tech: "React.js, Next.js",
    description:
      "Construção de interfaces de usuário responsivas e interativas com recursos modernos do React e Next.js para desempenho ideal.",
    color: "text-blue-500",
  },
  {
    icon: Server,
    name: "Desenvolvimento Backend",
    tech: "Node.js, Express, Fastify",
    description:
      "Criação de aplicações robustas do lado do servidor com foco em escalabilidade e Clean Architecture.",
    color: "text-green-500",
  },
  {
    icon: Database,
    name: "Gerenciamento de Banco de Dados",
    tech: "PostgreSQL, MongoDB",
    description:
      "Projetando e implementando esquemas de banco de dados eficientes e consultas para gerenciamento ideal de dados.",
    color: "text-purple-500",
  },
  {
    icon: Layout,
    name: "UI/UX Design",
    tech: "Tailwind CSS, Material UI",
    description:
      "Criação de interfaces de usuário bonitas e intuitivas com princípios e frameworks de design modernos.",
    color: "text-pink-500",
  },
  {
    icon: GitBranch,
    name: "Controle de Versão",
    tech: "Git, GitHub",
    description:
      "Gerenciamento eficiente de versões de código com Git e colaboração efetiva através do GitHub.",
    color: "text-orange-500",
  },
  {
    icon: Terminal,
    name: "TypeScript",
    tech: "TypeScript, JavaScript",
    description:
      "Escrita de código seguro em termos de tipos para melhor manutenção e experiência do desenvolvedor.",
    color: "text-yellow-500",
  },
  {
    icon: Layers,
    name: "Gerenciamento de Estado",
    tech: "TanStack Query",
    description:
      "Gerenciamento eficiente de estado e cache de dados em aplicações React.",
    color: "text-indigo-500",
  },
  {
    icon: Cpu,
    name: "Desenvolvimento de API",
    tech: "REST, MVC, Clean Architecture",
    description:
      "Projetando e implementando APIs eficientes para comunicação de dados perfeita.",
    color: "text-red-500",
  },
  {
    icon: Globe,
    name: "Desempenho Web",
    tech: "Otimização, SEO",
    description:
      "Otimização de aplicações web para velocidade, acessibilidade e visibilidade em mecanismos de busca.",
    color: "text-teal-500",
  },
  {
    icon: Workflow,
    name: "Metodologias Ágeis",
    tech: "Scrum, Kanban",
    description:
      "Trabalhando eficientemente em ambientes ágeis com foco em entrega contínua.",
    color: "text-cyan-500",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900"></div>

      {/* Skill Illustrations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="skill-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M50 30 L50 70 M30 50 L70 50"
                stroke="currentColor"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#skill-pattern)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSectionHeader title="Skills & Expertise" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <SkillIcon icon={skill.icon} color={skill.color} />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.tech}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
