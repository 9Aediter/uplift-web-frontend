"use client"

import { SiteHeader } from "@/components/site-header"
import PageEditor from "@/components/admin/website/page-editor"

export default function CreateWebsitePage() {
  return (
    <>
      <SiteHeader 
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { href: "/admin/website", label: "Website" },
          { label: "Create Page" }
        ]}
      />
      <PageEditor pageId={null} isNewPage={true} />
    </>
  )
}