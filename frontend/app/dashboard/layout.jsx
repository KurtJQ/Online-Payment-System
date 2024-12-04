import Image from "next/image";

export default function DashboardLayout({ children }) {
  return (
    <>
      <header>
        <div>
          <Image
            src="/SCC icon.webp"
            width={80}
            height={80}
            alt="St Clare College Logo"
          />
          <span>St. Clare College of Caloocan Inc.</span>
        </div>
        <div>
          <button>
            <img src="/bell-regular-48.png" alt="Notifications Button" />
          </button>
          <span>Kurt Justine Que</span>
        </div>
      </header>
      <nav></nav>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
