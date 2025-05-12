"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Page() {
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (!email) {
      setLoading(false);
      return toast.error("Email is not valid");
    }
    const form = {
      email: email,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/student/forgotpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        setLoading(false);
        return setNotif(data.message);
      }
      setNotif(data.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <div className="bg-gray-300 m-6 p-6 rounded-lg">
        <Link href="/" className="hover:text-blue-600">
          {"<"}-- Back
        </Link>
        <h1 className="text-center font-bold">Forgot Password</h1>
        <img src="/images/SCC icon.webp" className="mx-auto" alt="SCC icon" />
        <form onSubmit={handleSubmit}>
          <label>
            Email <span className="text-red-500">*</span>
            <input type="email" name="email" className="input-style mb-3" />
          </label>
          {!notif ? "" : <div className="text-center">{notif}</div>}
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold p-2 rounded-lg transition hover:bg-red-600"
          >
            {!loading ? "Confirm" : <LoadingSpinner />}
          </button>
        </form>
      </div>
    </main>
  );
}
