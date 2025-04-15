"use client";

import Link from "next/link";
import { logout } from "@/components/auth/sign-out";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const SideNavController = {
  _open: false,
  _listeners: new Set(),

  subscribe(callback) {
    this._listeners.add(callback);
    callback(this._open);
    return () => this._listeners.delete(callback);
  },

  toggle() {
    this._open = !this._open;
    this._emit();
  },

  open() {
    (this._open = true), this._emit();
  },

  close() {
    (this._open = false), this._emit();
  },

  _emit() {
    this._listeners.forEach((cb) => cb(this._open));
  },
};

export function SideNav() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = SideNavController.subscribe(setOpen);
    return unsubscribe;
  }, []);

  const handleClose = () => SideNavController.close();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={handleClose}
        />
      )}
      <nav
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs bg-red-800 text-white z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:w-64 md:h-screen md:top-auto md:flex md:flex-col`}
      >
        {/* PROFILE INFO */}
        <div className="flex flex-row items-center py-12">
          <div>
            <Image
              src="/images/user-circle-solid-48.png"
              width={48}
              height={48}
              alt="Default Profile Picture"
            />
          </div>
          <div>
            <span className="text-2xl font-bold">KURT JUSTINE ROQUE QUE</span>
          </div>
        </div>
        {/* SELECTION */}
        <div className="flex flex-col items-center gap-12 text-2xl font-bold">
          <div
            className={` ${pathName === "/dashboard" ? `text-blue-300` : ``}`}
            onClick={handleClose}
          >
            <Link href={"/dashboard"}>Overview</Link>
          </div>
          <div
            className={` ${
              pathName === "/dashboard/invoice" ? `text-blue-300` : ``
            }`}
            onClick={handleClose}
          >
            <Link href={"/dashboard/invoice"}>Invoice</Link>
          </div>
          <div
            className={`${
              pathName === "/dashboard/payment" ? `text-blue-300` : ``
            }`}
            onClick={handleClose}
          >
            <Link href={"/dashboard/payment"}>Payment</Link>
          </div>
          <div
            className={` ${
              pathName === "/dashboard/payment-methods" ? `text-blue-300` : ``
            }`}
            onClick={handleClose}
          >
            <Link href={"/dashboard/payment-methods"}>
              Payment <br /> Methods
            </Link>
          </div>
          <div className="">
            <form action={logout}>
              <button type="submit">Sign Out</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export function SideNavButton() {
  return (
    <div>
      <button className="md:hidden" onClick={() => SideNavController.toggle()}>
        <img src="/images/menu-regular-36.png" alt="SideNav Button" />
      </button>
    </div>
  );
}
