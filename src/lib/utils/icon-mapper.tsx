'use client';

import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiAmazon,
  SiKubernetes,
  SiApachekafka,
  SiTerraform,
  SiGithubactions,
  SiNestjs,
  SiExpress,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiPrisma,
  SiNuxtdotjs,
  SiPython,
  SiAnaconda,
  SiClaude,
  SiOpenai,
  SiOllama
} from 'react-icons/si';
import { AiFillDatabase } from 'react-icons/ai';
import { FaFish } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  'React': <SiReact className="w-8 h-8" />,
  'Next.js': <SiNextdotjs className="w-8 h-8" />,
  'TypeScript': <SiTypescript className="w-8 h-8" />,
  'Node.js': <SiNodedotjs className="w-8 h-8" />,
  'Golang': <SiGo className="w-8 h-8" />,
  'Docker': <SiDocker className="w-8 h-8" />,
  'PostgreSQL': <SiPostgresql className="w-8 h-8" />,
  'MongoDB': <SiMongodb className="w-8 h-8" />,
  'Redis': <SiRedis className="w-8 h-8" />,
  'GraphQL': <SiGraphql className="w-8 h-8" />,
  'Tailwind CSS': <SiTailwindcss className="w-8 h-8" />,
  'AWS': <SiAmazon className="w-8 h-8" />,
  'Kubernetes': <SiKubernetes className="w-8 h-8" />,
  'Kafka': <SiApachekafka className="w-8 h-8" />,
  'Terraform': <SiTerraform className="w-8 h-8" />,
  'GitHub Actions': <SiGithubactions className="w-8 h-8" />,
  'NestJS': <SiNestjs className="w-8 h-8" />,
  'Express': <SiExpress className="w-8 h-8" />,
  'Flutter': <SiFlutter className="w-8 h-8" />,
  'Dart': <SiDart className="w-8 h-8" />,
  'Vue.js': <SiVuedotjs className="w-8 h-8" />,
  'Prisma': <SiPrisma className="w-8 h-8" />,
  'Nuxt.js': <SiNuxtdotjs className="w-8 h-8" />,
  'Python': <SiPython className="w-8 h-8" />,
  'Anaconda': <SiAnaconda className="w-8 h-8" />,
  'Claude': <SiClaude className="w-8 h-8" />,
  'ChatGPT': <SiOpenai className="w-8 h-8" />,
  'Ollama': <SiOllama className="w-8 h-8" />,
  'Bun': <span className="text-3xl font-bold">🥟</span>,
  'ElysiaJS': <span className="text-3xl font-bold">E</span>,
  'React Native': <SiReact className="w-8 h-8" />,
  'n8n': <span className="text-3xl font-bold">n8n</span>,
  'RAG Model': <AiFillDatabase className="w-8 h-8" />,
  'DeepSeek': <FaFish className="w-8 h-8" />,
};

export function getTechIcon(techName: string): React.ReactNode {
  return iconMap[techName] || <span className="text-2xl">?</span>;
}
