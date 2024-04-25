export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they are meta files, `/robots.txt`
    // - … if they are assets, `/assets` or `/icon-...`
    // - … if they are internals`, `/_next` or `/_vercel`
    // - … sanity studio starts with `/studio`
    // - … if they are our paths, `/api`,
    "/((?!robots|assets|icon|_next|_vercel|studio|api).*)",
  ],
};

export function middleware() {
      return Response.json(
        { success: true, timestamp: Date.now() },
      )
  }