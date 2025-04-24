"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export function PaymentForm(props) {
  const [loading, setLoading] = useState(false);
  const [examPeriod, setExamPeriod] = useState("");
  const [amount, setAmount] = useState("");

  function formatYear(year) {
    switch (year) {
      case "1": return "1st Year";
      case "2": return "2nd Year";
      case "3": return "3rd Year";
      case "4": return "4th Year";
      default: return "ERROR Wrong format";
    }
  }

  const handleExamPeriodChange = (e) => {
    const selected = e.target.value;
    setExamPeriod(selected);
    if (selected === "downpayment") {
      setAmount("2000");
    } else if (selected) {
      setAmount("1500");
    } else {
      setAmount("");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const numericAmount = parseFloat(amount);
    const maxAllowed = examPeriod === "downpayment" ? 2000 : 1500;

    if (isNaN(numericAmount) || numericAmount < 1499) {
      toast.error("Minimum payment allowed is ₱1499.");
      setLoading(false);
      return;
    }

    if (numericAmount > maxAllowed) {
      toast.error(`Maximum for ${examPeriod} is ₱${maxAllowed}.`);
      setLoading(false);
      return;
    }

    const form = {
      amount,
      examPeriod,
      description: "Tuition payment for " + examPeriod,
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
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Payment link created!");
      if (data.checkoutUrl) {
        window.open(data.checkoutUrl, "_blank");
      }
    } catch (error) {
      console.error("❌ Error Occurred:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:w-2/3">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 rounded-3xl p-5 space-y-4"
      >
        <div className="bg-gray-100 p-4 rounded-xl">
          <label className="block text-gray-700 font-medium mb-1">
            Exam Period
          </label>
          <select
            className="w-full p-3 border border-gray-400 rounded-xl bg-white"
            required
            name="examPeriod"
            value={examPeriod}
            onChange={handleExamPeriodChange}
          >
            <option value="">Select Exam Period</option>
            <option value="downpayment">Downpayment</option>
            <option value="1st Periodic">1st Periodic</option>
            <option value="Prelim">Prelim</option>
            <option value="2nd Periodic">2nd Periodic</option>
            <option value="Midterm">Midterm</option>
            <option value="3rd Periodic">3rd Periodic</option>
            <option value="Pre-final">Pre-final</option>
            <option value="4th Periodic">4th Periodic</option>
            <option value="Finals">Finals</option>
          </select>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-gray-700">Payment for:</p>
          <div className="text-sm text-gray-800 space-y-1">
            <p>{props.profile.fname} {props.profile.mname} {props.profile.lname}</p>
            <p>{props.profile.course}</p>
            <p>{formatYear(props.profile.yearLevel)}</p>
            <p>{props.profile.semester}</p>
          </div>
        </div>

        <div>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
            className="w-full border border-gray-400 rounded-xl p-3"
            min={1499}
            max={examPeriod === "downpayment" ? 2000 : 1500}
          />
        </div>

        <div>
          <button
            className="w-full bg-red-500 text-white p-3 rounded-full font-bold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
