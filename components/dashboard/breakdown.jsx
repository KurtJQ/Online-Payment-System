// components/dashboard/breakdown.jsx
import React, { Suspense } from "react";
import PayNowButton from "@/components/PayNow";
import { auth } from "@/app/auth";
import LoadingSpinner from "@/components/LoadingSpinner";

// Async function to fetch user data
async function getInfo() {
  const session = await auth();
  if (!session) return null;

  const user = session.user.id;

  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/student/profile-data/${user}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// Async function to fetch invoices
async function getInvoices(user) {
  try {
    const res = await fetch(
      process.env.SERVER_URL +
        `/api/student/invoices/${user._studentId}/${user.yearLevel}/${user.schoolYear}/${user.semester}`
    );
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

function getCurrentPayments(invoices) {
  invoices.forEach((i) => console.log(typeof i.amount, i.amount));
  return invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
}

// The main Fees component that fetches and renders data
export default async function Fees({ hidePay = false }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const total = 14000;

  // Fetch user data and invoices
  const user = await getInfo();
  const invoices = await getInvoices(user);

  // Calculate payments and balance
  const currentPayments = getCurrentPayments(invoices || []);
  const balance = total - currentPayments;

  return (
    <div className="flex flex-col gap-6 w-full backdrop-blur-md border border-white/30 hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gray-600/20 h-full">
      <div className="w-full h-full  p-6 md:p-8 ">
        <div className="flex flex-col gap-6 text-gray-800">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold">💵 Amount to Pay</h2>
            <div className="h-1 w-16 mx-auto mt-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full" />
          </div>

          {/* Payment Info */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-medium">Amount Currently Paid</span>
              <span className="text-right text-gray-900">
                {formatter.format(currentPayments)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-medium">Total Balance</span>
              <span className="text-right text-gray-900">
                {formatter.format(balance)}
              </span>
            </div>
          </div>
          {!hidePay && (
            <div className="flex justify-center pt-4">
              <PayNowButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapper component to use Suspense for loading
export function FeesWithLoading({ user }) {
  // Use Suspense here to wrap the async component
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Fees user={user} />
    </Suspense>
  );
}
