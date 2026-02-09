import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that require password protection
const PROTECTED_PATHS = [
  '/work',
  '/work/marketing',
  '/work/web-solutions',
  '/work/creative-production',
  '/work/incubator'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip password page itself
  if (pathname === '/password' || pathname === '/work/password') {
    return NextResponse.next()
  }

  // Check if the current path is in our protected paths
  if (PROTECTED_PATHS.includes(pathname)) {
    // Check for site-wide auth cookie with timestamp
    const siteAuthCookie = request.cookies.get('site-auth')?.value || ''
    const workAuthCookie = request.cookies.get('work-auth')?.value || ''
    
    // Check if cookie exists and has valid format (xvii-timestamp)
    const siteAuthValid = siteAuthCookie.startsWith('xvii-')
    const workAuthValid = workAuthCookie.startsWith('xvii-')
    
    // If cookie exists, check if it's from a fresh session (within last 2 seconds)
    // This ensures password is required on every refresh
    // The 2-second window only allows the immediate redirect after password entry
    let isAuthenticated = false
    
    if (siteAuthValid) {
      const timestamp = parseInt(siteAuthCookie.split('-')[1] || '0')
      const now = Date.now()
      // Cookie is valid only if set within last 2 seconds (immediate redirect only)
      // Any refresh or navigation after that will require password again
      isAuthenticated = (now - timestamp) < 2000
    }
    
    if (!isAuthenticated && workAuthValid) {
      const timestamp = parseInt(workAuthCookie.split('-')[1] || '0')
      const now = Date.now()
      isAuthenticated = (now - timestamp) < 2000
    }
    
    if (!isAuthenticated) {
      // Redirect to password page if not authenticated
      const url = request.nextUrl.clone()
      url.pathname = '/password'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/work',
    '/work/marketing',
    '/work/web-solutions',
    '/work/creative-production',
    '/work/incubator',
    '/password',
    '/work/password'
  ]
} 