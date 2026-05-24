import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await verifySession(request);
  const pathname = request.nextUrl.pathname;

  // Protected routes requiring authentication
  const protectedRoutes = ["/chat", "/dashboard", "/profile"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !session) {
    // Redirect to home with a login prompt
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("auth", "required");
    return NextResponse.redirect(url);
  }

  // Protected API routes
  const protectedApiRoutes = ["/api/upload"];
  const isProtectedApi = protectedApiRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedApi && !session) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};