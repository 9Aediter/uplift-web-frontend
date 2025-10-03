// Global application configuration
export const BASE_URL = 'https://uplifttech.store'
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
export const ORG_ID = `${BASE_URL}/#organization`
export const WEBSITE_ID = `${BASE_URL}/#website`

// Helper to convert relative paths to absolute URLs
export const abs = (path = '') => {
  if (!path) return BASE_URL
  return path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}
