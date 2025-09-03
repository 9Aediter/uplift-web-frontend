import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus } from "lucide-react"
import { Button } from "@/components/button/button"

const mockBlogs = [
  {
    id: "1",
    title: "The Future of AI in Business Transformation",
    category: "Technology",
    author: "John Doe",
    status: "Published",
    views: 1250,
    publishedAt: "2024-01-20",
    createdAt: "2024-01-18",
  },
  {
    id: "2",
    title: "Cloud Migration Best Practices for SMEs",
    category: "Cloud Computing",
    author: "Jane Smith",
    status: "Published",
    views: 890,
    publishedAt: "2024-01-18",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    title: "Cybersecurity Trends to Watch in 2024",
    category: "Security",
    author: "Bob Wilson",
    status: "Draft",
    views: 0,
    publishedAt: null,
    createdAt: "2024-01-16",
  },
  {
    id: "4",
    title: "Building Scalable Applications with Microservices",
    category: "Development",
    author: "Alice Johnson",
    status: "Published",
    views: 675,
    publishedAt: "2024-01-15",
    createdAt: "2024-01-12",
  },
]

export default function BlogsPage() {
  return (
    <>
      <SiteHeader
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Blogs" }
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
            Manage blog posts and articles
          </p>
        </div>
        <DataTable data={mockBlogs} entityName="Post" views={["table", "card"]} />
      </div>
    </>
  )
}