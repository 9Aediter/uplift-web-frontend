"use client"

import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StoreUser, useUsersActions } from "@/lib/store/users"
import { rolesApi, SimpleRole } from "@/lib/api/users"
import React from "react"

// Validation schemas
const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters"),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  phone: z.string().optional(),
  roleIds: z.array(z.string()).optional(),
})

const editUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
})

interface UserModalProps {
  user?: StoreUser | null
  mode: 'create' | 'edit'
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function UserModal({ user, mode, open, onOpenChange, onSuccess }: UserModalProps) {
  const [submitting, setSubmitting] = useState(false) // Separate modal loading
  const { updateUser, createUser } = useUsersActions()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarUrl: "",
    phone: "",
    password: "",
    roleIds: [] as string[],
    status: "ACTIVE" as 'ACTIVE' | 'INACTIVE',
  })
  
  const [roles, setRoles] = useState<SimpleRole[]>([])
  const [rolesLoading, setRolesLoading] = useState(false)

  // Load roles when modal opens
  React.useEffect(() => {
    if (open) {
      loadRoles()
    }
  }, [open])

  // Reset form when modal opens or mode changes
  React.useEffect(() => {
    if (open) {
      if (mode === 'edit' && user) {
        setFormData({
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl || "",
          phone: user.phone || "",
          password: "",
          roleIds: [], // TODO: Extract role IDs from user.roles string
          status: user.status,
        })
      } else if (mode === 'create') {
        setFormData({
          name: "",
          email: "",
          avatarUrl: "",
          phone: "",
          password: "",
          roleIds: [],
          status: "ACTIVE",
        })
      }
    }
  }, [user, mode, open])

  const loadRoles = async () => {
    try {
      setRolesLoading(true)
      const response = await rolesApi.getSimpleRoles()
      if (response.success && response.data) {
        setRoles(response.data.roles)
      }
    } catch (error) {
      console.error('Failed to load roles:', error)
      toast.error('Failed to load roles')
    } finally {
      setRolesLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      if (mode === 'create') {
        // Validate create data
        const validation = createUserSchema.safeParse(formData)
        if (!validation.success) {
          const errors = validation.error.issues.map(issue => issue.message).join(', ')
          toast.error(errors)
          return
        }

        const createData: any = {
          name: formData.name.trim(),
          password: formData.password,
        }
        
        // Only add optional fields if they have values
        if (formData.email.trim()) {
          createData.email = formData.email.trim()
        }
        if (formData.avatarUrl.trim()) {
          createData.avatarUrl = formData.avatarUrl.trim()
        }
        if (formData.phone.trim()) {
          createData.phone = formData.phone.trim()
        }
        if (formData.roleIds.length > 0) {
          createData.roleIds = formData.roleIds
          createData.userTypes = formData.roleIds.map(() => 'member')
        }
        console.log('🚀 Sending create user data:', createData)
        const result = await createUser(createData)
        if (result?.success) {
          toast.success("User created successfully!")
          // Close modal only on success
          onSuccess()
          onOpenChange(false)
        } else {
          toast.error(result?.error || "Failed to create user")
          // Keep modal open for user to fix errors
          return
        }
      } else if (mode === 'edit' && user) {
        // Validate edit data
        const validation = editUserSchema.safeParse(formData)
        if (!validation.success) {
          const errors = validation.error.issues.map(issue => issue.message).join(', ')
          toast.error(errors)
          // Keep modal open for user to fix validation errors
          return
        }

        const updateData = {
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          status: formData.status,
          password: formData.password.trim() || null,
        }
        console.log('🚀 Sending update user data:', updateData)
        const result = await updateUser(user.id, updateData)
        if (result?.success) {
          toast.success("User updated successfully!")
          // Close modal only on success
          onSuccess()
          onOpenChange(false)
        } else {
          toast.error(result?.error || "Failed to update user")
          // Keep modal open for user to fix errors
          return
        }
      }
      
    } catch (error: any) {
      console.error(`Failed to ${mode} user:`, error)
      toast.error(error.message || `Failed to ${mode} user`)
      // Keep modal open on unexpected errors too
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Don't render if in edit mode but no user provided
  const shouldRender = !(mode === 'edit' && !user)

  return (
    <Dialog open={open && shouldRender} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create New User' : 'Edit User'}</DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Fill in the information to create a new user account.'
              : 'Update user information. Leave password empty to keep current password.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Name Field */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name")(e.target.value)}
                placeholder="Enter user name"
                required
                disabled={submitting}
              />
            </div>

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email")(e.target.value)}
                placeholder="Enter email address (optional)"
                disabled={submitting}
              />
            </div>

            {/* Phone Field */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone")(e.target.value)}
                placeholder="Enter phone number"
                disabled={submitting}
              />
            </div>

            {/* Avatar URL Field */}
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                type="url"
                value={formData.avatarUrl}
                onChange={(e) => handleInputChange("avatarUrl")(e.target.value)}
                placeholder="Enter avatar URL"
                disabled={submitting}
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">
                {mode === 'create' ? 'Password' : 'New Password (Optional)'}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password")(e.target.value)}
                placeholder={mode === 'create' ? 'Enter password' : 'Leave empty to keep current password'}
                required={mode === 'create'}
                disabled={submitting}
              />
            </div>

            {/* Roles Field - Only for create mode */}
            {mode === 'create' && (
              <div className="grid gap-2">
                <Label htmlFor="roles">Roles</Label>
                <Select
                  value={formData.roleIds.length > 0 ? formData.roleIds[0] : ""}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, roleIds: value ? [value] : [] }))
                  }}
                  disabled={submitting || rolesLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={rolesLoading ? "Loading roles..." : "Select role"} />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Field - Only for edit mode */}
            {mode === 'edit' && (
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleInputChange("status")}
                  disabled={submitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Current Roles Display - Only for edit mode */}
            {mode === 'edit' && user && (
              <div className="grid gap-2">
                <Label>Current Roles</Label>
                <div className="text-sm text-muted-foreground">
                  {user.roles || 'No roles assigned'}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting 
                ? (mode === 'create' ? 'Creating...' : 'Updating...')
                : (mode === 'create' ? 'Create User' : 'Update User')
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}