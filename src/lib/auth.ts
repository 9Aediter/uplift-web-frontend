import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"
import { UserStatus, SocialProvider } from "@prisma/client"

export const authOptions: NextAuthOptions = {
  // Don't use adapter for better control over user creation
  // adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      httpOptions: {
        timeout: 10000, // 10 seconds timeout
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { profile: true }
        })

        if (!user || user.status !== UserStatus.ACTIVE || !user.password) {
          return null
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        
        if (!isPasswordValid) {
          return null
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        return {
          id: user.id,
          email: user.email,
          name: user.profile?.displayName || user.profile?.firstName,
          image: user.profile?.avatar,
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        // Handle social login (Google, Facebook, etc.)
        if (account?.provider && account.provider !== "credentials") {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true, profile: true }
          })

          if (existingUser) {
            // Check if this account already exists
            const existingAccount = existingUser.accounts.find(
              acc => acc.provider === account.provider.toUpperCase() as SocialProvider && acc.providerAccountId === account.providerAccountId
            )

            if (!existingAccount) {
              // Add new account to existing user
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type!,
                  provider: account.provider.toUpperCase() as SocialProvider,
                  providerAccountId: account.providerAccountId!,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                }
              })
              
              // Mark as linking social account
              user.authStatus = "social_linked"
            } else {
              // Existing account - regular login
              user.authStatus = "login_success"
            }

            // Update last login
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { 
                lastLoginAt: new Date(),
                // Update profile image if not set
                profile: existingUser.profile ? {
                  update: {
                    avatar: existingUser.profile.avatar || user.image,
                    displayName: existingUser.profile.displayName || user.name,
                  }
                } : {
                  create: {
                    displayName: user.name,
                    avatar: user.image,
                  }
                }
              }
            })

            // Set user id for session
            user.id = existingUser.id
          } else {
            // Create new user with account and default USER role
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                emailVerified: new Date(),
                lastLoginAt: new Date(),
                profile: {
                  create: {
                    displayName: user.name,
                    avatar: user.image,
                  }
                },
                accounts: {
                  create: {
                    type: account.type!,
                    provider: account.provider.toUpperCase() as SocialProvider,
                    providerAccountId: account.providerAccountId!,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state,
                  }
                },
                userRoles: {
                  create: {
                    role: "USER",
                    isActive: true
                  }
                }
              }
            })

            // Mark as new registration
            user.authStatus = "register_success"
            user.id = newUser.id
          }
        }

        return true
      } catch (error) {
        console.error("Sign in error:", error)
        return false
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles
        token.authStatus = user.authStatus
        // console.log('🔧 JWT callback - setting roles:', user.roles)
      }
      
      // For existing tokens, fetch fresh roles from database
      if (token.sub && !token.roles) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
            include: {
              userRoles: {
                where: { isActive: true },
                select: { role: true }
              }
            }
          })
          
          if (dbUser) {
            token.roles = dbUser.userRoles.map(ur => ur.role)
            // console.log('🔧 JWT callback - fetched roles from DB:', token.roles)
          }
        } catch (error) {
          console.error('JWT callback error fetching roles:', error)
        }
      }
      
      // console.log('🔧 JWT token final roles:', token.roles)
      return token
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { 
            profile: true,
            userRoles: {
              where: { isActive: true },
              select: { role: true }
            }
          }
        })

        if (user) {
          session.user.id = user.id
          session.user.roles = user.userRoles.map(ur => ur.role)
          session.user.status = user.status
          session.user.name = user.profile?.displayName || user.profile?.firstName
          session.user.image = user.profile?.avatar
          session.user.authStatus = token.authStatus as string
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to home page after successful sign in
      if (url.includes('/auth/callback')) {
        return `${baseUrl}/`
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
}