"use server";

import { signIn } from "@/app/auth";

export async function login(formData) {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
