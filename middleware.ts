// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname === '/') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // /login 접근 시 connect.sid 쿠키가 있으면 /patient로 리다이렉트
//   // if (request.nextUrl.pathname === "/login") {
//   //   const cookie = request.cookies.get("connect.sid");
//   //   if (cookie && cookie.value) {
//   //     return NextResponse.redirect(new URL("/patient", request.url));
//   //   }
//   // }

//   return NextResponse.next();
// }

// // export const config = {
// //   matcher: ['/((?!_next/static|_next/image|favicon.ico|api|public).*)'],
// // };

import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/supabase.middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
