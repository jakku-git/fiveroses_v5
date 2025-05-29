import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that require password protection
const PROTECTED_PATHS = [
  '/work/marketing',
  '/work/web-solutions',
  '/work/creative-production',
  '/work/incubator'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is in our protected paths
  if (PROTECTED_PATHS.includes(pathname)) {
    const isAuthenticated = request.cookies.get('work-auth')?.value === 'xvii'
    
    if (!isAuthenticated) {
      // Redirect to password page if not authenticated
      const url = request.nextUrl.clone()
      url.pathname = '/work/password'
      url.searchParams.set('from', pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/work/marketing',
    '/work/web-solutions',
    '/work/creative-production',
    '/work/incubator',
    '/work/password'
  ]
} 