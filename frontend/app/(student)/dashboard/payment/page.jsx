import Fees from "components/dashboard/breakdown";
import { auth } from "@/app/auth";
const session = await auth();

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
  if (!session) {
    return null;
  }
  const user = session.user;
  let profile;

  try {
    const res = await fetch(
      `http://localhost:5050/api/student/profile-data/${user.id}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    profile = await res.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="m-4 md:m-8 flex flex-col md:flex-row">
      {/* Fees Section */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <Fees hidePay={true} />
      </div>

      {/* Payment Section */}
      <div className="ml-4 bg-gray-300 rounded-3xl p-4 md:p-6 w-full md:w-2/3">
        <p className="font-medium">Select payment method</p>
        <div className="mt-3">
          <div className="border-2 border-black p-2 mb-2 rounded">
            GCash e-Wallet
          </div>
          <div className="border-2 border-black p-2 mb-2 rounded">
            Paymaya e-Wallet
          </div>
          <div className="border-2 border-black p-2 mb-2 rounded">
            Credit / Debit Card
          </div>
        </div>
        <div>
          <p className="font-medium">Payment for</p>
          <p>
            {profile.fname} {profile.mname} {profile.lname}
          </p>
          <p>{profile.course}</p>
          <p>{formatYear(profile.yearLevel)}</p>
          <p>Second Semester</p>
        </div>
        <input
          type="number"
          placeholder="Enter amount"
          className="border-2 border-black p-2 mb-2 rounded w-full"
        />
        <div>
          <button
            className="bg-red-500 text-center text-white p-2 rounded-full font-bold"
            type="submit"
          >
            Complete payment
          </button>
        </div>
      </div>
    </div>
  );
}
