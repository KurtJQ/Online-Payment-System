import NextAuth, { type DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session{
        user: {
            id: string,
            name: string
        } & DefaultSession['user']
    } 
}

declare module 'next-auth/jwt'{
    interface JWT {
        user: {
            id: string,
            name: string
        }
    }
}