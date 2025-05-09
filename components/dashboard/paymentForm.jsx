"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import formatYear from "app/utils/formatYear.js";

function getCurrentPayments(invoices) {
  return invoices.reduce((sum, invoice) => sum + Number(invoice.amount), 0);
}

export function PaymentForm(props) {
  const [loading, setLoading] = useState(false);
  const totalPayments = getCurrentPayments(props.currentPayments);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const exams = [
    "Downpayment",
    "1st Periodic",
    "Prelim",
    "2nd Periodic",
    "Midterm",
    "3rd Periodic",
    "Pre-final",
    "4th Periodic",
    "Finals",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const examPeriod = formData.get("examPeriod");

    const form = {
      examPeriod: examPeriod,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/student/payment/${props.profile._studentId}`,
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
            {exams.map((exam) => (
              <label className="cursor-pointer" key={exam}>
                <input
                  type="radio"
                  name="examPeriod"
                  value={exam}
                  className="hidden peer"
                  disabled={props.currentPayments.some(
                    (payment) => payment.examPeriod === exam
                  )}
                />
                <div
                  className={`text-center p-2 rounded-md border-2 border-gray-300 transition ${
                    props.currentPayments.some(
                      (payment) =>
                        payment.examPeriod === exam ||
                        payment.examPeriod === "Remaining"
                    )
                      ? "border-gray-300 text-gray-400 bg-gray-100"
                      : "peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md"
                  }`}
                >
                  {exam} <br className="hidden md:block" />
                  {formatter.format(exam === "Downpayment" ? 2000 : 1500)}
                </div>
              </label>
            ))}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="examPeriod"
                value="Remaining"
                className="hidden peer"
              />
              <div
                className={`text-center p-2 rounded-md border-2 border-gray-300 transition ${
                  props.currentPayments.some(
                    (payment) => payment.examPeriod === "Remaining"
                  )
                    ? "border-gray-300 text-gray-400 bg-gray-100"
                    : "peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md"
                }`}
              >
                All Balance <br className="hidden md:block" />
                {formatter.format(14000 - totalPayments)}
              </div>
            </label>
          </fieldset>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            Payment for:
          </p>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              {props.profile.fname} {props.profile.mname} {props.profile.lname}
            </p>
            <p>{props.profile.course}</p>
            <p>{formatYear(props.profile.yearLevel)}</p>
            <p>{props.profile.semester}</p>
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
