import NextAuth, {type User } from "next-auth";
import authConfig from "@/auth.config";

interface CustomUser extends User{
    id: string,
    name: string,
    email: string
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 3600
    },
    ...authConfig,
    pages:{
        signIn: "/",
        error: '/'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as CustomUser
                token.user = customUser
            }
            return token;
          },
        async session({session, token }){
            session.user = token.user as CustomUser
            return session
          },
    }
})