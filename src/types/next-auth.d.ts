import NextAuth from "next-auth"
import { Role, UserStatus } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      roles: Role[]
      status: UserStatus
      authStatus?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    roles?: Role[]
    status?: UserStatus
    authStatus?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles?: Role[]
    status?: UserStatus
    authStatus?: string
  }
}