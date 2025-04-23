"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function PayNowButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push("/dashboard/payment");
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <button
      onClick={handleClick}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800"
    >
      Pay Now
    </button>
  );
}
