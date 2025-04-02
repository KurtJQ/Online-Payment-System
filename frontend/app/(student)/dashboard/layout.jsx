"use client";

import { useState } from "react";
import Image from "next/image";
import SideNav from "app/ui/dashboard/sidenav.jsx";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="bg-red-500 overflow-hidden p-3 px-4 md:px-12 flex justify-between items-center">
        <div className="inline-flex items-center space-x-3 md:space-x-4">
          <Image
            src="/SCC icon.webp"
            width={200}
            height={200}
            className="w-16 h-16 md:w-20 md:h-20"
            alt="St Clare College Logo"
          />
          <span className="text-white text-xl md:text-2xl font-bold">
            St. Clare College <br className="md:hidden" />
            of Caloocan Inc.
          </span>
        </div>

        {/* Notifications & Profile Button */}
        <div className="inline-flex items-center gap-3">
          <button className="bg-gray-300 rounded-full p-1">
            <Image
              src="/bell-regular-48.png"
              width={48}
              height={48}
              alt="Notifications Button"
            />
          </button>
          <div className="inline-flex items-center bg-gray-300 rounded-full gap-1 px-4 py-1">
            <div>
              <Image
                src="/user-circle-solid-48.png"
                width={48}
                height={48}
                alt="Default Profile Picture"
              />
            </div>
            <span className="text-base md:text-2xl font-bold">KURT JUSTINE QUE</span>
          </div>

          {/* Hamburger Menu (visible on mobile) */}
          <button
            className="md:hidden text-white p-2 rounded-full ml-4" // Hamburger icon appears after the logo and profile picture
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} md:ml-64`}>
        {children}
      </main>
    </>
  );
}
