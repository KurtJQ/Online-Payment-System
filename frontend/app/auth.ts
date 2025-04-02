import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Credentials({
            credentials: {
                email: {},
                password: {},
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

                    user = await response.json();
    
                    if (!user) {
                        throw new Error("Invalid credentials.")
                      }
    
                    return user
                }
                catch(error){
                    console.log(error)
                    return error
                }
                
            }
        })
    ],
    pages:{
        signIn: "/",
        error: '/'
    },
    callbacks: {
        authorized: async ({auth}) => {
            return !!auth
        }
    }
})