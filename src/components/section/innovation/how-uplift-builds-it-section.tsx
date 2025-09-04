import React from 'react';
import Image from 'next/image';
import { Section } from '@/components/ui/section';

export const HowUpliftBuildsItSection = () => (
  <Section className="py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        How UPLIFT Builds It Differently
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Custom-tailored Solutions</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            เราไม่ใช้ระบบสำเร็จรูป แต่สร้างสรรค์โซลูชันที่ปรับแต่งให้เข้ากับความต้องการเฉพาะของธุรกิจคุณอย่างแท้จริง เพื่อให้คุณได้ระบบที่สมบูรณ์แบบที่สุด.
          </p>
          <h3 className="text-2xl font-semibold text-white mb-4">Seamless System Integration</h3>
          <p className="text-gray-400 leading-relaxed">
            ระบบของเราสามารถเชื่อมต่อกับระบบอื่นๆ ที่คุณใช้งานอยู่ได้อย่างราบรื่น ไม่ว่าจะเป็นระบบบัญชี, CRM หรือ ERP เพื่อให้ข้อมูลไหลเวียนได้อย่างมีประสิทธิภาพ.
          </p>
        </div>
        <div>
          <Image src="https://via.placeholder.com/600x400" alt="Custom Solution" width={600} height={400} className="rounded-lg shadow-lg" />
        </div>
      </div>
    </div>
  </Section>
);
