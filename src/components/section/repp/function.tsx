import { Tabs } from "@/components/ui/tabs";
import React from "react";
import Image from "next/image"; // นำเข้า Image จาก next/image
import { AnimateEffect } from "@/components/animate-effect"; // นำเข้า AnimateEffect

// ข้อมูลดิบสำหรับ Tabs
const tabRawData = [
  {
    title: "Trainer",
    value: "Trainer",
    contentTitle: "Trainer Booking Management",
    gradient: "from-purple-700 to-violet-900", // นำ gradient กลับมา
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Member",
    value: "member",
    contentTitle: "Membership Management",
    gradient: "from-blue-700 to-cyan-900", // ตัวอย่าง gradient อื่น
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1675&q=80",
  },
  {
    title: "Check-IN",
    value: "checkin",
    contentTitle: "Check IN via QR-Code",
    gradient: "from-green-700 to-lime-900", // ตัวอย่าง gradient อื่น
    imageUrl: "https://picsum.photos/seed/picsum/1000/1000",
  },
  {
    title: "Revenue",
    value: "revenue",
    contentTitle: "Realtime Revenue",
    gradient: "from-red-700 to-orange-900", // ตัวอย่าง gradient อื่น
    imageUrl: "https://picsum.photos/seed/picsum/1000/1000?grayscale",
  },
  {
    title: "Random",
    value: "random",
    contentTitle: "Random tab",
    gradient: "from-yellow-700 to-amber-900", // ตัวอย่าง gradient อื่น
    imageUrl: "https://picsum.photos/seed/picsum/1000/1000?blur=2",
  },
];

// ฟังก์ชันสำหรับสร้างข้อมูล Tabs จากข้อมูลดิบ
const getTabData = () => {
  return tabRawData.map((tab) => ({
    title: tab.title,
    value: tab.value,
    content: (
      <div className={`w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br ${tab.gradient}`}> {/* ใช้ tab.gradient */}
        <p>{tab.contentTitle}</p>
        <Content imageUrl={tab.imageUrl} />
      </div>
    ),
  }));
};

export function Function() {
  const tabsData = getTabData();

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-7xl mx-auto w-full  items-start justify-start my-40">

      <Tabs tabs={tabsData} />

    </div>
  );
}

// เปลี่ยนชื่อจาก DummyContent เป็น Content และรับ imageUrl เป็น prop
interface ContentProps {
  imageUrl: string;
}

const Content: React.FC<ContentProps> = ({ imageUrl }) => {
  return (
    <Image
      src={imageUrl}
      alt="tab content image"
      width={1000}
      height={1000}
      className="object-cover object-left-top h-full absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};

