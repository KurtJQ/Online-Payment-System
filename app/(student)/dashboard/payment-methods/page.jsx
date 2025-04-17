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
      {/* Payment Method Section */}
      <div className="bg-gray-300 rounded-3xl p-4 md:p-6 w-full md:w-2/3 shadow-md">
        <p className="font-semibold text-lg md:text-xl text-gray-800">Select payment method</p>
  
        {/* Payment Methods */}
        <div className="mt-4 space-y-3">
          {["GCash e-Wallet", "Paymaya e-Wallet", "Credit / Debit Card"].map((method, idx) => (
            <div
              key={idx}
              className="border-2  border-gray-500 p-3 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-500 transition"
            >
              {method}
            </div>
          ))}
        </div>
  
        {/* Payment For Info */}
        <div className="mt-4 text-black bg-gray-100 border border-gray-500 p-3 rounded-lg space-y-1 text-sm md:text-base">
          <p className="font-medium text-base md:text-lg">Payment for</p>
          <p>{profile.fname} {profile.mname} {profile.lname}</p>
          <p>{profile.course}</p>
          <p>{formatYear(profile.yearLevel)}</p>
          <p>{profile.semester}</p>
        </div>
  
        {/* Amount Input */}
        <input
          type="number"
          placeholder="Enter amount"
          className="mt-4 border-2 border-black p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />
  
        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 transition text-white p-3 rounded-full font-bold text-sm md:text-base"
          >
            Complete payment
          </button>
        </div>
      </div>
  
      {/* Information or Fees Section */}
      <div className="w-full md:w-1/3">
        <p className="font-semibold text-lg md:text-xl mb-2 text-gray-800">Payment Details</p>
        <div className="bg-white p-4 rounded-2xl shadow-md space-y-2 text-sm md:text-base">
          <p>
            Amount to Pay: <span className="font-bold">₱5,000.00</span>
          </p>
          <p>
            Due Date: <span className="font-bold">April 15, 2025</span>
          </p>
          <p>
            Payment Status: <span className="font-bold">Pending</span>
          </p>
        </div>
      </div>
    </div>
  );
  
}
