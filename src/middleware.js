import { NextResponse } from 'next/server'
import { getUser } from '@/lib/user';

/**
 * @typedef {import('next/server').NextRequest} NextRequest
 */

/**
 * @param {NextRequest} request
 */
export function middleware(request) {
  const user = getUser(request.cookies);

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)',
  ],
}
