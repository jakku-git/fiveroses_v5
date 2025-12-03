import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that require password protection
const PROTECTED_PATHS = [
  '/',
  '/work',
  '/news',
  '/about',
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
    // Check for site-wide auth cookie
    const isAuthenticated = request.cookies.get('site-auth')?.value === 'xvii'
    
    // Also check for work-auth cookie for backward compatibility
    const isWorkAuthenticated = request.cookies.get('work-auth')?.value === 'xvii'
    
    if (!isAuthenticated && !isWorkAuthenticated) {
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
    '/',
    '/work',
    '/news',
    '/about',
    '/work/marketing',
    '/work/web-solutions',
    '/work/creative-production',
    '/work/incubator',
    '/password',
    '/work/password'
  ]
} 