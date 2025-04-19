"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  SideNavButton,
  SideNav,
  SideNavController,
} from "@/components/dashboard/sidenav";

export default function DashboardLayoutClient({ children, profile }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = SideNavController.subscribe(setIsNavOpen);
    return unsubscribe;
  }, []);

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-red-500 z-40 flex transition-all duration-300 items-center p-3 md:px-4 h-20">
        <SideNavButton />
        <div
          className={`inline-flex items-center gap-2 transition-all duration-300 ${
            isNavOpen ? "ml-auto" : "mr-auto"
          }`}
        >
          <Image
            src="/images/SCC icon.webp"
            width={200}
            height={200}
            className="w-16 h-16"
            alt="St Clare College Logo"
          />
          <span className="text-white text-sm font-semibold md:text-xl md:font-bold leading-tight text-right">
            St. Clare College <br /> of Caloocan Inc.
          </span>
        </div>
      </header>

      {/* Sidebar */}
      <SideNav profile={profile} />

      {/* Main scrollable area */}
      <main
        className={`pt-24 p-4 overflow-y-auto min-h-screen bg-gray-100 transition-all duration-300 ${
          isNavOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </>
  );
}
