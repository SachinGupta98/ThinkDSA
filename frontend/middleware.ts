import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/analyze', '/patterns', '/vault', '/profile'];

// Routes that are only for unauthenticated users
const authRoutes = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the user is authenticated based on our synced cookie
  const isAuthenticated = request.cookies.has('sb-auth');

  // 1. If accessing a protected route without being authenticated, redirect to /login
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If accessing an auth route while already authenticated, redirect to /dashboard
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      const dashboardUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Only run middleware on relevant paths to optimize performance
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/analyze/:path*',
    '/patterns/:path*',
    '/vault/:path*',
    '/profile/:path*',
    '/login',
    '/signup'
  ],
};
