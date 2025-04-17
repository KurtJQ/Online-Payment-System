"use client";

import ClientToaster from "./Toaster";

export default function ClientLayout({ children }) {
  return (
    <>
      {children}
      <ClientToaster />
    </>
  );
}