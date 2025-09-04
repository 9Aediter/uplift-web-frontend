"use client";
import dynamic from 'next/dynamic';
import { ProblemsSSR } from "@/components/section/uplift/problem/problem-ssr";
import { SolutionSSR } from "@/components/section/uplift/solution-ssr";

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
  const ProblemsAnimatedComponent = dynamic(() => import("@/components/section/uplift/problem/problem-animated"), {
    loading: () => <ProblemsSSR data={data} />,
    ssr: false
  });
  
  return <ProblemsAnimatedComponent data={data} />;
};

export const SolutionAnimated = ({ data }: { data: SolutionData }) => {
  const SolutionAnimatedComponent = dynamic(() => import("@/components/section/uplift/solution").then(mod => ({ default: mod.Solution })), {
    loading: () => <SolutionSSR data={data} />,
    ssr: false
  });
  
  return <SolutionAnimatedComponent data={data} />;
};

const Particles = dynamic(() => import('@/components/section/uplift/hero/particles').then(mod => ({ default: mod.Particles })), {
  ssr: false,
  loading: () => <div className="fixed inset-0 pointer-events-none" />
});

export { Particles };