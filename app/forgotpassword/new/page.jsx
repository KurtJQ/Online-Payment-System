import { ForgotPassword } from "@/components/dashboard/ForgotPassword";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
}
