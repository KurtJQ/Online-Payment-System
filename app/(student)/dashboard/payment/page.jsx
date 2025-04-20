import Fees from "components/dashboard/breakdown";
import { auth } from "@/app/auth";

function formatYear(year) {
  switch (year) {
    case "1st":
      return "1st Year";
    case "2nd":
      return "2nd Year";
    case "3rd":
      return "3rd Year";
    case "4th":
      return "4th Year";
    default:
      return "ERROR Wrong format";
  }
}

// export default function Payment() {}  

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
      <div className="bg-gray-300 rounded-3xl p-5 md:p-8 w-full md:w-2/3 transition-all duration-300 hover:shadow-2xl space-y-4">
        {/* ExamPeriod */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <label className="block text-gray-700 font-medium mb-1">
            Exam Period
          </label>

          <select
            className="w-full p-3 border border-gray-400 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          //   <select
          //   value={examPeriod}
          //   onChange={(e) => {
          //     const value = e.target.value;
          //     setExamPeriod(value);
          //     if (value === "downpayment" && amount > 2000) {
          //       setAmount(2000);
          //     } else if (value !== "" && value !== "downpayment" && amount > 1500) {
          //       setAmount(1500);
          //     }
          //   }}
          //   className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
          //   required
          // >
          >
            <option value="">Select Exam Period</option>
            <option value="downpayment">Downpayment</option>
            <option value="1st Periodic">1st Periodic</option>
            <option value="Prelim">Prelim</option>
            <option value="2nd Periodic">2nd Periodic</option>
            <option value="Midterm">Midterm</option>
            <option value="3rd Periodic">3rd Periodic</option>
            <option value="Pre-final">Pre-final</option>
            <option value="4th Periodic">4th Periodic</option>
            <option value="Finals">Finals</option>
          </select>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            Payment for:
          </p>
          <div className="text-sm text-gray-800 space-y-1">
            <p>
              {profile.fname} {profile.mname} {profile.lname}
            </p>
            <p>{profile.course}</p>
            <p>{formatYear(profile.yearLevel)}</p>
            <p>{profile.semester}</p>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <input
            type="number"
            placeholder="Enter amount"
            className="w-full hover:bg-gray-100 border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div> 

        {/* Amount */}
        {/* <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium">Amount (PHP)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              const inputAmount = parseFloat(e.target.value);
              const max =
                examPeriod === "downpayment"
                  ? 2000
                  : examPeriod !== ""
                  ? 1500
                  : 9999999.99;
              setAmount(inputAmount > max ? max : inputAmount);
            }}
            max={examPeriod === "downpayment" ? 2000 : examPeriod !== "" ? 1500 : 9999999.99}
            className="w-full p-2 border rounded-lg capitalize bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Enter amount"
            required
          />
        </div> */}

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
