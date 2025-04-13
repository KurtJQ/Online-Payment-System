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
                        return null
                    }
                    return user
                }
                catch(error){
                    if(error instanceof ZodError){
                        throw new Error('Invalid input format. Please check your email and password.')
                    } else {
                        throw new Error("Authentication failed: " + error.message)
                    }
                    
                    return null
                }
                
            }
        })
    ]
} satisfies NextAuthConfig