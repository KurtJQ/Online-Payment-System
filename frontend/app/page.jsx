"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const login = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("http://localhost:5050/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (response.ok) {
      router.push("dashboard");
    } else {
      console.log(json.error);
    }
  };
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
          <form className="" onSubmit={login}>
            <div>
              <Image
                src={"/SCC icon.webp"}
                width={200}
                height={200}
                className="m-auto size-3/4"
                alt="SCC Icon"
              />
            </div>
            <div className="mt-3 w-full">
              <div>
                <label htmlFor="studentID" className="hidden">
                  Email
                </label>
                <input
                  type="text"
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
