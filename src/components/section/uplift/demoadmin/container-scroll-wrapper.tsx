"use client";

import React from "react";
import dynamic from "next/dynamic";

const ContainerScroll = dynamic(
  () => import("@/components/ui/container-scroll-animation").then((mod) => mod.ContainerScroll),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20">
        <div className="w-full max-w-4xl mx-auto bg-card/50 rounded-2xl h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }
);

const AdminInterfaceWrapper = dynamic(
  () => import("./admin-interface-wrapper").then((mod) => ({ default: mod.AdminInterfaceWrapper })),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-card rounded-xl overflow-hidden flex items-center justify-center h-[400px] sm:h-[500px] md:h-[600px] shadow-lg">
        <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
      </div>
    )
  }
);

interface Props {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}

export const ContainerScrollWrapper = ({ titleComponent, children }: Props) => {
  return (
    <ContainerScroll titleComponent={titleComponent}>
      {children}
    </ContainerScroll>
  );
};

export { AdminInterfaceWrapper };