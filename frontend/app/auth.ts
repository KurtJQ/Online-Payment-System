import NextAuth, { User, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

declare module "next-auth"{
    interface Session{
        user:{
            _studentId: string,
            fname: string,
            mname: string,
            lname: string,
            id: string,
        } & DefaultSession["user"]
    }
}

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Credentials({
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type:"password"},
            },
            authorize: async (credentials) => {
                try{
                    let user: User;
                    
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const response = await fetch("http://localhost:5050/api/student/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({email: email, password: password}),
                    });

                    if(!response.ok){
                        throw new Error("Error authenticating")
                    }

                    user = await response.json();
    
                    if (!user) {
                        throw new Error("Invalid credentials.")
                    }
    
                    return {...user}
                }
                catch(error){
                    if(error instanceof ZodError){
                        throw new Error('Invalid input format. Please check your email and password.')
                    } else {
                        throw new Error("Authentication failed: " + error.message)
                    }
                }
                
            }
        })
    ],
    pages:{
        signIn: "/",
        error: '/'
    },
    callbacks: {
        session({ session, token, user }) {
            if(!token.user){
                return null
            }
            // session.user._studentId = token._studentId
            // session.user.fname = token.fname
            // session.user.mname = token.mname
            // session.user.lname = token.lname
            // session.user.id = token.id
            session.user = token.user
            return session;
          },
        jwt({ token, user }) {
            if (user) {
              token.user = user
            }
            return token;
          },
      
        authorized: async ({auth}) => {
            return !!auth
        }
    }
})