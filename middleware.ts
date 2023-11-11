import { NextRequest, NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isLocalhost = request.url.includes("localhost:");
  const isAdminRoute = request.url.includes("/admin/");

  if(isAdminRoute && !isLocalhost) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}