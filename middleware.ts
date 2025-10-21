import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // const cookieStore = await cookies();
  //
  // if (
  //   !request.nextUrl.pathname.includes('admin') &&
  //   !request.nextUrl.pathname.includes('login') &&
  //   !request.nextUrl.pathname.includes('auth')
  // ) {
  //   const session = cookieStore.get('__SE');
  //
  //   if (!session) {
  //     return NextResponse.redirect(new URL('/login', request.url));
  //   }
  // }
  //
  // if (
  //   request.nextUrl.pathname.includes('admin') &&
  //   !request.nextUrl.pathname.includes('admin/login') &&
  //   !request.nextUrl.pathname.includes('admin/signup') &&
  //   !request.nextUrl.pathname.includes('admin/auth')
  // ) {
  //   const adminSession = cookieStore.get('__SE');
  //
  //   if (!adminSession) {
  //     return NextResponse.redirect(new URL('/admin/login', request.url));
  //   }
  // }
  //
  // if (request.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  //
  // if (request.nextUrl.pathname === '/admin') {
  //   return NextResponse.redirect(new URL('/admin/login', request.url));
  // }
  //
  // if (request.nextUrl.pathname === '/login') {
  //   const response = NextResponse.next();
  //
  //   for (const cookie of cookieStore.getAll()) {
  //     response.cookies.delete(cookie.name);
  //   }
  //
  //   return response;
  // }
  //
  // if (request.nextUrl.pathname === '/admin/login') {
  //   const response = NextResponse.next();
  //
  //   for (const cookie of cookieStore.getAll()) {
  //     response.cookies.delete(cookie.name);
  //   }
  //
  //   return response;
  // }

  const response = NextResponse.next();

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/main', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
