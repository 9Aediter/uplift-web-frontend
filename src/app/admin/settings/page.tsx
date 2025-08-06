import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockSettings = [
  {
    id: "1",
    category: "General",
    key: "site_name",
    value: "Uplift Technology",
    description: "Website name",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    category: "General",
    key: "site_description",
    value: "Technology consulting services",
    description: "Website description",
    updatedAt: "2024-01-20",
  },
  {
    id: "3",
    category: "Email",
    key: "smtp_host",
    value: "smtp.gmail.com",
    description: "SMTP server host",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    category: "Social",
    key: "google_analytics_id",
    value: "GA-XXXXXXXXX",
    description: "Google Analytics tracking ID",
    updatedAt: "2024-01-10",
  },
]

export default function SettingsPage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Settings" }
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
            Manage system settings and configuration
          </p>
        </div>
        <DataTable data={mockSettings} entityName="Setting" views={["table", "card"]} />
      </div>
    </>
  )
}