import NextAuth, { type DefaultSession } from "next-auth";

declare module 'next-auth'{
    interface Session{
        user: {
            _studentId: string,
            fname: string,
            mname: string,
            lname: string
        } & DefaultSession['user']
    } 
}

declare module 'next-auth/jwt'{
    interface JWT {
        user: {
            _studentId: string,
            fname: string,
            mname: string,
            lname: string
        }
    }
}