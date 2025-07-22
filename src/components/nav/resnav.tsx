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
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname


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
                        {/* <Button variant="ghost" size="icon" onClick={() => console.log("Search clicked")}>
                            <SearchIcon className="h-5 w-5" />
                        </Button> */}
                        <NavbarButton variant="ghost" onClick={handleLanguageSwitch}>
                            <IoLanguage />
                        </NavbarButton>
                        <NavbarButton variant="primary" className="flex items-center">Consult <LuExternalLink className="ml-2 h-4 w-4" /></NavbarButton>
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
                                <Button variant="ghost" size="icon">
                                    <IconMenu2 className="h-6 w-6 text-black dark:text-white" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                                {/* <div className="flex justify-end">
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon">
                                            <IconX className="h-6 w-6 text-black dark:text-white" />
                                        </Button>
                                    </SheetClose>
                                </div> */}
                                <MobileNavMenu
                                    key="mobile-menu"
                                    isOpen={isMobileMenuOpen}
                                    onClose={() => setIsMobileMenuOpen(false)}
                                >
                                    {navItems.map((item, idx) => (
                                        <a
                                            key={`mobile-link-${idx}`}
                                            href={item.link}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="relative text-neutral-600 dark:text-neutral-300"
                                        >
                                            <span className="block">{item.name}</span>
                                        </a>
                                    ))}
                                    <div className="flex w-full flex-col gap-4">
                                        <NavbarButton
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Login
                                        </NavbarButton>
                                        <NavbarButton
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Book a call
                                        </NavbarButton>
                                    </div>
                                </MobileNavMenu>
                            </SheetContent>
                        </Sheet>
                    </div>
                </MobileNavHeader>
            </MobileNav>

        </nav>
    );
}