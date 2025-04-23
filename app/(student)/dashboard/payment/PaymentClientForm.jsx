"use client";

import { useState, useTransition } from "react";
import { submitPayment } from "./submitPayment";
import Fees from "components/dashboard/breakdown";  

export default function PaymentClientForm({ profile }) {
  if (!profile) return <p>Loading profile...</p>;

  const [examPeriod, setExamPeriod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
        const data = await submitPayment({
            studentId: profile._studentId,
            examPeriod,
            amount: Number(amount), // ✅ ensure it's a number
          });

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setErrorMessage(data.error || "Unknown error");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="m-4 md:m-8 flex flex-col gap-6 md:flex-row">
      <div className="w-full md:w-1/3">{/* Optional sidebar */}</div>
      <div className="w-full md:w-1/3">
        <Fees hidePay={true} />
      </div>

      <div className="bg-gray-300 rounded-3xl p-5 md:p-8 w-full md:w-2/3 space-y-4">
        <div>
          <label>Exam Period</label>
          <select
            value={examPeriod}
            onChange={(e) => {
              const value = e.target.value;
              setExamPeriod(value);
              if (value === "downpayment" && amount > 2000) setAmount(2000);
              else if (value !== "downpayment" && amount > 1500) setAmount(1500);
            }}
            className="w-full p-3 border rounded-xl"
            required
          >
            <option value="">Select Exam Period</option>
            {["downpayment", "1st Periodic", "Prelim", "2nd Periodic", "Midterm", "3rd Periodic", "Pre-final", "4th Periodic", "Finals"].map(
              (period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              )
            )}
          </select>
        </div>

        <div>
        {errorMessage && (
            <p className="text-red-600 font-semibold text-sm">{errorMessage}</p>
            )}
          <p>Payment for:</p>
          <p>{profile.fname} {profile.mname} {profile.lname}</p>
          <p>{profile.course}</p>
          <p>{profile.yearLevel}</p>
          <p>{profile.semester}</p>
        </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-3 rounded-xl"
          required
        />

        <button type="submit" className="w-full bg-red-500 text-white p-3 rounded-full font-bold" disabled={isPending}>
          {isPending ? "Processing..." : "Complete Payment"}
        </button>
      </div>
    </form>
  );
}
