import Image from "next/image";
import { login } from "@/components/auth/sign-in";

export default function Page() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Background Image (Hidden on Small Screens) */}
      <div className="hidden md:block md:w-2/3">
        <Image
          src={"/background.webp"}
          width={1280}
          height={720}
          priority={true}
          className="w-full h-screen object-cover"
          alt="St Clare College Background"
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={"/SCC icon.webp"}
              width={150}
              height={150}
              className="size-3/4"
              alt="SCC Icon"
            />
          </div>

          {/* Input Fields */}
          <form className="mt-6">
            <div className="space-y-4">
              <input
                type="text"
                name="studentID"
                id="studentID"
                placeholder="Student ID"
                className="px-6 py-2 border border-gray-300 w-full rounded-full focus:ring-2 focus:ring-black outline-none"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="px-6 py-2 border border-gray-300 w-full rounded-full focus:ring-2 focus:ring-black outline-none"
              />
        <div className="w-1/4 h-full mx-auto mt-12">
          <div>
            <Image
              src={"/SCC icon.webp"}
              width={200}
              height={200}
              className="m-auto size-3/4"
              alt="SCC Icon"
            />
          </div>
          <form action={login}>
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

            {/* Remember Me + Forgot Password */}
            <div className="mt-4 flex justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Sign-In Button */}
            <button
              type="submit"
              className="bg-black text-white py-2 px-16 font-bold rounded-full float-right mt-4"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
