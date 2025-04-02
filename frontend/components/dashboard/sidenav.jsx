"use client";

import Link from "next/link";
import { logout } from "@/components/auth/sign-out";
import { usePathname } from "next/navigation";

export default function SideNav({ isSidebarOpen }) {
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
              pathName === "/dashboard/invoice" ? `text-blue-300` : ``
            }`}
          >
            <Link href={"/dashboard/invoice"}>Invoice</Link>
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
          <div className="mt-12">
            <form action={logout}>
              <button type="submit">Sign Out</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
