'use client';

import React from 'react';
import { Section } from '@/components/ui/section';
import { AnimateEffect } from '@/components/common/animate-effect';
import { motion } from 'motion/react';
import {
  SiKubernetes,
  SiTerraform,
  SiDocker,
  SiPrometheus,
  SiGrafana,
  SiNginx
} from 'react-icons/si';
import { TbBrandGolang } from 'react-icons/tb';
import { FaServer, FaNetworkWired, FaShieldAlt, FaChartLine } from 'react-icons/fa';

interface ArchitectureFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  metrics?: string[];
  highlights: string[];
}

const architectureFeatures: ArchitectureFeature[] = [
  {
    title: 'Kubernetes Orchestration',
    description: 'Container orchestration ที่ระดับ enterprise พร้อม auto-scaling และ self-healing',
    icon: <SiKubernetes className="w-12 h-12" />,
    gradient: 'from-blue-500 to-cyan-400',
    metrics: ['99.9% Uptime', 'Auto-scaling', 'Self-healing'],
    highlights: [
      'Container Orchestration',
      'Load Balancing',
      'Rolling Updates',
      'Service Discovery'
    ]
  },
  {
    title: 'Infrastructure as Code',
    description: 'Terraform สำหรับการจัดการ infrastructure แบบอัตโนมัติและทำซ้ำได้',
    icon: <SiTerraform className="w-12 h-12" />,
    gradient: 'from-purple-600 to-purple-400',
    metrics: ['Deploy in Minutes', 'Version Controlled', '100% Reproducible'],
    highlights: [
      'Automated Deployment',
      'Version Control',
      'Multi-Cloud Support',
      'State Management'
    ]
  },
  {
    title: 'Microservices Architecture',
    description: 'Distributed architecture ที่ scalable และ maintainable ด้วย service mesh',
    icon: <FaNetworkWired className="w-12 h-12" />,
    gradient: 'from-green-500 to-emerald-400',
    metrics: ['Independent Scaling', 'Fault Isolation', 'Tech Flexibility'],
    highlights: [
      'Service Mesh',
      'API Gateway',
      'Event-Driven',
      'Circuit Breaker'
    ]
  }
];

const techComponents = [
  { name: 'K8s', icon: <SiKubernetes className="w-6 h-6" />, color: 'text-blue-500' },
  { name: 'Docker', icon: <SiDocker className="w-6 h-6" />, color: 'text-cyan-500' },
  { name: 'Terraform', icon: <SiTerraform className="w-6 h-6" />, color: 'text-purple-500' },
  { name: 'Nginx', icon: <SiNginx className="w-6 h-6" />, color: 'text-green-500' },
  { name: 'Prometheus', icon: <SiPrometheus className="w-6 h-6" />, color: 'text-orange-500' },
  { name: 'Grafana', icon: <SiGrafana className="w-6 h-6" />, color: 'text-yellow-500' }
];

export const SolutionArchitecture = () => {
  const [selectedFeature, setSelectedFeature] = React.useState<number>(0);

  return (
    <Section className="bg-gradient-to-b from-background to-muted/30 py-20 md:py-32 relative overflow-hidden">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <AnimateEffect index={0}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaShieldAlt className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                Enterprise Grade
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Solution Architecture
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Infrastructure ระดับ enterprise ที่บริษัททั่วไปทำไม่ได้
              <br />
              พร้อม scalability, reliability และ automation ระดับสูง
            </p>
          </div>
        </AnimateEffect>

        {/* Main Architecture Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {architectureFeatures.map((feature, index) => (
            <AnimateEffect key={feature.title} index={index + 1}>
              <motion.div
                className={`relative group cursor-pointer h-full ${
                  selectedFeature === index ? 'z-20' : 'z-10'
                }`}
                onClick={() => setSelectedFeature(index)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card */}
                <div
                  className={`relative h-full bg-card border rounded-2xl p-8 overflow-hidden transition-all duration-300 ${
                    selectedFeature === index
                      ? 'border-primary shadow-2xl shadow-primary/20'
                      : 'border-border hover:border-primary/50 hover:shadow-xl'
                  }`}
                >
                  {/* Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 ${
                      selectedFeature === index ? 'opacity-10' : 'group-hover:opacity-5'
                    }`}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Icon */}
                    <motion.div
                      className={`w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white`}
                      whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    >
                      {feature.icon}
                    </motion.div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    {feature.metrics && (
                      <div className="flex flex-wrap gap-2">
                        {feature.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="inline-flex items-center bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <motion.div
                          key={highlight}
                          className="flex items-center text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: selectedFeature === index ? 1 : 0.6,
                            x: 0
                          }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} mr-2`} />
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimateEffect>
          ))}
        </div>

        {/* Architecture Diagram */}
        <AnimateEffect index={5}>
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-12">
              Complete Infrastructure Stack
            </h3>

            {/* Simplified Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

              {/* Layer 1: Load Balancer */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl p-6 text-center">
                  <FaNetworkWired className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <h4 className="font-bold text-foreground mb-2">Load Balancer</h4>
                  <p className="text-sm text-muted-foreground">Nginx / Ingress</p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-primary text-2xl">→</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Layer 2: Kubernetes Cluster */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-xl p-6 text-center">
                  <SiKubernetes className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                  <h4 className="font-bold text-foreground mb-2">K8s Cluster</h4>
                  <p className="text-sm text-muted-foreground">Orchestration Layer</p>

                  {/* Microservices */}
                  <div className="mt-4 flex justify-center gap-2">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <TbBrandGolang className="w-4 h-4 text-purple-400" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    <div className="text-primary text-2xl">→</div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Layer 3: Data Layer */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-6 text-center">
                  <FaServer className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h4 className="font-bold text-foreground mb-2">Data Layer</h4>
                  <p className="text-sm text-muted-foreground">Database & Cache</p>
                </div>
              </motion.div>
            </div>

            {/* Infrastructure as Code Layer */}
            <motion.div
              className="mt-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-6 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <SiTerraform className="w-8 h-8 text-purple-500" />
                <h4 className="font-bold text-foreground">Infrastructure as Code</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                ทุก infrastructure จัดการผ่าน Terraform - version controlled, reproducible, automated
              </p>
            </motion.div>
          </div>
        </AnimateEffect>

        {/* Tech Components */}
        <AnimateEffect index={6}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">Powered by industry-leading technologies:</p>

            <div className="flex flex-wrap justify-center gap-6">
              {techComponents.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <span className={tech.color}>{tech.icon}</span>
                  <span className="font-semibold text-foreground">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimateEffect>

        {/* Stats */}
        <AnimateEffect index={7}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Uptime', value: '99.9%', icon: <FaChartLine /> },
              { label: 'Auto-scaling', value: '< 30s', icon: <FaServer /> },
              { label: 'Deploy Time', value: '< 5min', icon: <SiKubernetes /> },
              { label: 'Cost Saving', value: '40%', icon: <SiTerraform /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-primary mb-2 flex justify-center text-2xl">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </AnimateEffect>

        {/* CTA */}
        <AnimateEffect index={8}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-lg mb-6">
              พร้อมที่จะยกระดับ infrastructure ของคุณแล้วหรือยัง?
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              ปรึกษาผู้เชี่ยวชาญ
            </motion.button>
          </div>
        </AnimateEffect>
      </div>
    </Section>
  );
};
