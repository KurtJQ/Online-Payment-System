"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import transactionWidget from "@/components/dashboard/transaction"; // Import the server component

export default function TransactionWidget() {
  const [invoice, setInvoice] = useState(null);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const data = await transactionWidget(); // Fetch the data from the server
      setInvoice(data.invoice);
    };

    fetchInvoiceData();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-gray-300 backdrop-blur-md w-full p-6 md:p-1 flex flex-col gap-4">
        {/* Header */}
        <div className="text-xl md:text-2xl font-semibold text-gray-800">
          📜 Recent Transactions
        </div>

        {/* Transactions List */}
        <div className="overflow-y-auto max-h-60 pr-1 custom-scrollbar flex flex-col gap-2">
          {invoice === null ? (
            // Show loading spinner while waiting for invoice data
            <LoadingSpinner />
          ) : invoice.length > 0 ? (
            invoice.map((inv) => (
              <div
                key={inv.referenceNumber}
                className="flex justify-between items-center bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-gray-700 shadow-sm"
              >
                <span>{new Date(inv.createdAt).toLocaleDateString()}</span>
                <span className="font-medium">{formatter.format(inv.amount)}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No transactions found.</div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-2 self-end">
          <Link
            href="/dashboard/invoice/"
            className="text-xs px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
}
