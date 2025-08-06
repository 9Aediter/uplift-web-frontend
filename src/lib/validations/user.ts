import { z } from "zod"
import { Role, UserStatus, SocialProvider } from "@prisma/client"

export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  emailVerified: z.date().nullable(),
  roles: z.array(z.nativeEnum(Role)).default([Role.USER]),
  status: z.nativeEnum(UserStatus),
  lastLoginAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const userProfileSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  firstName: z.string().min(1).max(50).nullable(),
  lastName: z.string().min(1).max(50).nullable(),
  displayName: z.string().min(1).max(100).nullable(),
  avatar: z.string().url().nullable(),
  phone: z.string().regex(/^[+]?[\d\s-()]+$/).nullable(),
  dateOfBirth: z.date().nullable(),
  address: z.string().max(200).nullable(),
  city: z.string().max(50).nullable(),
  country: z.string().max(50).nullable(),
  zipCode: z.string().max(10).nullable(),
  bio: z.string().max(500).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const socialLoginSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  provider: z.nativeEnum(SocialProvider),
  providerAccountId: z.string(),
  providerEmail: z.string().email().nullable(),
  providerName: z.string().nullable(),
  providerAvatar: z.string().url().nullable(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  expiresAt: z.date().nullable(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createUserSchema = z.object({
  email: z.string().email(),
  roles: z.array(z.nativeEnum(Role)).default([Role.USER]),
  status: z.nativeEnum(UserStatus).default(UserStatus.ACTIVE),
  profile: z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    displayName: z.string().min(1).max(100).optional(),
    avatar: z.string().url().optional(),
    phone: z.string().regex(/^[+]?[\d\s-()]+$/).optional(),
    dateOfBirth: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
    address: z.string().max(200).optional(),
    city: z.string().max(50).optional(),
    country: z.string().max(50).optional(),
    zipCode: z.string().max(10).optional(),
    bio: z.string().max(500).optional(),
  }).optional(),
})

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  roles: z.array(z.nativeEnum(Role)).optional(),
  status: z.nativeEnum(UserStatus).optional(),
  profile: z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    displayName: z.string().min(1).max(100).optional(),
    avatar: z.string().url().optional(),
    phone: z.string().regex(/^[+]?[\d\s-()]+$/).optional(),
    dateOfBirth: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
    address: z.string().max(200).optional(),
    city: z.string().max(50).optional(),
    country: z.string().max(50).optional(),
    zipCode: z.string().max(10).optional(),
    bio: z.string().max(500).optional(),
  }).optional(),
})

export const userQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: z.nativeEnum(Role).optional(), // Keep for backward compatibility in query params
  status: z.nativeEnum(UserStatus).optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'lastLoginAt', 'email']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type User = z.infer<typeof userSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type SocialLogin = z.infer<typeof socialLoginSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserQuery = z.infer<typeof userQuerySchema>