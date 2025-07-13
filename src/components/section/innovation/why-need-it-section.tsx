import React from 'react';
import { Section } from '@/components/ui/section';
import { Card } from "@/components/card";
import { LightbulbIcon, TrendingUpIcon, CodeIcon } from 'lucide-react';

export const WhyNeedItSection = () => (
  <Section className="py-12 md:py-20 bg-gray-900/50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Why Your Business Needs It
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 text-center">
          <LightbulbIcon className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">แก้ปัญหาหลังบ้านล่ม</h3>
          <p className="text-gray-400">ระบบที่เสถียรและเชื่อถือได้ ช่วยให้การดำเนินงานไม่สะดุด</p>
        </Card>
        <Card className="p-6 text-center">
          <TrendingUpIcon className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">เชื่อมต่อยอดขายกับสต็อก</h3>
          <p className="text-gray-400">เห็นภาพรวมธุรกิจแบบเรียลไทม์ ตัดสินใจได้รวดเร็ว</p>
        </Card>
        <Card className="p-6 text-center">
          <CodeIcon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">บันทึกการขายที่เชื่อถือได้</h3>
          <p className="text-gray-400">ข้อมูลแม่นยำ ลดข้อผิดพลาด เพิ่มความน่าเชื่อถือ</p>
        </Card>
      </div>
    </div>
  </Section>
);
