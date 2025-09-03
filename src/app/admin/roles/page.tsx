"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { useRoles, useRolesActions } from "@/lib/store/roles"
import { Plus } from "lucide-react"
import { Button } from "@/components/button/button"
import { RoleModal } from "@/components/admin/user/role-modal"

export default function RolesPage() {
  const { roles, isLoading, error } = useRoles()
  const { fetchRoles, deleteRole, updateRole } = useRolesActions()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editRole, setEditRole] = useState(null)

  // Fetch roles on component mount
  useEffect(() => {
    console.log('🔄 RolesPage - Fetching roles...')
    fetchRoles({ page: 1, limit: 10 })
  }, [fetchRoles])

  // Handle error display
  useEffect(() => {
    if (error) {
      console.error('❌ RolesPage - Error:', error)
    }
  }, [error])

  const handleEdit = (role: any) => {
    console.log('✏️ Edit role:', role)
    setEditRole(role)
    setShowCreateModal(true)
  }

  const handleDelete = async (role: any) => {
    if (window.confirm(`Are you sure you want to delete role "${role.name}"?`)) {
      try {
        await deleteRole(role.id)
      } catch (error) {
        console.error('❌ Delete role error:', error)
      }
    }
  }

  const handleCreate = () => {
    console.log('➕ Create new role')
    setEditRole(null)
    setShowCreateModal(true)
  }

  const handleStatusChange = async (role: any, newStatus: string) => {
    try {
      console.log('🔄 Toggle role status:', role.name, 'to', newStatus)
      await updateRole(role.id, {
        active: newStatus === 'ACTIVE'
      })
    } catch (error) {
      console.error('❌ Update role status error:', error)
    }
  }

  console.log('🔍 RolesPage - Current state:', { roles, isLoading, error })

  if (isLoading && roles.length === 0) {
    return (
      <>
        <SiteHeader
          breadcrumbs={[
            { href: "/admin", label: "Admin" },
            { label: "Roles" }
          ]}
          action={
            <Button size="sm" onClick={handleCreate}>
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p className="text-muted-foreground">
              Loading roles...
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SiteHeader
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Roles" }
        ]}
        action={
          <Button size="sm" onClick={handleCreate}>
            <Plus className="h-4 w-4" />
          </Button>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage user roles and permissions
          </p>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              Error: {error}
            </p>
          )}
        </div>
        <DataTable
          data={roles}
          entityName="Role"
          views={["table", "card"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      <RoleModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        role={editRole}
      />
    </>
  )
}