import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('admin'); // Retrieve the token
  const { pathname } = req.nextUrl; // Get the requested pathname

  console.log('Pathname:', pathname); // Debug: Current route
  console.log('Admin Token:', token); // Debug: Token value

  // Case 1: Redirect from `/` to `/admin/dashboard` if token exists
  if (token && pathname === '/') {
    console.log('Redirecting to /admin/dashboard');
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  // Case 2: Redirect from admin routes to `/` if token is missing
  if (!token && pathname.startsWith('/admin')) {
    console.log('Redirecting to / due to missing token');
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow all other requests to proceed
  return NextResponse.next();
}

// Configure middleware to run on specific routes
export const config = {
  matcher: [
    '/admin/:path*', // Admin routes
    '/',             // Root route
  ],
};
