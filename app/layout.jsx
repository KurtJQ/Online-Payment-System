import { inter } from "/app/ui/fonts";
import "/app/ui/global.css";

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
  title: "St. Clare Online Payment System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full bg-gray-100">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
