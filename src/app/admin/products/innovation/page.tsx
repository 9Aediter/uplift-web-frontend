"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"

export default function InnovationPageAdmin() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/products", label: "Products" },
          { label: "Innovation Page" }
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
            Manage innovation content, products, and showcase
          </p>
        </div>
        <div className="px-4 lg:px-6">

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          {/* Page Header */}
          <Card>
            <CardHeader>
              <CardTitle>Page Header</CardTitle>
              <CardDescription>
                Main title and introduction for the innovation page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="page-title">Page Title</Label>
                  <Input
                    id="page-title"
                    placeholder="Enter page title"
                    defaultValue="Innovation Hub"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="page-subtitle">Page Subtitle</Label>
                  <Input
                    id="page-subtitle"
                    placeholder="Enter page subtitle"
                    defaultValue="Driving Tomorrow's Solutions Today"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="page-description">Page Description</Label>
                <Textarea
                  id="page-description"
                  placeholder="Enter page description"
                  rows={4}
                  defaultValue="Explore our cutting-edge innovations and breakthrough technologies that are reshaping industries and creating new possibilities for businesses worldwide."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="header-visible" defaultChecked />
                <Label htmlFor="header-visible">Show Page Header</Label>
              </div>
            </CardContent>
          </Card>

          {/* Innovation Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Innovation Categories</CardTitle>
              <CardDescription>
                Organize innovations by categories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Artificial Intelligence</Badge>
                <Badge variant="secondary">Blockchain</Badge>
                <Badge variant="secondary">IoT Solutions</Badge>
                <Badge variant="secondary">Cloud Computing</Badge>
                <Badge variant="secondary">Data Analytics</Badge>
                <Button variant="outline" size="sm">+ Add Category</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Innovation Products */}
          <Card>
            <CardHeader>
              <CardTitle>Innovation Products</CardTitle>
              <CardDescription>
                Manage innovative products and solutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">3 products active</p>
                <Button>Add New Product</Button>
              </div>
              
              <div className="space-y-4">
                {/* Product Item */}
                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">AI-Powered Analytics Platform</h4>
                      <p className="text-sm text-muted-foreground">Advanced analytics with machine learning capabilities</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>Active</Badge>
                        <Badge variant="outline">Featured</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Smart IoT Integration Suite</h4>
                      <p className="text-sm text-muted-foreground">Seamless IoT device management and monitoring</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>Active</Badge>
                        <Badge variant="outline">New</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">Blockchain Security Framework</h4>
                      <p className="text-sm text-muted-foreground">Enterprise-grade blockchain security solutions</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="showcase" className="space-y-6">
          {/* Innovation Showcase */}
          <Card>
            <CardHeader>
              <CardTitle>Innovation Showcase</CardTitle>
              <CardDescription>
                Featured innovations and success stories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="showcase-title">Showcase Title</Label>
                <Input
                  id="showcase-title"
                  placeholder="Enter showcase title"
                  defaultValue="Featured Innovations"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="showcase-description">Showcase Description</Label>
                <Textarea
                  id="showcase-description"
                  placeholder="Enter showcase description"
                  defaultValue="Discover our latest breakthrough innovations that are transforming industries."
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="showcase-visible" defaultChecked />
                <Label htmlFor="showcase-visible">Show Innovation Showcase</Label>
              </div>
            </CardContent>
          </Card>

          {/* Case Studies */}
          <Card>
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>
                Real-world applications and success stories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">2 case studies published</p>
                <Button>Add Case Study</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Search engine optimization for innovation page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Enter meta title"
                    defaultValue="Innovation Hub - Uplift Technologies"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta-keywords">Meta Keywords</Label>
                  <Input
                    id="meta-keywords"
                    placeholder="Enter keywords"
                    defaultValue="innovation, technology, AI, blockchain, IoT, solutions"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  placeholder="Enter meta description"
                  defaultValue="Explore cutting-edge innovations and breakthrough technologies from Uplift. Discover AI, blockchain, and IoT solutions reshaping industries."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input
                  id="canonical-url"
                  placeholder="Enter canonical URL"
                  defaultValue="https://uplift.com/innovation"
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