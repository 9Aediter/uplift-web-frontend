"use client";

import { NavbarButton, MobileNavMenu } from "@/components/ui/resizable-navbar";
import { LogOutIcon, UserIcon, SettingsIcon } from "lucide-react";
import { IoLanguage } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileNavSheetProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  navItems: Array<{ name: string; link: string }>;
  isOpen: boolean;
  onClose: () => void;
  onLanguageSwitch: () => void;
  isAuthenticated: boolean;
}

export function MobileNavSheet({ 
  user, 
  navItems, 
  isOpen, 
  onClose, 
  onLanguageSwitch,
  isAuthenticated 
}: MobileNavSheetProps) {
  return (
    <MobileNavMenu
      key="mobile-menu"
      isOpen={isOpen}
      onClose={onClose}
    >
      {/* Show user info if logged in */}
      {isAuthenticated && user && (
        <div className="flex items-center gap-3 pb-4 mb-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>
              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user.name || "User"}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )}
      
      {/* Navigation Items */}
      {navItems.map((item, idx) => (
        <a
          key={`mobile-link-${idx}`}
          href={item.link}
          onClick={onClose}
          className="relative text-neutral-600 dark:text-neutral-300"
        >
          <span className="block">{item.name}</span>
        </a>
      ))}
      
      {/* Menu Actions */}
      <div className="flex w-full flex-col gap-4">
        {isAuthenticated ? (
          <>
            <NavbarButton
              onClick={onClose}
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <UserIcon className="h-4 w-4" />
              Profile
            </NavbarButton>
            <NavbarButton
              onClick={onClose}
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                onLanguageSwitch();
                onClose();
              }}
              variant="ghost"
              className="w-full justify-start gap-3"
            >
              <IoLanguage className="h-4 w-4" />
              Language
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                onClose();
                signOut({ callbackUrl: "/" });
              }}
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOutIcon className="h-4 w-4" />
              Sign Out
            </NavbarButton>
          </>
        ) : (
          <NavbarButton
            onClick={() => {
              onLanguageSwitch();
              onClose();
            }}
            variant="ghost"
            className="w-full justify-start gap-3"
          >
            <IoLanguage className="h-4 w-4" />
            Language
          </NavbarButton>
        )}
        <NavbarButton
          onClick={onClose}
          variant="primary"
          className="w-full"
        >
          Book a call
        </NavbarButton>
      </div>
    </MobileNavMenu>
  );
}