"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav() {
  const pathName = usePathname();
  return (
    <>
      <nav className="bg-red-800 text-white fixed w-64 h-screen text-2xl font-bold">
        <div className="flex flex-col items-center ">
          <div
            className={`mt-12 ${
              pathName === "/dashboard" ? `text-blue-300` : ``
            }`}
          >
            <Link href={"/dashboard"}>Overview</Link>
          </div>
          <div
            className={`mt-12 ${
              pathName === "/dashboard/transactions" ? `text-blue-300` : ``
            }`}
          >
            <Link href={"/dashboard/transactions"}>Transactions</Link>
          </div>
          <div
            className={`mt-12 ${
              pathName === "/dashboard/payment" ? `text-blue-300` : ``
            }`}
          >
            <Link href={"/dashboard/payment"}>Payment</Link>
          </div>
          <div
            className={`mt-12 ${
              pathName === "/dashboard/payment-methods" ? `text-blue-300` : ``
            }`}
          >
            <Link href={"/dashboard/payment-methods"}>Payment Methods</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
