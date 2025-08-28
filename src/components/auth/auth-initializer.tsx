"use client"

import { useAuthInit } from '@/hooks/use-auth-init'

export function AuthInitializer() {
  useAuthInit()
  return null // This component doesn't render anything
}