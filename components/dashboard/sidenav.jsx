"use client";

import Link from "next/link";
import { logout } from "@/components/auth/sign-out";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

export function SideNav({ profile }) {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const unsubscribe = SideNavController.subscribe(setOpen);
    return unsubscribe;
  }, []);

  const handleClose = () => SideNavController.close();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30" onClick={handleClose} />
      )}

      <nav
        className={`fixed top-0 left-0 h-full z-40 bg-red-800 text-white transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } w-2/3 max-w-xs md:w-64`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-white/20 overflow-hidden">
          <Image
            src="/images/user-circle-solid-48.png"
            width={48}
            height={48}
            alt="Default Profile"
            className="rounded-full shrink-0"
          />
          <Link href="/dashboard/account">
            <span className="text-lg font-bold leading-tight break-words w-full">
              {profile?.fname} {profile?.mname} {profile?.lname}
            </span>
          </Link>
        </div>

        {hasMounted && (
          <div className="flex flex-col gap-6 p-6 text-xl font-semibold">
            <Link
              href="/dashboard"
              className={pathName === "/dashboard" ? "text-blue-300" : ""}
              onClick={handleClose}
            >
              Overview
            </Link>
            <Link
              href="/dashboard/invoice"
              className={
                pathName === "/dashboard/invoice" ? "text-blue-300" : ""
              }
              onClick={handleClose}
            >
              Invoice
            </Link>
            <Link
              href="/dashboard/payment"
              className={pathName === "/dashboard/payment" ? "text-blue-300" : ""}
              onClick={handleClose}
            >
              Payment
            </Link>
            
            <Link
              href="/dashboard/account"
              className={
                pathName === "/dashboard/account" ? "text-blue-300" : ""
              }
              onClick={handleClose}
            >
              Account
            </Link>
          </div>
        )}

        <div className="mt-auto p-6">
          {loggingOut ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault(); // prevent default form submit
                setLoggingOut(true);
                await logout();
              }}
            >
              <button
                type="submit"
                className="w-full py-2 px-4 bg-white text-red-800 rounded-md font-bold"
              >
                Sign Out
              </button>
            </form>
          )}
        </div>

      </nav>
    </>
  );
}

export const SideNavController = {
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

  close() {
    this._open = false;
    this._emit();
  },

  _emit() {
    this._listeners.forEach((cb) => cb(this._open));
  },
};

export function SideNavButton() {
  return (
    <button className="p-2" onClick={() => SideNavController.toggle()}>
      <img src="/images/menu-regular-36.png" alt="Menu" className="w-6 h-6" />
    </button>
  );
}
