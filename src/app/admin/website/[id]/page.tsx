"use client"

import { use } from "react"
import { SiteHeader } from "@/components/site-header"
import PageEditor from "@/components/admin/website/page-editor"

interface PageEditorProps {
  params: Promise<{
    id: string
  }>
}

export default function EditWebsitePage({ params }: PageEditorProps) {
  // Unwrap params using React.use()
  const { id } = use(params)
  
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/website", label: "Website" },
          { label: "Edit Page" }
        ]}
      />
      <PageEditor pageId={id} isNewPage={false} />
    </>
  )
}