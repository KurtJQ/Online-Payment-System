"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ isSidebarOpen }) {
  const pathName = usePathname();

  return (
    <nav
      className={`bg-red-800 text-white fixed min-h-screen w-100 text-2xl font-bold transition-transform duration-300 ease-in-out transform md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col items-start p-4 space-y-6">
        <Link
          href="/dashboard"
          className={`${
            pathName === "/dashboard" ? "text-blue-300" : ""
          } hover:text-blue-300`}
        >
          Overview
        </Link>
        <Link
          href="/dashboard/invoice"
          className={`${
            pathName === "/dashboard/invoice" ? "text-blue-300" : ""
          } hover:text-blue-300`}
        >
          Invoice
        </Link>
        <Link
          href="/dashboard/payment"
          className={`${
            pathName === "/dashboard/payment" ? "text-blue-300" : ""
          } hover:text-blue-300`}
        >
          Payment
        </Link>
        <Link
          href="/dashboard/payment-methods"
          className={`${
            pathName === "/dashboard/payment-methods" ? "text-blue-300" : ""
          } hover:text-blue-300`}
        >
          Payment Methods
        </Link>
      </div>
    </nav>
  );
}
