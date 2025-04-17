"use server";
import { auth } from "@/app/auth";

async function getInfo() {
  const session = await auth();

  if (!session) {
    return null;
  }
  const user = session.user.id;

  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/student/profile-data/${user}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const info = await res.json();
    return info;
  } catch (error) {
    console.error(error);
  }
}

async function getInvoices(user) {
  try {
    const res = await fetch(
      process.env.SERVER_URL +
        `/api/student/invoices/${user._studentId}/${user.yearLevel}/${user.schoolYear}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const invoices = await res.json();
    return invoices;
  } catch (error) {
    console.error(error);
  }
}

function getCurrentPayments(invoices) {
  let currentTotal = 0;
  for (let i in invoices) {
    currentTotal = currentTotal + invoices[i].amount;
  }
  return currentTotal;
}

export default async function Fees({ hidePay }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const total = 12000;
  const user = await getInfo();
  const invoices = await getInvoices(user);
  const currentPayments = getCurrentPayments(invoices);
  let balance = total - currentPayments;

  return (
    <div>
      <div className="bg-gray-300 rounded-3xl p-6 md:p-8 font-bold text-lg md:text-2xl space-y-5 shadow-md">
        {/* Title */}
        <div className="text-center text-xl md:text-2xl text-gray-800">Amount to Pay</div>
  
        {/* Current Payment */}
        <div className="flex items-center border-b-2 border-black pb-2 text-gray-700">
          <span>Amount Currently Paid</span>
          <span className="ml-auto text-right">{formatter.format(currentPayments)}</span>
        </div>
  
        {/* Total Balance */}
        <div className="flex items-center border-b-2 border-black pb-2 text-gray-700">
          <span>Total Balance</span>
          <span className="ml-auto text-right">{formatter.format(balance)}</span>
        </div>
  
        {/* Pay Button */}
        {!hidePay && (
          <div className="flex justify-end mt-6">
            <button className="bg-green-400 hover:bg-green-500 transition text-white px-5 py-2 rounded-full text-sm md:text-base font-semibold">
              Pay Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
}
