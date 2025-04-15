"use client";

import Image from "next/image";
import { login } from "@/components/auth/sign-in";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const response = await login(formData);

    if (!response.success) {
      setError(response.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden m-6 md:m-0 md:flex-row">
        <Image
          src={"/images/background.webp"}
          width={1280}
          height={720}
          priority={true}
          className="hidden md:flex md:w-2/3 md:h-screen"
          alt="St Clare College Background"
        />
        <div className="flex flex-col items-center justify-center w-full h-screen touch-none md:h-full md:self-center md:m-6 md:touch-auto">
          <div className="mb-3">
            <Image
              src={"/images/SCC icon.webp"}
              width={200}
              height={200}
              alt="SCC Icon"
            />
          </div>
          <form
            onSubmit={handleLogin}
            className="min-w-sm max-w-lg w-full mb-6"
          >
            <div>
              <div className="mt-2">
                <label htmlFor="email" className="hidden">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="px-6 py-2 border-2 border-black w-full rounded-full"
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="hidden">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="px-6 py-2 border-2 border-black w-full rounded-full"
                />
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="ml-2 font-bold">Forgot Password?</div>
              {error && <div className="text-red-500 text-right">{error}</div>}
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-16 font-bold rounded-full w-full mt-4"
            >
              SIGN IN
            </button>
          </form>
          <div className="font-semibold">
            Not yet a student?{" "}
            <Link href="/signup" className="text-blue-500">
              Enroll now!--{">"}
            </Link>
          </div>
          <footer className="text-center text-gray-300 foint-semibold">
            St Clare College 2024-2025 | BSCS-4D
          </footer>
        </div>
      </div>
    </>
  );
}
