'use client';

import { motion } from 'motion/react';
import { GitBranch, Users, Zap, Target, RefreshCw, CheckCircle } from 'lucide-react';

interface AgileSectionProps {
  lang: string;
}

export default function AgileSection({ lang }: AgileSectionProps) {
  const content = {
    en: {
      title: "Our Agile Methodology",
      subtitle: "Fast, Flexible, and Focused on Delivering Value",
      description: "We embrace Agile principles to deliver high-quality solutions iteratively, respond to change quickly, and collaborate closely with our clients throughout the development process.",
      principles: [
        {
          icon: Users,
          title: "Collaborative Teams",
          description: "Cross-functional teams work together daily, sharing knowledge and making decisions collectively."
        },
        {
          icon: Zap,
          title: "Rapid Iterations",
          description: "We deliver working software in 2-week sprints, enabling faster feedback and continuous improvement."
        },
        {
          icon: RefreshCw,
          title: "Adaptive Planning",
          description: "We embrace changing requirements and adjust our plans based on feedback and evolving needs."
        },
        {
          icon: Target,
          title: "Customer Focus",
          description: "Regular demos and reviews ensure we're building exactly what our clients need."
        },
        {
          icon: CheckCircle,
          title: "Quality First",
          description: "Continuous testing, code reviews, and automated pipelines ensure high-quality deliverables."
        },
        {
          icon: GitBranch,
          title: "Continuous Delivery",
          description: "Frequent releases and deployments mean faster time-to-market and reduced risks."
        }
      ]
    },
    th: {
      title: "วิธีการทำงานแบบ Agile",
      subtitle: "รวดเร็ว ยืดหยุ่น และมุ่งเน้นการส่งมอบคุณค่า",
      description: "เรายึดหลักการ Agile ในการส่งมอบโซลูชันที่มีคุณภาพแบบวนรอบ ตอบสนองต่อการเปลี่ยนแปลงได้อย่างรวดเร็ว และทำงานร่วมกับลูกค้าอย่างใกล้ชิดตลอดกระบวนการพัฒนา",
      principles: [
        {
          icon: Users,
          title: "ทีมงานที่ทำงานร่วมกัน",
          description: "ทีมที่มีหลากหลายทักษะทำงานร่วมกันทุกวัน แบ่งปันความรู้และตัดสินใจร่วมกัน"
        },
        {
          icon: Zap,
          title: "การพัฒนาแบบวนรอบเร็ว",
          description: "เราส่งมอบซอฟต์แวร์ที่ใช้งานได้ในรอบ 2 สัปดาห์ ทำให้ได้รับ feedback และปรับปรุงอย่างต่อเนื่อง"
        },
        {
          icon: RefreshCw,
          title: "การวางแผนที่ยืดหยุ่น",
          description: "เรายอมรับการเปลี่ยนแปลงความต้องการและปรับแผนตามผลตอบรับและความต้องการที่เปลี่ยนไป"
        },
        {
          icon: Target,
          title: "มุ่งเน้นลูกค้า",
          description: "การนำเสนอและทบทวนเป็นประจำช่วยให้เรามั่นใจว่ากำลังสร้างสิ่งที่ลูกค้าต้องการ"
        },
        {
          icon: CheckCircle,
          title: "คุณภาพเป็นอันดับแรก",
          description: "การทดสอบอย่างต่อเนื่อง code reviews และ automated pipelines รับประกันคุณภาพของงาน"
        },
        {
          icon: GitBranch,
          title: "Continuous Delivery",
          description: "การปล่อยและ deploy บ่อยครั้งหมายถึงเวลาสู่ตลาดที่เร็วขึ้นและความเสี่ยงที่ลดลง"
        }
      ]
    }
  };

  const data = lang === 'th' ? content.th : content.en;

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {data.title}
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
            {data.subtitle}
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Agile Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {principle.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {principle.description}
                </p>

                {/* Hover Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Sprint Cycle Visual */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border-2 border-blue-200 dark:border-blue-700"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {lang === 'th' ? 'รอบการทำงาน 2 สัปดาห์' : '2-Week Sprint Cycle'}
            </span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: lang === 'th' ? 'วางแผน' : 'Planning', icon: '📋' },
              { step: lang === 'th' ? 'พัฒนา' : 'Development', icon: '💻' },
              { step: lang === 'th' ? 'ทดสอบ' : 'Testing', icon: '✅' },
              { step: lang === 'th' ? 'นำเสนอ' : 'Review', icon: '🎯' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {item.step}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
