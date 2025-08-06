"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { SiteHeader } from "@/components/site-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { HeroSectionEditorDB } from "@/components/admin/hero-section-editor-db"

export default function HomePageAdmin() {
  return (
    <>
      {/* Header */}
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/website", label: "Website" },
          { label: "Home Page" }
        ]}
        action={
          <div className="flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Save Changes</Button>
          </div>
        }
      />
      {/* Content */}
      <div className="flex flex-col h-[calc(95vh-var(--header-height))] overflow-hidden">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Title */}
          <div className="px-4 lg:px-6 py-4">
            <p className="text-muted-foreground">
              Manage your website's home page content and settings
            </p>
          </div>
          
          <Tabs defaultValue="hero" className="w-full">
            {/* Sticky TabsList */}
            <div className="sticky top-0 bg-background z-10 px-4 lg:px-6 pb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="problems">Problems Section</TabsTrigger>
                <TabsTrigger value="language">Languages</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
            </div>

            {/* Scrollable Tab Content */}
            <div className="px-4 lg:px-6 pb-6">
              {/* Hero Section */}
              <TabsContent value="hero" className="space-y-6 mt-0">
                <HeroSectionEditorDB
                  pageSlug="home"
                  title="Hero Section"
                  description="Main banner and call-to-action area with database integration and workflow"
                  onDataChange={(data) => {
                    console.log('Hero data changed:', data)
                  }}
                />
              </TabsContent>

              <TabsContent value="problems" className="space-y-6 mt-0">
                {/* Problem Section - English */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Problems Section
                      <Badge variant="outline">EN</Badge>
                    </CardTitle>
                    <CardDescription>
                      Section highlighting challenges and solutions for English version
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="problem-title-en">Section Title</Label>
                      <Input
                        id="problem-title-en"
                        placeholder="Enter section title"
                        defaultValue="Challenges We Solve"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="problem-subtitle-en">Section Subtitle</Label>
                      <Textarea
                        id="problem-subtitle-en"
                        placeholder="Enter section subtitle"
                        defaultValue="In today's rapidly evolving landscape, innovation isn't optional—it's essential for survival."
                      />
                    </div>

                    <Separator className="my-6" />
                    <h4 className="font-medium">Problem Items</h4>

                    {/* Problem Item 1 */}
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">Item 1</h5>
                          <Badge variant="secondary">Cyan Glow</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="problem1-title-en">Title</Label>
                            <Input
                              id="problem1-title-en"
                              defaultValue="Stuck in Traditional Ways"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="problem1-icon-en">Icon</Label>
                            <Select defaultValue="TrendingUpIcon">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TrendingUpIcon">TrendingUpIcon</SelectItem>
                                <SelectItem value="ZapIcon">ZapIcon</SelectItem>
                                <SelectItem value="BarChartIcon">BarChartIcon</SelectItem>
                                <SelectItem value="RefreshCcwIcon">RefreshCcwIcon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="problem1-desc-en">Description</Label>
                          <Textarea
                            id="problem1-desc-en"
                            defaultValue="You risk being left behind. We help future-proof your business before others take your place."
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Problem Item 2 */}
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">Item 2</h5>
                          <Badge variant="secondary">Magenta Glow</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="problem2-title-en">Title</Label>
                            <Input
                              id="problem2-title-en"
                              defaultValue="Outdated Tools & Processes"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="problem2-icon-en">Icon</Label>
                            <Select defaultValue="ZapIcon">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TrendingUpIcon">TrendingUpIcon</SelectItem>
                                <SelectItem value="ZapIcon">ZapIcon</SelectItem>
                                <SelectItem value="BarChartIcon">BarChartIcon</SelectItem>
                                <SelectItem value="RefreshCcwIcon">RefreshCcwIcon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="problem2-desc-en">Description</Label>
                          <Textarea
                            id="problem2-desc-en"
                            defaultValue="Manual spreadsheets? Scattered data? We modernize your operations with seamless systems."
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Problem Item 3 */}
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">Item 3</h5>
                          <Badge variant="secondary">Blue Glow</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="problem3-title-en">Title</Label>
                            <Input
                              id="problem3-title-en"
                              defaultValue="No Clarity from Your Data"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="problem3-icon-en">Icon</Label>
                            <Select defaultValue="BarChartIcon">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TrendingUpIcon">TrendingUpIcon</SelectItem>
                                <SelectItem value="ZapIcon">ZapIcon</SelectItem>
                                <SelectItem value="BarChartIcon">BarChartIcon</SelectItem>
                                <SelectItem value="RefreshCcwIcon">RefreshCcwIcon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="problem3-desc-en">Description</Label>
                          <Textarea
                            id="problem3-desc-en"
                            defaultValue="We turn confusing data into clear dashboards and insights you can act on."
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Problem Item 4 */}
                    <Card className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium">Item 4</h5>
                          <Badge variant="secondary">Lime Glow</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="problem4-title-en">Title</Label>
                            <Input
                              id="problem4-title-en"
                              defaultValue="Slow to Adapt to Change"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="problem4-icon-en">Icon</Label>
                            <Select defaultValue="RefreshCcwIcon">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="TrendingUpIcon">TrendingUpIcon</SelectItem>
                                <SelectItem value="ZapIcon">ZapIcon</SelectItem>
                                <SelectItem value="BarChartIcon">BarChartIcon</SelectItem>
                                <SelectItem value="RefreshCcwIcon">RefreshCcwIcon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="problem4-desc-en">Description</Label>
                          <Textarea
                            id="problem4-desc-en"
                            defaultValue="Our agile team helps you move fast. MVP first. Iterate later. You stay ahead of your market."
                          />
                        </div>
                      </div>
                    </Card>
                  </CardContent>
                </Card>

                {/* Problem Section - Thai */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Problems Section
                      <Badge variant="outline">TH</Badge>
                    </CardTitle>
                    <CardDescription>
                      Section highlighting challenges and solutions for Thai version
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="problem-title-th">Section Title (Thai)</Label>
                      <Input
                        id="problem-title-th"
                        placeholder="Enter section title in Thai"
                        defaultValue="ปัญหาที่คุณแก้ได้"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="problem-subtitle-th">Section Subtitle (Thai)</Label>
                      <Textarea
                        id="problem-subtitle-th"
                        placeholder="Enter section subtitle in Thai"
                        defaultValue="ในโลกที่เปลี่ยนเร็ว นวัตกรรมไม่ใช่ทางเลือก — แต่คือสิ่งจำเป็น"
                      />
                    </div>

                    <Separator className="my-6" />
                    <h4 className="font-medium">Problem Items (Thai)</h4>

                    {/* Thai Problem Items - abbreviated for space */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-3 border rounded">
                        <Input defaultValue="ยังทำงานแบบเดิมอยู่" className="mb-2" />
                        <Textarea defaultValue="ธุรกิจแบบเดิมเสี่ยงจะถูกแทนที่ เราช่วยให้คุณก้าวทันก่อนใคร" />
                      </div>
                      <div className="p-3 border rounded">
                        <Input defaultValue="ใช้ Excel หรือระบบที่กระจัดกระจาย" className="mb-2" />
                        <Textarea defaultValue="ข้อมูลไม่เชื่อมกัน? เรายกระดับให้คุณมีระบบที่ทำงานราบรื่นในทุกขั้นตอน" />
                      </div>
                      <div className="p-3 border rounded">
                        <Input defaultValue="มีข้อมูลแต่ไม่รู้จะใช้ยังไง" className="mb-2" />
                        <Textarea defaultValue="เราสร้าง Dashboard และรายงานที่ใช้งานได้จริง ตัดสินใจได้แม่นยำขึ้น" />
                      </div>
                      <div className="p-3 border rounded">
                        <Input defaultValue="พัฒนาอะไรก็ช้า ไม่ทันตลาด" className="mb-2" />
                        <Textarea defaultValue="เราช่วยวางแผนแบบ Agile สร้าง MVP ได้เร็ว ปรับได้ไว ไม่เสียเวลา" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Language Settings</CardTitle>
                    <CardDescription>
                      Manage multi-language support and default language
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-language">Default Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="th">Thai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-thai" defaultChecked />
                      <Label htmlFor="enable-thai">Enable Thai Language</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-detect-language" defaultChecked />
                      <Label htmlFor="auto-detect-language">Auto-detect User Language</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="seo" className="space-y-6 mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Settings</CardTitle>
                    <CardDescription>
                      Search engine optimization settings for home page
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="meta-title">Meta Title</Label>
                        <Input
                          id="meta-title"
                          placeholder="Enter meta title"
                          defaultValue="Uplift - Transform Your Business with Innovation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="meta-keywords">Meta Keywords</Label>
                        <Input
                          id="meta-keywords"
                          placeholder="Enter keywords"
                          defaultValue="innovation, technology, solutions, business transformation"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta-description">Meta Description</Label>
                      <Textarea
                        id="meta-description"
                        placeholder="Enter meta description"
                        defaultValue="Transform your business with revolutionary solutions. We're not just another tech startup - we're building the future with innovative technology."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="og-image">Open Graph Image URL</Label>
                      <Input
                        id="og-image"
                        placeholder="Enter OG image URL"
                        defaultValue="/og-home.jpg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  )
}