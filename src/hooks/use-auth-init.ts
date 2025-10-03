"use client"

import { useEffect } from 'react'
import { useAuthActions, useAuth } from '@/lib/store/auth'
import { authApi } from '@/lib/api/auth'

export function useAuthInit() {
  const { status } = useAuth()
  const { login, setStatus } = useAuthActions()

  useEffect(() => {
    const initializeAuth = async () => {
      // Skip if already authenticated or loading
      if (status === 'authenticated' || status === 'loading') {
        return
      }

      try {
        setStatus('loading')

        // Step 1: Check auth status first (ไม่ต้องเช็ค cookies เพราะ httpOnly)
        const statusResponse = await authApi.checkStatus()

        // Case 1: Not authenticated at all
        if (!statusResponse.data?.authenticated) {
          setStatus('unauthenticated')
          return
        }

        // Case 2: Authenticated but needs refresh
        if (statusResponse.data.authenticated && statusResponse.data.needsRefresh) {
          try {
            await authApi.refreshToken()
          } catch (refreshError) {
            console.error('Auth refresh failed:', refreshError)
            setStatus('unauthenticated')
            return
          }
        }

        // Step 3: Get user data (whether refreshed or not)
        const userResponse = await authApi.me()

        if (userResponse.data) {
          login(userResponse.data)
        } else {
          setStatus('unauthenticated')
        }

      } catch (error) {
        console.warn('Backend not available, skipping auth:', error instanceof Error ? error.message : 'Unknown error')
        setStatus('unauthenticated')
        // Silently fail when backend is not running (for frontend-only testing)
      }
    }

    initializeAuth()
  }, []) // Run only once on mount

  return { status }
}