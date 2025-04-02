import Image from "next/image";
import { login } from "@/components/auth/sign-in";

export default function Page() {
  return (
    <>
      <div className="flex">
        <Image
          src={"/background.webp"}
          width={1280}
          height={720}
          priority={true}
          className="w-2/3 h-screen"
          alt="St Clare College Background"
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
              <div>Forget Password?</div>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-2 px-16 font-bold rounded-full float-right mt-4"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
