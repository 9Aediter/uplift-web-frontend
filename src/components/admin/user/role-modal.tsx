"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { toast } from "sonner"
import { useRolesActions } from "@/lib/store/roles"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Validation schema
const roleSchema = z.object({
  name: z.string().min(1, "Role name is required").max(50, "Role name is too long"),
  description: z.string().max(200, "Description is too long").optional(),
  pathRoles: z.string().min(1, "Path roles is required"),
  permissions: z.array(z.string()).default([]),
  active: z.boolean().default(true),
})

type RoleFormData = z.infer<typeof roleSchema>

interface RoleModalProps {
  open: boolean
  onClose: () => void
  role?: any // Edit mode if role is provided
}

const PATH_ROLES_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "guest", label: "Guest" },
  { value: "moderator", label: "Moderator" },
]

const PERMISSION_OPTIONS = [
  { value: "find:roles", label: "View Roles" },
  { value: "create:roles", label: "Create Roles" },
  { value: "edit:roles", label: "Edit Roles" },
  { value: "delete:roles", label: "Delete Roles" },
  { value: "find:users", label: "View Users" },
  { value: "create:users", label: "Create Users" },
  { value: "edit:users", label: "Edit Users" },
  { value: "delete:users", label: "Delete Users" },
]

export function RoleModal({ open, onClose, role }: RoleModalProps) {
  const { createRole, updateRole } = useRolesActions()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    description: "",
    pathRoles: "",
    permissions: [],
    active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Populate form data when editing
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",
        description: role.description || "",
        pathRoles: role.pathRoles || "",
        permissions: role.permissions || [],
        active: role.active === "ACTIVE",
      })
    } else {
      // Reset form for create mode
      setFormData({
        name: "",
        description: "",
        pathRoles: "",
        permissions: [],
        active: true,
      })
    }
    setErrors({})
  }, [role, open])

  const handleInputChange = (field: keyof RoleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handlePermissionToggle = (permission: string) => {
    const currentPermissions = formData.permissions || []
    const updatedPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter(p => p !== permission)
      : [...currentPermissions, permission]
    
    handleInputChange("permissions", updatedPermissions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    try {
      // Validate form data
      const validatedData = roleSchema.parse(formData)

      if (role) {
        // Edit mode
        await updateRole(role.id, validatedData)
      } else {
        // Create mode
        await createRole(validatedData)
      }

      onClose()
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Validation errors
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        // API errors are handled by the store (toast)
        console.error("Role submission error:", error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {role ? "Edit Role" : "Create Role"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Role Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter role name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter role description"
              rows={3}
              disabled={isSubmitting}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Path Roles */}
          <div className="space-y-2">
            <Label htmlFor="pathRoles">
              Path Roles <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.pathRoles}
              onValueChange={(value) => handleInputChange("pathRoles", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select path roles" />
              </SelectTrigger>
              <SelectContent>
                {PATH_ROLES_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pathRoles && (
              <p className="text-sm text-red-500">{errors.pathRoles}</p>
            )}
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-2 border rounded">
              {PERMISSION_OPTIONS.map((permission) => (
                <div key={permission.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permission.value}
                    checked={formData.permissions?.includes(permission.value) || false}
                    onChange={() => handlePermissionToggle(permission.value)}
                    disabled={isSubmitting}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor={permission.value} className="text-sm">
                    {permission.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="active">Active Status</Label>
              <p className="text-sm text-gray-500">
                Enable or disable this role
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleInputChange("active", checked)}
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : role
                ? "Update Role"
                : "Create Role"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}