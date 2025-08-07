"use client";
import { LuExternalLink } from "react-icons/lu";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { IoLanguage } from "react-icons/io5";
import { IconMenu2 } from "@tabler/icons-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavSheet } from "./nav-sheet";
import { MobileNavSheet } from "./mobile-nav-sheet";


export default function DesktopNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        {
            name: "Story",
            link: "/story",
        },
        {
            name: "Service",
            link: "/service",
        },
        {
            name: "Solution",
            link: "/solutions",
        },
        {
            name: "Inovation",
            link: "/innovation",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const handleLanguageSwitch = () => {
        const currentLocale = pathname.split('/')[1]; // Get current locale from path (e.g., 'en' from '/en/story')
        const newLocale = currentLocale === 'en' ? 'th' : 'en';
        const newPath = `/${newLocale}${pathname.substring(currentLocale.length + 1)}`;
        router.push(newPath);
    };

    return (
        <nav id="nav" className="z-50">
            {/* Desktop Navigation */}
            <Navbar className="hidden lg:block">
                {[<NavBody key="nav-body">
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {/* Show avatar if logged in, otherwise show language switcher */}
                        {status === "authenticated" && session?.user ? (
                            <Sheet open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                            <AvatarFallback className="text-xs">
                                                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <NavSheet 
                                        user={session.user}
                                        onClose={() => setIsUserMenuOpen(false)}
                                        onLanguageSwitch={() => {
                                            handleLanguageSwitch();
                                            setIsUserMenuOpen(false);
                                        }}
                                    />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <NavbarButton variant="ghost" onClick={handleLanguageSwitch}>
                                <IoLanguage />
                            </NavbarButton>
                        )}
                        
                        <NavbarButton href="/consult" variant="primary" className="flex items-center">Consult <LuExternalLink className="ml-2 h-4 w-4" /></NavbarButton>
                    </div>
                </NavBody>]}
            </Navbar>

            {/* Mobile Navigation */}
            <MobileNav className="py-4 lg:hidden">
                <MobileNavHeader key="mobile-header">
                    <NavbarLogo />
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => console.log("Search clicked")}>
                            <SearchIcon className="h-5 w-5" />
                        </Button>

                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                {status === "authenticated" && session?.user ? (
                                    <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                            <AvatarFallback className="text-xs">
                                                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                ) : (
                                    <Button variant="ghost" size="icon">
                                        <IconMenu2 className="h-6 w-6 text-black dark:text-white" />
                                    </Button>
                                )}
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                <MobileNavSheet
                                    user={session?.user}
                                    navItems={navItems}
                                    isOpen={isMobileMenuOpen}
                                    onClose={() => setIsMobileMenuOpen(false)}
                                    onLanguageSwitch={handleLanguageSwitch}
                                    isAuthenticated={status === "authenticated"}
                                />
                            </SheetContent>
                        </Sheet>
                    </div>
                </MobileNavHeader>
            </MobileNav>

        </nav>
    );
}