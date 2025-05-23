"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function TransactionWidget({ payments }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const handleViewAll = () => {
    setLoading(true);
    router.push("/dashboard/invoice/");
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-gray-300 backdrop-blur-md w-full p-6 md:p-1 flex flex-col gap-4">
        {/* Header */}
        <div className="text-xl md:text-2xl font-semibold text-gray-800">
          📜 Recent Transactions
        </div>

        {/* Transactions List */}
        <div className="overflow-y-auto max-h-60 pr-1 custom-scrollbar flex flex-col gap-2">
          {payments === null ? (
            <LoadingSpinner />
          ) : payments.length > 0 ? (
            payments.map((inv) => (
              <div
                key={inv.referenceNumber}
                className="flex justify-between hover:shadow-lg items-center bg-gray-200 hover:bg-gray/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-700 shadow-sm"
              >
                <span>{new Date(inv.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">
                  {formatter.format(inv.amount)}
                </span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No transactions found.</div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 self-end">
          <button
            onClick={handleViewAll}
            disabled={loading}
            className={`text-xs px-4 py-3 rounded-full transition ${
              loading
                ? "bg-red-500 cursor-not-allowed text-white"
                : "bg-red-600 hover:bg-red-800 text-white"
            }`}
          >
            {loading ? "Loading..." : "View All"}
          </button>
        </div>
      </div>
    </div>
  );
}
