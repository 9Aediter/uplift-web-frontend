import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockServices = [
  {
    id: "1",
    name: "Digital Transformation Consulting",
    category: "Consulting",
    status: "Active",
    price: "Custom Quote",
    duration: "3-6 months",
    clients: 28,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Cloud Migration Services",
    category: "Cloud",
    status: "Active",
    price: "$5,000 - $50,000",
    duration: "1-4 months",
    clients: 35,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "AI/ML Implementation",
    category: "AI/ML",
    status: "Active",
    price: "$10,000 - $100,000",
    duration: "2-8 months",
    clients: 15,
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Cybersecurity Assessment",
    category: "Security",
    status: "Active",
    price: "$2,000 - $15,000",
    duration: "2-4 weeks",
    clients: 42,
    createdAt: "2023-12-20",
  },
]

export default function ServicesPage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Services" }
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
            Manage consulting services and offerings
          </p>
        </div>
        <DataTable data={mockServices} entityName="Service" views={["table", "card"]} />
      </div>
    </>
  )
}