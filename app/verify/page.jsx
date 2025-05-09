"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");
  const token = searchParams.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL +
            `/api/student/verify?token=${token}`
        );
        if (!response.ok) {
          const data = await response.json();
          console.error(data.message);
          return setStatus("Verification Failed");
        }
        const data = await response.json();
        setStatus(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <div className="bg-gray-100 p-6 rounded-md text-center">
        <img src="/images/SCC icon.webp" alt="SCC icon" />
        <div className="font-bold mb-6">{status}</div>
        <button
          onClick={() => router.push("/")}
          className="text-white bg-red-500 transition hover:bg-red-600 rounded-md p-3"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
