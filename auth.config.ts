import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod";
import { signInSchema } from "@/app/lib/zod";

export default {
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                try{
                    const { email, password } = await signInSchema.parseAsync(credentials)

                    const response = await fetch(process.env.SERVER_URL + "/api/student/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({email: email, password: password}),
                    });

                    if(!response.ok){
                        throw new Error("Error authenticating")
                    }

                    let user = await response.json()
    
                    if (!user) {
                        throw new Error("User not found")
                    }
                    return user
                }
                catch(error){
                    if(error instanceof ZodError){
                        console.error('Invalid input format. Please check your email and password.')
                        return null
                    }
                    if(error.message === "User not found"){
                        console.error("Authentication failed: " + error.message)
                        return null
                    }
                    
                    return null
                }
                
            }
        })
    ]
} satisfies NextAuthConfig