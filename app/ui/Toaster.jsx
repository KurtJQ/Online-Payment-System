// app/ui/Toaster.jsx
"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <Toaster position="top-right" reverseOrder={false} />,
    document.body
  );
}