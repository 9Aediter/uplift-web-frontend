import { LayoutIcon, ServerIcon, CodeIcon, CheckCircleIcon, GitBranchIcon, HeadphonesIcon, SmartphoneIcon } from 'lucide-react';

// Define the IconMap for services, similar to products.ts
export const IconMap: Record<string, React.ComponentType<any>> = {
  LayoutIcon,
  ServerIcon,
  CodeIcon,
  CheckCircleIcon,
  GitBranchIcon,
  HeadphonesIcon,
  SmartphoneIcon, // Added SmartphoneIcon
};

export const services = [
  {
    title: 'System Architecture & Flow Design',
    description:
      'Custom data flows and system architecture that scales with your business needs',
    icon: 'LayoutIcon', // Store icon name as string
    color: 'cyan',
  },
  {
    title: 'Custom CMS & Admin',
    description:
      'Tailor-made content management systems that make your team more productive',
    icon: 'ServerIcon', // Store icon name as string
    color: 'magenta',
  },
  {
    title: 'Web & App Development',
    description:
      'Next.js, Tailwind, Prisma and more - built with modern tech stacks',
    icon: 'CodeIcon', // Store icon name as string
    color: 'blue',
  },
  {
    title: 'QA & Testing',
    description:
      'Rigorous testing protocols to ensure your system works flawlessly',
    icon: 'CheckCircleIcon', // Store icon name as string
    color: 'lime',
  },
  {
    title: 'DevOps & CI/CD',
    description:
      'Docker, AWS, and automated deployment pipelines for seamless operations',
    icon: 'GitBranchIcon', // Store icon name as string
    color: 'cyan',
  },
  {
    title: 'Post-Launch Support',
    description:
      'Ongoing maintenance and support to keep your systems running optimally',
    icon: 'HeadphonesIcon', // Store icon name as string
    color: 'magenta',
  },
];

export const getGradient = (color: string) => {
  switch (color) {
    case 'cyan':
      return 'from-cyan-500 to-blue-500';
    case 'magenta':
      return 'from-fuchsia-500 to-pink-500';
    case 'blue':
      return 'from-blue-500 to-indigo-500';
    case 'lime':
      return 'from-lime-500 to-green-500';
    default:
      return 'from-cyan-500 to-blue-500';
  }
};

