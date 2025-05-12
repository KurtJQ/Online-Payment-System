"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function Page() {
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = {
      email: formData.get("email"),
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
        return setNotif(data.message);
      }
      setNotif(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex items-center justify-center min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <div className="bg-gray-300 p-6 rounded-lg">
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
