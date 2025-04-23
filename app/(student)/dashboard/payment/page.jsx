import Fees from "components/dashboard/breakdown";
import { auth } from "@/app/auth";
import { PaymentForm } from "components/dashboard/paymentForm";

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }
  const user = session.user;
  let profile;

  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/student/profile-data/${user.id}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    profile = await res.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="m-4 md:m-8 flex flex-col gap-6 md:flex-row">
      {/* Fees Section */}
      <div className="w-full md:w-1/3">
        <Fees hidePay={true} />
      </div>

      {/* Payment Section */}
      <PaymentForm profile={profile} />
    </div>
  );
}
