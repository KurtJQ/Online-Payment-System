"use client";

import Image from "next/image";
import { login } from "@/components/auth/sign-in";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await login(formData);
    setLoading(false);

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
                  minLength={8}
                />
              </div>
            </div>

            <div className="mt-2 flex justify-between">
              {error && <div className="text-red-500 text-right">{error}</div>}
            </div>

            {loading ? (
              <LoadingSpinner />
            ) : (
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-16 font-bold rounded-full w-full mt-4"
              >
                SIGN IN
              </button>
            )}
          </form>

          <div className="font-semibold">
            Not yet a student?{" "}
            <Link href="/signup" className="hover:underline text-blue-500">
              Enroll now!--{">"}
            </Link>
          </div>

          <footer className="text-center text-gray-300 foint-semibold">
            St Clare College 2024-2025 | BSCS-4D
          </footer>

          <div className="text-center text-sm pt-4 text-gray-500 mt-4">
            Need help? Contact us at developersofscc4d@gmail.com
            <footer className="bg-gray-100 text-black"></footer>
          </div>
        </div>
      </div>
    </>
  );
}
