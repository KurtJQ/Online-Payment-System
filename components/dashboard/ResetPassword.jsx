"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export function ResetPassword({ user }) {
  const [loading, setLoading] = useState();
  const [notif, setNotif] = useState();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmNewPassword = formData.get("confirmNewPassword");
    if (!user) {
      setLoading(false);
      return toast.error("User is not Authenticated");
    }
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setLoading(false);
      return toast.error("Input fields cannot be empty");
    }
    const form = {
      user,
      currentPassword,
      newPassword,
      confirmNewPassword,
    };
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/student/resetpassword",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        return setNotif(data.message);
      }
      return setNotif(data.message);
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-300 rounded-lg m-6 p-6">
      <Link href="/dashboard/account" className="hover:text-blue-600">
        {"<"}-- Back
      </Link>
      <form onSubmit={handleSubmit} className="">
        <label>
          Current Password
          <input
            type="password"
            name="currentPassword"
            required
            className="input-style mb-3"
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            required
            className="input-style mb-3"
          />
        </label>
        <label>
          Confirm New Password
          <input
            type="password"
            name="confirmNewPassword"
            required
            className="input-style mb-3"
          />
        </label>
        {!notif ? "" : <div>{notif}</div>}
        <button
          type="submit"
          className="bg-red-500 p-2 font-semibold text-white rounded-lg transition hover:bg-red-600 "
        >
          {!loading ? "Confirm" : <LoadingSpinner />}
        </button>
      </form>
    </div>
  );
}
