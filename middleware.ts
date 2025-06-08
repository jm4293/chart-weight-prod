import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. /admin 이하 경로 보호
  if (pathname.startsWith("/admin/user")) {
    const adminAuth = request.cookies.get("admin_auth")?.value;

    if (adminAuth !== "true") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 인증된 경우 통과
    return NextResponse.next();
  }

  if (pathname === "/") {
    const response = NextResponse.next();

    response.cookies.delete("admin_auth");

    return response;
  }

  // 3. 그 외 경로는 미들웨어 영향 없음
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ["/admin/:path*", "/"],
};
