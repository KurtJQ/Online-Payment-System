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
      <div className="flex">
        <Image
          src={"/images/background.webp"}
          width={1280}
          height={720}
          priority={true}
          className="w-2/3 h-screen"
          alt="St Clare College Background"
        />
        <div className="flex flex-col w-1/4 h-full mx-auto mt-12">
          <div>
            <Image
              src={"/images/SCC icon.webp"}
              width={200}
              height={200}
              className="m-auto size-3/4"
              alt="SCC Icon"
            />
          </div>
          <form onSubmit={handleLogin}>
            <div className="mt-3 w-full">
              <div>
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
              <div>
                <label htmlFor="rememberLogin" className="hidden">
                  Remember Me
                </label>
                <input
                  type="checkbox"
                  htmlFor="rememberLogin"
                  className="rounded-full"
                  id="rememberLogin"
                />
                <span className="ml-2 font-bold">Remember Me</span>
              </div>
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-16 font-bold rounded-full float-right mt-4"
            >
              SIGN IN
            </button>
          </form>
          <Link href="/signup" className="ml-auto">
            <button>New Student? --{">"}</button>
          </Link>
        </div>
      </div>
    </>
  );
}
