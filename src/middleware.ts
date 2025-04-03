import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/lib/token';

export async function middleware(req: NextRequest) {
  const token = await getToken();
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile'];
// redirect to dashboard if logged in
// Redirect to signin if trying to access protected routes without a token
if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
  return NextResponse.redirect(new URL('/signin', req.url));
}
if(token){
  NextResponse.redirect(new URL('/dashboard',req.url))
}
return NextResponse.next();

}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Protect these routes
};