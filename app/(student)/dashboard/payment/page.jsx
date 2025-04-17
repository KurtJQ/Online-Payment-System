import Fees from "components/dashboard/breakdown";
import { auth } from "@/app/auth";

function formatYear(year) {
  switch (year) {
    case "1":
      return "1st Year";
    case "2":
      return "2nd Year";
    case "3":
      return "3rd Year";
    case "4":
      return "4th Year";
    default:
      return "ERROR Wrong format";
  }
}

function formatSemester(semester) {
  switch (semester) {
    case "1":
      return "First Semester";
    case "2":
      return "Second Semester";
  }
}

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
      <div className="bg-gray-300 rounded-3xl p-5 md:p-8 w-full md:w-2/3 shadow-md space-y-4">
        {/* Payment Methods */}
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Select payment method
          </p>
          <div className="space-y-2">
            <div className="border bg-gray-100 border-gray-500 p-3 rounded-xl hover:bg-gray-500 cursor-pointer">
              GCash e-Wallet
            </div>
            <div className="border bg-gray-100 border-gray-500 p-3 rounded-xl hover:bg-gray-500 cursor-pointer">
              Paymaya e-Wallet
            </div>
            <div className="border bg-gray-100 border-gray-500 p-3 rounded-xl hover:bg-gray-500 cursor-pointer">
              Credit / Debit Card
            </div>
          </div>
        </div>
  
        {/* Payment Info */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-gray-700">Payment for:</p>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              {profile.fname} {profile.mname} {profile.lname}
            </p>
            <p>{profile.course}</p>
            <p>{formatYear(profile.yearLevel)}</p>
            <p>{formatSemester(profile.semester)}</p>
          </div>
        </div>
  
        {/* Amount Input */}
        <div>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            className="w-full bg-red-500 text-white p-3 rounded-full font-bold hover:bg-red-600 transition duration-200"
            type="submit"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
  
}
