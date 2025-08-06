"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

export default function AboutPageAdmin() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/website", label: "Website" },
          { label: "About Page" }
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
            Manage company story, vision, and team information
          </p>
        </div>
        <div className="px-4 lg:px-6">

      <Tabs defaultValue="story" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="story">Story</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="story" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Story</CardTitle>
              <CardDescription>
                Tell your company's journey and mission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="story-title">Story Title</Label>
                <Input
                  id="story-title"
                  placeholder="Enter story title"
                  defaultValue="Our Story"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-content">Story Content</Label>
                <Textarea
                  id="story-content"
                  placeholder="Enter company story"
                  rows={8}
                  defaultValue="Founded with a vision to transform businesses through technology, Uplift has been at the forefront of innovation..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="story-visible" defaultChecked />
                <Label htmlFor="story-visible">Show Story Section</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vision & Mission</CardTitle>
              <CardDescription>
                Define your company's vision and mission statements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vision-title">Vision Title</Label>
                <Input
                  id="vision-title"
                  placeholder="Enter vision title"
                  defaultValue="Our Vision"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-content">Vision Statement</Label>
                <Textarea
                  id="vision-content"
                  placeholder="Enter vision statement"
                  rows={4}
                  defaultValue="To be the leading catalyst for digital transformation, empowering businesses to thrive in the digital age."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-title">Mission Title</Label>
                <Input
                  id="mission-title"
                  placeholder="Enter mission title"
                  defaultValue="Our Mission"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-content">Mission Statement</Label>
                <Textarea
                  id="mission-content"
                  placeholder="Enter mission statement"
                  rows={4}
                  defaultValue="We deliver innovative technology solutions that drive growth, efficiency, and competitive advantage for our clients."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Section</CardTitle>
              <CardDescription>
                Manage team members and leadership
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">5 team members</p>
                <Button>Add Team Member</Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-title">Team Section Title</Label>
                <Input
                  id="team-title"
                  placeholder="Enter team section title"
                  defaultValue="Meet Our Team"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-description">Team Description</Label>
                <Textarea
                  id="team-description"
                  placeholder="Enter team description"
                  defaultValue="Our diverse team of experts brings together years of experience in technology and business innovation."
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
                Search engine optimization for about page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Enter meta title"
                    defaultValue="About Us - Uplift Technologies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    placeholder="Enter keywords"
                    defaultValue="about, company, team, vision, mission, technology"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Enter meta description"
                  defaultValue="Learn about Uplift Technologies - our story, vision, mission, and the expert team driving digital transformation."
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