"use client";

import { Button } from "@/components/ui/button";
import { LogOutIcon, UserIcon, SettingsIcon, ShieldIcon } from "lucide-react";
import { IoLanguage } from "react-icons/io5";
import { useAuth, useAuthActions } from "@/lib/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { authApi } from "@/lib/api/auth";
import { toast } from "sonner";

interface NavSheetProps {
  user: {
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
    roles?: Array<{
      name: string;
      pathRoles: string;
      type: string;
    }>;
  };
  onClose: () => void;
  onLanguageSwitch: () => void;
}

export function NavSheet({ user, onClose, onLanguageSwitch }: NavSheetProps) {
  const { logout } = useAuthActions();
  
  // Check if user has admin role
  const hasAdminRole = user?.roles?.some(role => 
    role.type === 'admin' || role.pathRoles === 'admin'
  );
  
  console.log('🔍 NavSheet - User roles:', user?.roles);
  console.log('🔍 NavSheet - Has admin role:', hasAdminRole);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* User Info */}
      <div className="flex items-center gap-3 pb-4 border-b">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.avatar || ""} alt={user.name || "User"} />
          <AvatarFallback>
            {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{user.name || "User"}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        <Link href="/user/profile" onClick={onClose}>
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <UserIcon className="h-4 w-4" />
            Profile
          </Button>
        </Link>
        
        <Link href="/user/settings" onClick={onClose}>
          <Button variant="ghost" className="w-full justify-start gap-3 h-12">
            <SettingsIcon className="h-4 w-4" />
            Settings
          </Button>
        </Link>

        {/* Admin Console - only show if user has admin role */}
        {hasAdminRole && (
          <Link href="/admin/dashboard" onClick={onClose}>
            <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <ShieldIcon className="h-4 w-4" />
              Admin Console
            </Button>
          </Link>
        )}
        
        <Button variant="ghost" className="justify-start gap-3 h-12" onClick={onLanguageSwitch}>
          <IoLanguage className="h-4 w-4" />
          Language
        </Button>
        
        <Button 
          variant="ghost" 
          className="justify-start gap-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50" 
          onClick={async () => {
            try {
              onClose();
              // Call backend logout API to clear httpOnly cookies
              await authApi.logout();
              // Clear local auth state
              logout();
              toast.success("Logged out successfully");
              window.location.href = "/";
            } catch (error) {
              console.error("Logout error:", error);
              // Still logout locally even if API fails
              logout();
              window.location.href = "/";
            }
          }}
        >
          <LogOutIcon className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}