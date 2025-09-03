import React from "react";
import { FaDesktop, FaDatabase, FaShieldAlt, FaChartBar } from "react-icons/fa";
import { Section } from "@/components/ui/section";
import { ContainerScrollWrapper, AdminInterfaceWrapper } from "./demoadmin/container-scroll-wrapper";

export function DemoAdmin() {
  
  return (
    <Section className="flex flex-col overflow-hidden bg-black">
      <ContainerScrollWrapper
        titleComponent={
          <>
            <div className="text-center space-y-6 pt-12">
              <div className="w-fit mb-8 mx-auto inline-flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/20">
                <FaDesktop className="h-4 w-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-300">Web Development</span>
              </div>
              <h1 className="text-4xl font-semibold text-white">
                ระบบหลังบ้านที่ <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  ทรงพลัง
                </span>
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                พัฒนาระบบบริหารจัดการและแดชบอร์ดที่ตอบสนองความต้องการธุรกิจ 
                ด้วยเทคโนโลยีเว็บที่ทันสมัยและปลอดภัย
              </p>
              
              {/* Service Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaChartBar className="text-blue-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Analytics</h3>
                  <p className="text-gray-400 text-xs">แดชบอร์ด Real-time</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaDatabase className="text-green-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Database</h3>
                  <p className="text-gray-400 text-xs">ฐานข้อมูลมีประสิทธิภาพ</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaShieldAlt className="text-purple-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Security</h3>
                  <p className="text-gray-400 text-xs">ความปลอดภัยสูง</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaDesktop className="text-red-400 text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">Responsive</h3>
                  <p className="text-gray-400 text-xs">ใช้งานทุกอุปกรณ์</p>
                </div>
              </div>
            </div>
          </>
        }
      >
        {/* Main Content */}
        <div className="relative mx-auto rounded-2xl overflow-hidden h-full bg-gradient-to-br from-card to-muted border border-border shadow-2xl">
          {/* Browser Header */}
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1 bg-muted rounded-lg px-3 py-1.5 ml-4">
                <span className="text-muted-foreground text-sm">https://admin.uplift.co/dashboard</span>
              </div>
            </div>
            
            {/* Admin Interface */}
            <AdminInterfaceWrapper />
          </div>
        </div>
      </ContainerScrollWrapper>
    </Section>
  );
}