"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export function PaymentForm(props) {
  const [loading, setLoading] = useState(false);

  function formatYear(year) {
    switch (year) {
      case "1":
        return "1st Year";
      case "2":
        return "2nd Year";
      case "3":
        return "3rd Year";
      case "4":
        return "4th Year";
      default:
        return "ERROR Wrong format";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const examPeriod = formData.get("examPeriod");
    const paymentMethodForm = formData.get("paymentMethod");

    const form = {
      examPeriod: examPeriod,
      description: "Tuition payment for " + examPeriod,
    };

    try {
      const paymentIntent = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/student/payment/${props.profile._studentId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const paymentIntentData = await paymentIntent.json();
      console.log("PAYMENT INTENT: ", paymentIntentData);

      const encodedKey = Buffer.from(process.env.NEXT_PUBLIC_PAYMONGO).toString(
        "base64"
      );

      const paymentMethod = await fetch(
        "https://api.paymongo.com/v1/payment_methods",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Basic ${encodedKey}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                type: paymentMethodForm,
                billing: {
                  name:
                    props.profile.fname +
                    " " +
                    props.profile.mname +
                    " " +
                    props.profile.lname,
                  email: props.profile.email,
                  phone: props.profile.mobile,
                },
              },
            },
          }),
        }
      );

      const paymentMethodData = await paymentMethod.json();
      console.log("PAYMENT METHOD: ", paymentMethodData);

      const attachPayment = await fetch(
        `https://api.paymongo.com/v1/payment_intents/${paymentIntentData.pi}/attach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Basic ${encodedKey}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                payment_method: paymentMethodData.data.id,
                client_key: paymentIntentData.client_key,
                return_url: "http://localhost:3000/dashboard/invoice",
              },
            },
          }),
        }
      );

      const attachPaymentData = await attachPayment.json();
      console.log("ATTACH PAYMENT: ", attachPaymentData);
      if (attachPaymentData.data.attributes.next_action) {
        window.open(
          attachPaymentData.data.attributes.next_action.redirect.url,
          "_blank"
        );
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
          >
            <option value="">Select Exam Period</option>
            <option value="downpayment">Downpayment - PHP 2,000</option>
            <option value="1st Periodic">1st Periodic - PHP 1,500</option>
            <option value="Prelim">Prelim - PHP 1,500</option>
            <option value="2nd Periodic">2nd Periodic - PHP 1,500</option>
            <option value="Midterm">Midterm - PHP 1,500</option>
            <option value="3rd Periodic">3rd Periodic - PHP 1,500</option>
            <option value="Pre-final">Pre-final - PHP 1,500</option>
            <option value="4th Periodic">4th Periodic - PHP 1,500</option>
            <option value="Finals">Finals - PHP 1,500</option>
          </select>
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

        <div className="grid grid-cols-2 gap-4">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="gcash"
              className="hidden peer"
              required
            />
            <div className="bg-gray-100 rounded-lg text-center p-2 flex flex-col items-center justify-center transition border border-transparent peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md">
              <img
                src="/images/gcash.webp"
                alt="GCash logo"
                width={60}
                height={60}
              />
              <span className="mt-2 font-medium text-gray-700">GCash</span>
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="paymaya"
              className="hidden peer"
              required
            />
            <div className="bg-gray-100 rounded-lg text-center p-2 flex flex-col items-center justify-center transition border border-transparent peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md">
              <img
                src="/images/gcash.webp"
                alt="GCash logo"
                width={60}
                height={60}
              />
              <span className="mt-2 font-medium text-gray-700">Paymaya</span>
            </div>
          </label>
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
