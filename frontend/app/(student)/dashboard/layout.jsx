import Image from "next/image";
import SideNav from "components/dashboard/sidenav.jsx";

export default function DashboardLayout({ children }) {
  return (
    <>
      <header className="bg-red-500 overflow-hidden p-3 px-12 flex justify-between">
        <div className="inline-flex items-center">
          <Image
            src="/SCC icon.webp"
            width={200}
            height={200}
            className="w-20 h-20 "
            alt="St Clare College Logo"
          />
          <span className="text-white text-2xl font-bold">
            St. Clare College <br />
            of Caloocan Inc.
          </span>
        </div>
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
            <span className="text-2xl font-bold">KURT JUSTINE QUE</span>
          </div>
        </div>
      </header>
      <SideNav />
      <main className="ml-64">{children}</main>
    </>
  );
}
