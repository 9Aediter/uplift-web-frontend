"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

export default function ContactPageAdmin() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/website", label: "Website" },
          { label: "Contact Page" }
        ]}
        action={
          <div className="flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Save Changes</Button>
          </div>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage contact information and contact form settings
          </p>
        </div>
        <div className="px-4 lg:px-6">

      <Tabs defaultValue="contact-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact-info">Contact Info</TabsTrigger>
          <TabsTrigger value="form">Contact Form</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="contact-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Company contact details and office information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    placeholder="Enter company name"
                    defaultValue="Uplift Technologies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    defaultValue="+66 2 123 4567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    defaultValue="contact@uplift.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="Enter website URL"
                    defaultValue="https://uplift.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Office Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter office address"
                  rows={3}
                  defaultValue="123 Innovation Drive, Tech District, Bangkok 10110, Thailand"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-hours">Business Hours</Label>
                  <Input
                    id="business-hours"
                    placeholder="Enter business hours"
                    defaultValue="Mon-Fri 9:00 AM - 6:00 PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    placeholder="Enter timezone"
                    defaultValue="UTC+7 (Bangkok)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
              <CardDescription>
                Configure contact form fields and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  placeholder="Enter form title"
                  defaultValue="Get in Touch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  placeholder="Enter form description"
                  defaultValue="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="form-enabled" defaultChecked />
                  <Label htmlFor="form-enabled">Enable Contact Form</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-phone" />
                  <Label htmlFor="require-phone">Require Phone Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-company" />
                  <Label htmlFor="require-company">Require Company Name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  placeholder="Enter notification email"
                  defaultValue="notifications@uplift.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="success-message">Success Message</Label>
                <Textarea
                  id="success-message"
                  placeholder="Enter success message"
                  defaultValue="Thank you for your message! We'll get back to you within 24 hours."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location & Map</CardTitle>
              <CardDescription>
                Configure location and map display settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="Enter latitude"
                    defaultValue="13.7563"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="Enter longitude"
                    defaultValue="100.5018"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="map-title">Map Section Title</Label>
                <Input
                  id="map-title"
                  placeholder="Enter map section title"
                  defaultValue="Visit Our Office"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="directions">Directions</Label>
                <Textarea
                  id="directions"
                  placeholder="Enter directions"
                  rows={3}
                  defaultValue="Located in the heart of Bangkok's tech district, easily accessible by BTS and MRT."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="show-map" defaultChecked />
                <Label htmlFor="show-map">Show Interactive Map</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="map-api-key">Google Maps API Key</Label>
                <Input
                  id="map-api-key"
                  type="password"
                  placeholder="Enter Google Maps API key"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Search engine optimization for contact page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Enter meta title"
                    defaultValue="Contact Us - Uplift Technologies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    placeholder="Enter keywords"
                    defaultValue="contact, office, location, phone, email, address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Enter meta description"
                  defaultValue="Contact Uplift Technologies. Get in touch with our team, visit our office, or send us a message. We're here to help."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </div>
    </>
  )
}