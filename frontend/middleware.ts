import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req){
    if (!req.auth && req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/signup'){
        const newUrl = new URL('/', req.nextUrl.origin)
        return Response.redirect(newUrl)
    }
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }
  