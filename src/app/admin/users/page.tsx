import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
    status: "ACTIVE",
    createdAt: "2024-01-15",
    lastLogin: "2024-01-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-22",
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "USER",
    status: "INACTIVE",
    createdAt: "2024-01-05",
    lastLogin: "2024-01-18",
  },
]

export default function UsersPage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Users" }
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
            Manage user accounts and permissions
          </p>
        </div>
        <DataTable data={mockUsers} entityName="User" views={["table", "card"]} />
      </div>
    </>
  )
}