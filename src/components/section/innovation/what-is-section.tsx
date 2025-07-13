import React from 'react';
import { Section } from '@/components/ui/section';

interface WhatIsSectionProps {
  systemName: string;
}

export const WhatIsSection: React.FC<WhatIsSectionProps> = ({ systemName }) => (
  <Section className="py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        What is {systemName}?
      </h2>
      <p className="text-gray-400 leading-relaxed mb-6">
        {systemName} คือระบบที่ช่วยจัดการการดำเนินงานในธุรกิจของคุณให้มีประสิทธิภาพสูงสุด ไม่ว่าจะเป็นการจัดการการขาย, สต็อกสินค้า, หรือข้อมูลลูกค้า. ระบบนี้ถูกออกแบบมาเพื่อลดความซับซ้อนและเพิ่มความแม่นยำในการทำงานประจำวัน.
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2">
        <li>ช่วยให้การบันทึกข้อมูลการขายเป็นไปอย่างรวดเร็วและแม่นยำ</li>
        <li>จัดการสต็อกสินค้าแบบเรียลไทม์ ลดปัญหาของขาดหรือเกิน</li>
        <li>วิเคราะห์ข้อมูลการขายเพื่อช่วยในการตัดสินใจทางธุรกิจ</li>
      </ul>
    </div>
  </Section>
);
