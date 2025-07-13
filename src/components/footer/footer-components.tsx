import React from 'react';
import Link from 'next/link';
// import { Icon as LucideIcon } from 'lucide-react'; // ลบบรรทัดนี้ออก

// Interface สำหรับลิงก์โซเชียลมีเดีย
interface SocialLink {
  href: string;
  Icon: React.ComponentType<{ size?: number }>
  label: string;
}

// Component สำหรับแสดงผลลิงก์โซเชียลมีเดีย
interface RenderSocialLinksProps {
  links: SocialLink[];
}

export const RenderSocialLinks: React.FC<RenderSocialLinksProps> = ({ links }) => (
  <div className="flex space-x-4">
    {links.map((link) => (
      <Link
        key={link.label} // แก้ไขตรงนี้: ใช้ link.label เป็น key แทน index
        href={link.href}
        className="hover:text-cyan-400 transition-colors"
        target="_blank" // สำหรับลิงก์ภายนอก
        rel="noopener noreferrer" // เพื่อความปลอดภัย
        aria-label={link.label} // เพื่อการเข้าถึง
      >
        <link.Icon size={18} />
      </Link>
    ))}
  </div>
);

// Component สำหรับแสดงผลลิงก์รายการทั่วไป (เช่น Services, Products)
interface RenderLinkItemsProps {
  items: { title: string; link: string; }[];
}

export const RenderLinkItems: React.FC<RenderLinkItemsProps> = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.title}>
        <Link href={item.link} className="hover:text-cyan-400 transition-colors">
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);
