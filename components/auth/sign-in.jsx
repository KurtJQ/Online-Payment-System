"use server";

import { signIn } from "@/app/auth";

export async function login(formData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      return { success: false, error: "Invalid Email & Password " };
    }
    if (error.type === "CallbackRouteError") {
      return { success: false, error: "Invalid input format" };
    }
    return { success: false, error: "Unexpected error, please try again" };
  }
}
