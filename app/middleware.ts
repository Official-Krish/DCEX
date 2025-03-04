import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useSession } from "next-auth/react";

export async function middleware(req: NextRequest) {
  const session = useSession();

  const protectedRoute = "/dashboard";
  const getstarted = "/";
  if (req.nextUrl.pathname === getstarted && session.data?.user) {
    return NextResponse.redirect(new URL(protectedRoute, req.url));
  }
  if (req.nextUrl.pathname === protectedRoute && !session.data?.user) {
    return NextResponse.redirect(new URL(getstarted, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/"],
};