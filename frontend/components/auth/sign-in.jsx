import { signIn } from "@/app/auth";

export function Login() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", {
          email: formData.get("email"),
          password: formData.get("password"),
          redirectTo: "/dashboard",
        });
      }}
    >
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
  );
}
