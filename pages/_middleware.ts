import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  if (req.ua?.isBot) {
    return new Response("봇은 금지입니다.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (
      !req.url.includes("/log-in") &&
      !req.url.includes("/create-account") &&
      !req.cookies.LogInSession
    ) {
      return NextResponse.redirect(`${req.nextUrl.origin}/log-in`);
    }
  }
}
