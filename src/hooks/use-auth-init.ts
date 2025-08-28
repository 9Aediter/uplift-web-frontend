"use client"

import { useEffect } from 'react'
import { useAuthActions, useAuth } from '@/lib/store/auth'
import { authApi } from '@/lib/api/auth'

export function useAuthInit() {
  const { status } = useAuth()
  const { login, setStatus } = useAuthActions()

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🚀 useAuthInit - Starting auth initialization, current status:', status)
      
      // Skip if already authenticated or loading
      if (status === 'authenticated' || status === 'loading') {
        console.log('⏭️ useAuthInit - Skipping, already authenticated or loading')
        return
      }

      try {
        setStatus('loading')
        
        // Step 1: Check auth status first (ไม่ต้องเช็ค cookies เพราะ httpOnly)
        console.log('🔍 useAuthInit - Checking /auth/status...')
        const statusResponse = await authApi.checkStatus()
        
        console.log('📊 Auth status response:', statusResponse)
        
        // Case 1: Not authenticated at all
        if (!statusResponse.data?.authenticated) {
          console.log('🚫 useAuthInit - Not authenticated')
          setStatus('unauthenticated')
          return
        }
        
        // Case 2: Authenticated but needs refresh
        if (statusResponse.data.authenticated && statusResponse.data.needsRefresh) {
          console.log('🔄 useAuthInit - Needs refresh, calling /auth/refresh...')
          try {
            await authApi.refreshToken()
            console.log('✅ useAuthInit - Refresh successful')
          } catch (refreshError) {
            console.error('❌ useAuthInit - Refresh failed:', refreshError)
            setStatus('unauthenticated')
            return
          }
        }
        
        // Step 3: Get user data (whether refreshed or not)
        console.log('👤 useAuthInit - Getting user data from /auth/me...')
        const userResponse = await authApi.me()
        
        if (userResponse.data) {
          login(userResponse.data)
          console.log('✅ useAuthInit - Auto-login successful:', userResponse.data)
        } else {
          console.log('❌ useAuthInit - No user data received')
          setStatus('unauthenticated')
        }
        
      } catch (error) {
        console.error('❌ useAuthInit - Error during auth initialization:', error)
        setStatus('unauthenticated')
        // Don't redirect on error - might be network issue
      }
    }

    console.log('🎯 useAuthInit - useEffect triggered')
    initializeAuth()
  }, []) // Run only once on mount

  return { status }
}