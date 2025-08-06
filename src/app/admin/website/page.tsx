import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockWebsiteContent = [
  {
    id: "1",
    page: "Home",
    section: "Hero",
    title: "Transform Your Business with Technology",
    language: "EN",
    status: "Published",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    page: "Home",
    section: "Hero",
    title: "เปลี่ยนธุรกิจของคุณด้วยเทคโนโลยี",
    language: "TH",
    status: "Published",
    updatedAt: "2024-01-20",
  },
  {
    id: "3",
    page: "Home",
    section: "Services Preview",
    title: "Our Services",
    language: "EN",
    status: "Published",
    updatedAt: "2024-01-18",
  },
  {
    id: "4",
    page: "About",
    section: "Company Story",
    title: "About Uplift Technology",
    language: "EN",
    status: "Draft",
    updatedAt: "2024-01-15",
  },
]

export default function WebsitePage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Website" }
        ]}
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage website content and pages
          </p>
        </div>
        <DataTable data={mockWebsiteContent} entityName="Content" views={["table", "card"]} />
      </div>
    </>
  )
}