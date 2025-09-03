"use client"

import { DataTable } from "@/components/data-table"
import { SiteHeader } from "@/components/site-header"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/button/button"
import { useUsers, useUsersActions, StoreUser } from "@/lib/store/users"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UserModal } from "@/components/admin/user/user-modal"

export default function UsersPage() {
  // Use users store instead of local state
  const { users, total, page, loading, error } = useUsers()
  const { fetchUsers, deleteUser, updateUserStatus } = useUsersActions()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedUser, setSelectedUser] = useState<StoreUser | null>(null)

  // Delete user handler - uses store action
  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId)
      toast.success('User deleted successfully')
    } catch (err: any) {
      console.error('❌ Failed to delete user:', err)
      toast.error(err.message || 'Failed to delete user')
    }
  }

  // Update user status handler - uses store action
  const handleUpdateStatus = async (userId: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    const result = await updateUserStatus(userId, newStatus)
    if (result?.success) {
      toast.success(`User ${newStatus.toLowerCase()} successfully`)
    } else {
      toast.error(result?.error || 'Failed to update user status')
    }
  }

  // Edit user handler
  const handleEditUser = (user: StoreUser) => {
    setSelectedUser(user)
    setModalMode('edit')
    setModalOpen(true)
  }

  // Create user handler
  const handleCreateUser = () => {
    setSelectedUser(null)
    setModalMode('create')
    setModalOpen(true)
  }

  // Handle modal success
  const handleModalSuccess = () => {
    // No need to refresh - store handles updates automatically
    setSelectedUser(null)
  }

  // Load users on component mount
  useEffect(() => {
    fetchUsers({ page: 1, limit: 10 })
  }, [])

  // Show error toast and still render the page
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  if (loading) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading users...</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <SiteHeader
        breadcrumbs={[
          { href: "/admin", label: "Admin" },
          { label: "Users" }
        ]}
        action={
          <Button size="sm" onClick={handleCreateUser}>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p className="text-muted-foreground">
            Manage user accounts and permissions ({total} total users)
          </p>
        </div>
        {error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground">Failed to load users</p>
              <Button
                variant="outline"
                onClick={() => fetchUsers({ page: 1, limit: 10 })}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <DataTable
            data={users.map(user => ({
              id: user.id,
              name: user.name,
              email: user.email,
              status: user.status,
              roles: typeof user.roles === 'string' ? user.roles :
                Array.isArray(user.roles) ? (user.roles as any[]).map((r: any) => r.name || r).join(', ') :
                  '',
              phone: user.phone || 'N/A',
              createdAt: new Date(user.createdAt).toLocaleDateString(),
              updatedAt: new Date(user.updatedAt).toLocaleDateString(),
            }))}
            entityName="User"
            views={["table", "card"]}
            onEdit={(transformedUser) => {
              // Find original user by ID
              const originalUser = users.find(u => u.id === transformedUser.id);
              if (originalUser) handleEditUser(originalUser);
            }}
            onDelete={(transformedUser) => handleDeleteUser(transformedUser.id)}
            onStatusChange={(transformedUser, newStatus) =>
              handleUpdateStatus(transformedUser.id, newStatus as 'ACTIVE' | 'INACTIVE')
            }
          />
        )}
      </div>

      {/* User Modal */}
      <UserModal
        user={selectedUser}
        mode={modalMode}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSuccess={handleModalSuccess}
      />
    </>
  )
}