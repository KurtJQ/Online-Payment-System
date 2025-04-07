import { auth } from "@/app/auth";
const session = await auth();

async function getInfo() {
  if (!session) {
    return null;
  }
  const user = session.user._studentId;

  try {
    const res = await fetch(
      `http://localhost:5050/api/student/profile-data/${user}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const info = await res.json();
    return info[0];
  } catch (error) {
    console.error(error);
  }
}

async function getInvoices(user) {
  let invoices;
  try {
    const res = await fetch(
      `http://localhost:5050/api/student/invoices/${user._studentId}/${user.yearLevel}/${user.schoolYear}`
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
    <div className="basis-full drop-shadow">
      <div className="grid gap-3 bg-gray-300 rounded-3xl p-8 font-bold text-2xl ">
        <div>Amount to pay</div>
        <div className="flex border-b-2 pt-4 border-black">
          Amount Currently Paid{" "}
          <span className="ml-auto">{formatter.format(currentPayments)}</span>
        </div>
        <div className="flex border-b-2 pt-4 border-black">
          Total Balance{" "}
          <span className="ml-auto">{formatter.format(balance)}</span>
        </div>
        {hidePay ? (
          ""
        ) : (
          <div className="mt-8 flex">
            <div className="bg-green-300 px-3 py-2 rounded-full font-semi ml-auto">
              Pay Now
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
