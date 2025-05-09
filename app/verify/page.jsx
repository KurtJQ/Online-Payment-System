import Verify from "@/components/dashboard/verify.jsx";

import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <div className="bg-gray-100 p-6 rounded-md text-center">
        <img src="/images/SCC icon.webp" alt="SCC icon" />
        <Suspense>
          <Verify />
        </Suspense>
      </div>
    </div>
  );
}
