import React from 'react';
import { Section } from '@/components/ui/section';
import { Card } from "@/components/card";

export const FAQSection = () => (
  <Section className="py-12 md:py-20 bg-gray-900/50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">ระบบนี้ราคาเท่าไหร่?</h3>
          <p className="text-gray-400">ราคาขึ้นอยู่กับความซับซ้อนและฟีเจอร์ที่ต้องการ กรุณาติดต่อเราเพื่อขอใบเสนอราคา.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">ใช้ร่วมกับระบบอื่นได้ไหม?</h3>
          <p className="text-gray-400">ได้ครับ ระบบของเราออกแบบมาให้สามารถเชื่อมต่อกับระบบภายนอกได้หลากหลาย.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">รองรับหลายภาษา?</h3>
          <p className="text-gray-400">ใช่ครับ ระบบของเราสามารถรองรับการใช้งานได้หลายภาษา.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">มี mobile version?</h3>
          <p className="text-gray-400">เราสามารถพัฒนา mobile version หรือ responsive web application ให้คุณได้ตามความต้องการ.</p>
        </Card>
      </div>
    </div>
  </Section>
);
