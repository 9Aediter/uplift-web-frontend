"use client";

import { useAuth } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/basic/button/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/basic/input/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/basic/input/textarea";
import { ArrowLeftIcon, EditIcon, SaveIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  bio?: string;
}

interface UserData {
  id: string;
  email: string;
  emailVerified?: string;
  status: string;
  lastLoginAt?: string;
  roles: string[];
  profile?: UserProfile;
  accounts: any[];
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { user, status } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "",
    bio: "",
    city: "",
    country: "",
    address: "",
    zipCode: "",
  });

  useEffect(() => {
    if (!user && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [user, status, router]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          setFetchLoading(true);
          const response = await fetch('/api/auth/me');

          if (response.ok) {
            const data: UserData = await response.json();
            setUserData(data);

            // Update form data with fetched profile
            setFormData({
              firstName: data.profile?.firstName || "",
              lastName: data.profile?.lastName || "",
              displayName: data.profile?.displayName || user.name || "",
              email: data.email || "",
              phone: data.profile?.phone || "",
              bio: data.profile?.bio || "",
              city: data.profile?.city || "",
              country: data.profile?.country || "",
              address: data.profile?.address || "",
              zipCode: data.profile?.zipCode || "",
            });
          } else {
            toast.error("Failed to fetch profile data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to fetch profile data");
        } finally {
          setFetchLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (status === "loading" || fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            displayName: formData.displayName,
            phone: formData.phone,
            bio: formData.bio,
            city: formData.city,
            country: formData.country,
            address: formData.address,
            zipCode: formData.zipCode,
          }
        }),
      });

      if (response.ok) {
        const updatedData: UserData = await response.json();
        setUserData(updatedData);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    if (userData) {
      setFormData({
        firstName: userData.profile?.firstName || "",
        lastName: userData.profile?.lastName || "",
        displayName: userData.profile?.displayName || user?.name || "",
        email: userData.email || "",
        phone: userData.profile?.phone || "",
        bio: userData.profile?.bio || "",
        city: userData.profile?.city || "",
        country: userData.profile?.country || "",
        address: userData.profile?.address || "",
        zipCode: userData.profile?.zipCode || "",
      });
    }
    setIsEditing(false);
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
              <h1 className="text-2xl font-bold">Profile</h1>
              <p className="text-gray-400">Manage your account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Profile Card */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Personal Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your personal details and profile information
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        <XIcon className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <SaveIcon className="h-4 w-4 mr-2" />
                        {loading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData?.profile?.avatar || user.avatar || ""} />
                    <AvatarFallback className="bg-gray-800 text-2xl">
                      {(userData?.profile?.displayName || user.name)?.charAt(0) ||
                        user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {userData?.profile?.displayName || user.name || "User"}
                    </h3>
                    <p className="text-gray-400">{userData?.email || user.email}</p>
                    {userData?.roles && (
                      <div className="flex gap-2 mt-2">
                        {userData.roles.map((role) => (
                          <span
                            key={role}
                            className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-gray-300">Display Name</Label>
                    <Input
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={true}
                      className="bg-gray-800 border-gray-700 text-white opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-300">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-gray-300">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white disabled:opacity-50 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}