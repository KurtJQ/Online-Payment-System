import Fees from "components/dashboard/breakdown";
import { auth } from "@/app/auth";
import { PaymentForm } from "components/dashboard/paymentForm";
import TransactionWidget from "../invoice/transactionwidget";

async function getProfile(id) {
  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/student/profile-data/${id}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

async function getCurrentPayments(id, yearLevel, schoolYear, semester) {
  try {
    const response = await fetch(
      process.env.SERVER_URL +
        `/api/student/invoices/${id}/${yearLevel}/${schoolYear}/${semester}`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }
  const user = session.user;

  const profile = await getProfile(user.id);
  const currentPayments = await getCurrentPayments(
    profile._studentId,
    profile.yearLevel,
    profile.schoolYear,
    profile.semester
  );

  return (
    <div className="m-4 md:m-8 flex flex-col gap-6 md:flex-row">
      {/* Fees Section */}
      <div className="w-full md:w-1/3">
        <Fees hidePay={true} />
      </div>

      {/* Payment Section */}
      <PaymentForm profile={profile} currentPayments={currentPayments} />

      <div className="bg-gray-300 hover:shadow-2xl rounded-3xl p-4 md:p-6">
        <TransactionWidget />
      </div>
    </div>
  );
}
