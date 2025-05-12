import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  const { pathname } = req.nextUrl; // Store path once
  const isAuthRequired =
    !req.auth &&
    pathname !== "/" &&
    pathname !== "/signup" &&
    pathname !== "/verify" &&
    pathname !== "/forgotpassword" &&
    pathname !== "/forgotpassword/new";

  if (isAuthRequired) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};
