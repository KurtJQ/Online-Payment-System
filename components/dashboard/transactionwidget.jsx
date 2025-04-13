"use server";
import Link from "next/link";
import { auth } from "@/app/auth";

export default async function transactionWidget() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });
  const session = await auth();
  if (!session) {
    return null;
  }
  const studentId = session.user.id;
  let invoice;

  try {
    const res = await fetch(
      `http://localhost:5050/api/student/invoice/${studentId}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    invoice = await res.json();
  } catch (error) {
    console.error(error);
  }
  return (
    <div className="bg-gray-300 rounded-3xl min-w-fit flex flex-col items-center p-3">
      {/* Header */}
      <div className="font-bold text-2xl">Recent Transactions</div>
      {/* Main Content */}
      <div className="overflow-y-auto basis-full">
        {invoice.map((invoice) => (
          <div
            key={invoice.referenceNumber}
            className="bg-gray-500 text-white rounded-full p-2 text-sm mb-2"
          >
            {new Date(invoice.createdAt).toLocaleDateString()}{" "}
            {formatter.format(invoice.amount)}
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="ml-auto bg-gray-500 text-white p-1 px-2 rounded-full text-xs ">
        <Link href={"/dashboard/invoice"}>Show more</Link>
      </div>
    </div>
  );
}
