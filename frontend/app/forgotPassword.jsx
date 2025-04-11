"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side Image */}
      <div className="hidden md:block md:w-2/3">
        <Image
          src="/images/background.webp"
          width={1280}
          height={720}
          className="w-full h-screen object-cover"
          alt="St Clare College Background"
        />
      </div>

      {/* Forgot Password Form */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6">
        <Image
          src="/images/SCC icon.webp"
          width={120}
          height={120}
          alt="SCC Icon"
        />
        <h2 className="text-2xl font-bold mt-4">Forgot Password</h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email to receive a password reset link.
        </p>

        <form className="w-full max-w-sm mt-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border-2 border-black w-full rounded-full mb-4"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 font-bold rounded-full"
          >
            SEND RESET LINK
          </button>
        </form>

        <p className="mt-4">
          Remember your password?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
