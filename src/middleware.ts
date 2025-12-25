import { NextResponse, type NextRequest } from 'next/server';

export const config = {
  matcher: ['/admin/:path*'],
};

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('cws-session');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    // Allow access to the login page itself
    if (sessionCookie) {
      // If logged in, redirect from login page to dashboard
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }
  
  if (!sessionCookie) {
    // Redirect to login if no session cookie
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Here you would typically verify the session token against a database.
  // For this scaffold, the presence of the cookie is considered sufficient.

  return NextResponse.next();
}
