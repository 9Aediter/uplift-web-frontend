import React from "react";
import Navbar from "@/components/nav/resnav";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="w-full min-h-screen">
            <Navbar/>
            {children}
        </div>
    );
};

export default Layout;
