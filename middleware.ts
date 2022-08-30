// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * This is Next.js own style of middleware. Without a config, this will intercept every request, and allow you to modify, or massage the data however you wish.
 * You can read more here
 * https://nextjs.org/docs/advanced-features/middleware
 * https://next-auth.js.org/configuration/nextjs#middleware
 */
export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  if (!session) {
    // The req return doesn't contain enough information to properly re-route the user. So we call clone to get the origin, so we can properly redirect the user
    // as relative URL's are no longer supported
    // Read more here: https://nextjs.org/docs/messages/middleware-relative-urlss
    const url = req.nextUrl.clone();

    return NextResponse.redirect(`${url.origin}/api/auth/signin`);
  }
}

// By default, Next.js will run this middleware on every page. Since we only want to run this on pages that require a user to be logged in,
// we add a matcher to only run on pages that require a session to be defined
// Read more here: https://nextjs.org/docs/advanced-features/middleware#matcher
export const config = {
  matcher: ['/member/:path*', '/webview/member/:path*']
};
