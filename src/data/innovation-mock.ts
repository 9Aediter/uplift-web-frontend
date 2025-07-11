export interface Innovation {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  caseStudy: string;
}

export const innovations: Innovation[] = [
  {
    id: "system-architecture-aws",
    title: "Advanced AWS System Architecture",
    subtitle: "Scalable and Resilient Cloud Solutions",
    description:
      "Our AWS system architecture services focus on designing and implementing highly scalable, secure, and cost-effective cloud infrastructures. We leverage the latest AWS services to ensure your applications are robust and performant.",
    features: [
      "Serverless Computing (Lambda, Fargate)",
      "Container Orchestration (EKS, ECS)",
      "Database Optimization (Aurora, DynamoDB)",
      "Security Best Practices (IAM, VPC)",
      "Cost Management & Optimization",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    caseStudy:
      "Successfully migrated a large enterprise application to AWS, reducing operational costs by 30% and improving scalability by 200%.",
  },
  {
    id: "web-development",
    title: "Cutting-Edge Web Development",
    subtitle: "Modern Web Applications with Next.js & Tailwind",
    description:
      "We build dynamic and responsive web applications using modern tech stacks like Next.js, Tailwind CSS, and Prisma. Our focus is on delivering exceptional user experiences and high-performance solutions.",
    features: [
      "Next.js for SEO and Performance",
      "Tailwind CSS for Rapid UI Development",
      "Prisma for Type-Safe Database Access",
      "Responsive Design for All Devices",
      "API Integration & Development",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caseStudy:
      "Developed a custom e-commerce platform that saw a 40% increase in conversion rates within the first three months.",
  },
  // Add more mock innovation data as needed
];
