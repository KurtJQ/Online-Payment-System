import Image from "next/image";
import { SideNavButton, SideNav } from "components/dashboard/sidenav.jsx";

export default function DashboardLayout({ children }) {
  return (
    <>
      <header className="bg-red-500 overflow-hidden flex flex-row items-center p-3 md:px-12">
        <SideNavButton />
        <div className="inline-flex items-center mx-auto md:mx-0">
          <Image
            src="/images/SCC icon.webp"
            width={200}
            height={200}
            className="w-20 h-20 "
            alt="St Clare College Logo"
          />
          <span className="text-white text-xl font-semibold md:text-2xl md:font-bold">
            St. Clare College <br />
            of Caloocan Inc.
          </span>
        </div>
        {/* <div className="inline-flex items-center gap-3">
          <button className="bg-gray-300 rounded-full p-1">
            <Image
              src="/images/bell-regular-48.png"
              width={48}
              height={48}
              alt="Notifications Button"
            />
          </button>
          </div> */}
      </header>
      <SideNav />
      <main className="md:ml-64">{children}</main>
    </>
  );
}
