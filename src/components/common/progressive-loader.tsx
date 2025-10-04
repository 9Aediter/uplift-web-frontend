"use client";
import dynamic from 'next/dynamic';
import Problems from "@/components/page/home/problems";
import { SolutionSSR } from "@/components/page/home/solution";

interface ProblemItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  impact: string;
}

interface ProblemData {
  title: string;
  subtitle: string;
  items: ProblemItem[];
}

interface SolutionData {
  title: string;
  subtitle: string;
  items: any[];
}

// Progressive enhancement wrapper components with data props
export const ProblemsAnimated = ({ data }: { data: ProblemData }) => {
  return <Problems />;
};

export const SolutionAnimated = ({ data }: { data: SolutionData }) => {
  return <SolutionSSR data={data} />;
};

const Particles = dynamic(() => import('@/components/page/home/hero/particles').then(mod => ({ default: mod.Particles })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 pointer-events-none" />
});

export { Particles };