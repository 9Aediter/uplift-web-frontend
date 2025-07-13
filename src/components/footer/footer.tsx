"use client"
import React, { useEffect } from 'react'
import { GithubIcon, TwitterIcon, LinkedinIcon, MailIcon } from 'lucide-react'
import { FaLine } from "react-icons/fa6"; // สำหรับ Line Icon
import Link from 'next/link'
import { RenderSocialLinks, RenderLinkItems } from './footer-components';
import { useFooterStore } from '@/lib/store/footer-store';

// ฟังก์ชันสำหรับ map ชื่อ platform กับ Icon Component
const getIconComponent = (platform: string) => {
  switch (platform) {
    case 'GitHub':
      return GithubIcon;
    case 'Twitter':
      return TwitterIcon;
    case 'LinkedIn':
      return LinkedinIcon;
    case 'Email':
      return MailIcon;
    case 'Line':
      return FaLine;
    default:
      return null; // หรือ Icon default ถ้าไม่มี icon ที่ตรงกัน
  }
};

const Footer = () => {
  const { processedFooterData, fetchFooter } = useFooterStore();

  useEffect(() => {
    fetchFooter();
  }, [fetchFooter]);

  // แปลงข้อมูล contract จาก store ให้อยู่ในรูปแบบที่ RenderSocialLinks ต้องการ
  const socialLinksFromStore = React.useMemo(() => {
    if (!processedFooterData || !processedFooterData.contract) {
      return [];
    }

    return processedFooterData.contract
      .filter(item => getIconComponent(item.platform) && item.url) // กรองเฉพาะรายการที่มี Icon และ URL
      .map(item => ({
        href: item.url!,
        Icon: getIconComponent(item.platform)!,
        label: item.platform.charAt(0).toUpperCase() + item.platform.slice(1), // ทำให้ตัวอักษรแรกเป็นตัวพิมพ์ใหญ่
      }));
  }, [processedFooterData]);

  // ดึงข้อมูล services จาก store
  const serviceLinksFromStore = React.useMemo(() => {
    if (!processedFooterData || !processedFooterData.services) {
      return [];
    }
    return processedFooterData.services;
  }, [processedFooterData]);

  // ดึงข้อมูล product จาก store
  const productLinksFromStore = React.useMemo(() => {
    if (!processedFooterData || !processedFooterData.product) {
      return []; // ถ้าไม่มีข้อมูล product ให้คืนค่าเป็น array ว่าง
    }
    // เนื่องจาก product เป็น object เดียว แต่ RenderLinkItems ต้องการ array
    // เราจึงแปลงให้เป็น array ที่มี object เดียว
    return [processedFooterData.product];
  }, [processedFooterData]);

  return (
    <footer className="px-8 mx-auto bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* โลโก้และข้อมูล */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                UPLIFT
              </span>
              <div className="h-3 w-3 rounded-full bg-cyan-400 ml-1 animate-pulse"></div>
            </div>
            <p className="mb-4">
              Engineered like infrastructure.
              <br />
              Designed like magic.
            </p>
            {/* ลิงก์ไอคอนโซเชียลมีเดีย */}
            <RenderSocialLinks links={socialLinksFromStore} />
          </div>
          {/* ลิงก์บริการ */}
          <div>
            <h3 className="text-white font-bold mb-4">Services</h3>
            <RenderLinkItems items={serviceLinksFromStore} />
          </div>
          {/* ลิงก์สินค้า */}
          <div>
            <h3 className="text-white font-bold mb-4">Products</h3>
            <RenderLinkItems items={productLinksFromStore} />
          </div>
          {/* ข้อมูลติดต่อ */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <p className="mb-2">info@uplift.dev</p>
            <p>+66 (093) 130-4223</p>
            {/* Terminal-inspired element */}
            <div className="mt-4 p-3 bg-gray-900 border border-gray-800 rounded text-sm font-mono">
              <div className="flex items-center">
                <span className="text-green-400">$</span>
                <span className="ml-2">connect --with=UPLIFT</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} UPLIFT. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm">
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
