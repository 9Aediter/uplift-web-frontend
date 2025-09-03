"use client";

import { LuExternalLink } from "react-icons/lu";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { IconMenu2 } from "@tabler/icons-react";
import { useAuth } from "@/lib/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

// Import organized nav components
import {
    Navbar,
    NavBody,
    NavItems,
    NavLogo,
    NavbarButton,
    MobileNav,
    MobileNavHeader,
} from "./index";
import { Button } from "@/components/button/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { NavSheet } from "./nav-sheet";


export default function DesktopNav() {

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
            name: "Innovation",
            link: "/innovation",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, status } = useAuth();


    return (
        <nav id="nav" className="z-50">
            {/* Desktop Navigation */}
            <Navbar className="hidden lg:block">
                {[<NavBody key="nav-body">
                    <NavLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {/* Theme toggle */}
                        <ThemeToggle />
                        
                        {/* Show avatar if logged in */}
                        {status === "authenticated" && user ? (
                            <Sheet open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar || ""} alt={user.name || "User"} />
                                            <AvatarFallback className="text-xs">
                                                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                    <NavSheet
                                        user={user}
                                        onClose={() => setIsUserMenuOpen(false)}
                                    />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <NavbarButton href="/consult" variant="primary" className="flex items-center">Consult <LuExternalLink className="ml-2 h-4 w-4" /></NavbarButton>
                        )}
                    </div>
                </NavBody>]}
            </Navbar>

            {/* Mobile Navigation */}
            <MobileNav className="py-4 lg:hidden">
                <MobileNavHeader key="mobile-header">
                    <NavLogo />
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        
                        <Button variant="ghost" size="icon" onClick={() => console.log("Search clicked")}>
                            <SearchIcon className="h-5 w-5" />
                        </Button>

                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                {status === "authenticated" && user ? (
                                    <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatar || ""} alt={user.name || "User"} />
                                            <AvatarFallback className="text-xs">
                                                {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
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
                                {user && (
                                    <NavSheet
                                        user={user}
                                        navItems={navItems}
                                        isMobile={true}
                                        onClose={() => setIsMobileMenuOpen(false)}
                                    />
                                )}
                            </SheetContent>
                        </Sheet>
                    </div>
                </MobileNavHeader>
            </MobileNav>

        </nav>
    );
}