"use server";

import { signIn } from "@/app/auth";

export async function login(formData) {
  try {
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
}
