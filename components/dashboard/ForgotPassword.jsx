"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export function ForgotPassword() {
  const [notif, setNotif] = useState();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Password do not match");
    }
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          `/api/student/newPassword?token=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: password }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return setNotif(data.message);
      }
      return setNotif(data.message);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <form onSubmit={handleSubmit} className="bg-gray-300 rounded-lg m-6 p-6">
        <Link href="/forgotpassword" className="hover:text-blue-600">
          {"<"}-- Back
        </Link>
        <img src="/images/SCC icon.webp" className="mx-auto" alt="SCC icon" />
        {!notif ? (
          ""
        ) : (
          <div className="text-center font-semibold text-green-500">
            {notif}
          </div>
        )}
        <label>
          New Password
          <input type="password" name="password" className="input-style mb-3" />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            className="input-style mb-3"
          />
        </label>
        <button className="bg-red-500 text-white  rounded-md font-semibold p-2">
          {!loading ? "Confirm" : <LoadingSpinner />}
        </button>
      </form>
    </main>
  );
}
