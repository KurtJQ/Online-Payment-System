import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Credentials({
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type:"password"},
            },
            authorize: async (credentials) => {
                try{
                    let user = null
                    
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
        async session({ session, token }) {
            if(!token.user){
                return null
            }
            session.user = token.user;
            return session;
          },
          async jwt({ token, user }) {
            if (user) {
              token.user = user;
            }
            return token;
          },
      
        authorized: async ({auth}) => {
            return !!auth
        }
    }
})