import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/secure")) {
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const userId = session?.user?.id;
    const user_email = session?.user.email;
    const isAuthenticated = !!userId;

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(`/sign-in`, req.url));
    }

    const { data } = await supabase.rpc("get_user_list", {
      search_param: user_email,
      page_size: 10,
      page_offset: 0,
    });

    if (data && data[0].route !== pathname && data[0].role_id !== "admin") {
      return NextResponse.redirect(new URL("/not-found", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Specify for what paths inside of app the middleware should run:
  /*
   * Match all request paths except for the ones starting with:
   * - share (publicly shared meal plans)
   * - og (og image generation)
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - robots.txt
  //  * - sanity studio - not sure yet
   */
  matcher: [
    "/((?!api|static|.*\\..*|_next/static|_next/image|og|images|assets|favicon.ico|sw.js|robots.txt).*)",
    "/:locale",
  ],
};
