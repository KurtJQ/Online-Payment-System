"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import formatYear from "app/utils/formatYear.js";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});

function getPeriodBalance(invoices, examPeriod) {
  return invoices
    .filter((data) => data.examPeriod === examPeriod)
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);
}

function getCurrentPayments(invoices) {
  return invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
}

export function PaymentForm({ currentPayments, profile, settings }) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [examPeriod, setExamPeriod] = useState();
  const totalPayments = getCurrentPayments(currentPayments);

  if (!currentPayments || !profile || !settings) {
    return <div>Loading...</div>;
  }

  const totalDue = settings.reduce((sum, exam) => sum + Number(exam.amount), 0);
  const totalPaid = getCurrentPayments(currentPayments);

  const allPaid = totalPaid >= totalDue;

  const firstUnpaid = allPaid
    ? undefined
    : settings.find((exam) => {
        const remaining =
          parseInt(exam.amount) -
          getPeriodBalance(currentPayments, exam.examPeriod);
        return remaining > 0;
      })?.examPeriod;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let maxAmount;

    if (examPeriod === "Remaining") {
      const totalDue = settings.reduce(
        (sum, exam) => sum + Number(exam.amount),
        0
      );
      maxAmount = totalDue - totalPayments;
    } else {
      const period = settings.find((data) => data.examPeriod === examPeriod);
      const paid = getPeriodBalance(currentPayments, examPeriod);
      maxAmount = parseInt(period?.amount ?? 0) - paid;
    }

    if (amount > maxAmount) {
      setLoading(false);
      return toast.error(`Amount exceeds the balance for ${examPeriod}`);
    }

    const form = {
      examPeriod: examPeriod,
      amount: amount,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment/payment/${profile._studentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("ERROR: ", data);
        toast.error(data.error);
        return;
      }

      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
      }
    } catch (error) {
      console.error("❌ Error Occurred:", error);
      toast.error("An unexpected error occurred.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 rounded-3xl p-5 space-y-4"
      >
        <div className="bg-gray-100 p-4 rounded-xl">
          <fieldset className="grid md:grid-cols-2 gap-3">
            <legend className="block text-gray-700 font-medium mb-1">
              Exam Period
            </legend>
            {settings.map((exam) => {
              const remaining =
                parseInt(
                  settings.find((data) => data.examPeriod === exam.examPeriod)
                    .amount
                ) - getPeriodBalance(currentPayments, exam.examPeriod);
              const isEnable = exam.examPeriod === firstUnpaid;

              return (
                <label className="cursor-pointer" key={exam.examPeriod}>
                  <input
                    type="radio"
                    name="examPeriod"
                    value={exam.examPeriod}
                    onChange={() => {
                      setExamPeriod(exam.examPeriod);
                      setAmount(remaining);
                    }}
                    className="hidden peer"
                    disabled={!isEnable}
                  />
                  <div
                    className={`text-center p-2 rounded-md border-2 border-gray-300 transition peer-disabled:border-gray-300 peer-disabled:text-gray-400 peer-disabled:bg-gray-100 peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md`}
                  >
                    {exam.examPeriod} <br className="hidden md:block" />
                    {currentPayments.find(
                      (data) => data.examPeriod === "Remaining"
                    )
                      ? formatter.format(
                          settings.reduce(
                            (sum, exam) => sum + Number(exam.amount),
                            0
                          ) - totalPayments
                        )
                      : formatter.format(remaining)}
                  </div>
                </label>
              );
            })}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="examPeriod"
                value="Remaining"
                className="hidden peer"
                disabled={
                  settings.reduce((sum, exam) => sum + Number(exam.amount), 0) -
                    totalPayments <=
                  0
                }
                onChange={() => {
                  setExamPeriod("Remaining");
                  const totalDue =
                    settings.reduce(
                      (sum, exam) => sum + Number(exam.amount),
                      0
                    ) - totalPayments;
                  setAmount(totalDue);
                }}
              />
              <div
                className={`text-center p-2 rounded-md border-2 border-gray-300 transition peer-disabled:border-gray-300 peer-disabled:text-gray-400 peer-disabled:bg-gray-100 peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md}`}
              >
                All Balance <br className="hidden md:block" />
                {formatter.format(
                  settings.reduce((sum, exam) => sum + Number(exam.amount), 0) -
                    totalPayments
                )}
              </div>
            </label>
          </fieldset>
        </div>
        <div>
          <label>
            Amount
            <input
              type="number"
              name="amount"
              min={1}
              max={
                examPeriod === "Remaining"
                  ? settings.reduce(
                      (sum, exam) => sum + parseInt(exam.amount),
                      0
                    ) - totalPayments
                  : parseInt(
                      settings.find((data) => data.examPeriod === examPeriod)
                        ?.amount ||
                        1 - getPeriodBalance(currentPayments, examPeriod)
                    )
              }
              value={amount}
              readOnly={examPeriod === "Remaining"}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              placeholder="Enter amount"
              className="w-full border border-gray-400 rounded-xl p-3"
            />
          </label>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            Payment for:
          </p>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              {profile.fname} {profile.mname} {profile.lname}
            </p>
            <p>{profile.course}</p>
            <p>{formatYear(profile.yearLevel)}</p>
            <p>{profile.semester}</p>
          </div>
        </div>
        <div>
          <button
            className="w-full bg-red-500 text-white p-3 rounded-full font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </form>
    </div>
  );
}
