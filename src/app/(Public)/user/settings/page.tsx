"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, ShieldIcon, BellIcon, PaletteIcon, GlobeIcon, KeyIcon } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    
    // Privacy
    profileVisible: true,
    activityVisible: false,
    
    // Appearance
    theme: "dark",
    language: "en",
    
    // Security
    twoFactorEnabled: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!session) return null;

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Here you would make API call to update settings
      // const response = await fetch('/api/user/settings', { ... });
      
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    // Redirect to change password page or open modal
    toast.info("Change password functionality coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <p className="text-gray-400">Manage your account preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          
          {/* Notifications Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <BellIcon className="h-5 w-5 text-blue-400" />
                <div>
                  <CardTitle className="text-white">Notifications</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure how you receive notifications
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Push Notifications</Label>
                  <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, pushNotifications: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, marketingEmails: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <ShieldIcon className="h-5 w-5 text-green-400" />
                <div>
                  <CardTitle className="text-white">Privacy</CardTitle>
                  <CardDescription className="text-gray-400">
                    Control your privacy and data visibility
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Profile Visibility</Label>
                  <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                </div>
                <Switch
                  checked={settings.profileVisible}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, profileVisible: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Activity Visibility</Label>
                  <p className="text-sm text-gray-500">Show your activity status to others</p>
                </div>
                <Switch
                  checked={settings.activityVisible}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, activityVisible: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <PaletteIcon className="h-5 w-5 text-purple-400" />
                <div>
                  <CardTitle className="text-white">Appearance</CardTitle>
                  <CardDescription className="text-gray-400">
                    Customize the look and feel of your interface
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-300">Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="th">ไทย</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center gap-3">
                <KeyIcon className="h-5 w-5 text-red-400" />
                <div>
                  <CardTitle className="text-white">Security</CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your account security settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={settings.twoFactorEnabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, twoFactorEnabled: checked }))
                  }
                />
              </div>
              
              <Separator className="bg-gray-800" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gray-300">Password</Label>
                  <p className="text-sm text-gray-500">Change your account password</p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleChangePassword}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSaveSettings}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}