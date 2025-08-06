import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockRoles = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access",
    permissions: 25,
    users: 2,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access",
    permissions: 18,
    users: 5,
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    name: "User",
    description: "Basic user access",
    permissions: 8,
    users: 142,
    createdAt: "2024-01-01",
  },
]

export default function RolesPage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Roles" }
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
            Manage user roles and permissions
          </p>
        </div>
        <DataTable data={mockRoles} entityName="Role" views={["table", "card"]} />
      </div>
    </>
  )
}