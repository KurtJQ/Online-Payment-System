"use client";

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

export function PaymentForm(props) {
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount");
    const examPeriod = formData.get("examPeriod");
    const form = {
      amount: amount,
      examPeriod: examPeriod,
      description: "Tuition payment for " + examPeriod,
    };
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/api/student/payment/" +
          props.profile._studentId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) {
        console.error("Error: Payment Unsuccessful");
      }
    } catch (error) {
      console.error("Error Occured: ", error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 rounded-3xl p-5 md:p-8 w-full md:w-2/3 transition-all duration-300 hover:shadow-2xl space-y-4"
    >
      {/* ExamPeriod */}
      <div className="bg-gray-100 p-4 rounded-xl">
        <label htmlFor="" className="block text-gray-700 font-medium mb-1">
          Exam Period
        </label>

        <select
          className="w-full p-3 border border-gray-400 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
          name="examPeriod"
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
        <p className="text-lg font-semibold mb-2 text-gray-700">Payment for:</p>
        <div className="text-sm text-gray-800 space-y-1">
          <p>
            {props.profile.fname} {props.profile.mname} {props.profile.lname}
          </p>
          <p>{props.profile.course}</p>
          <p>{formatYear(props.profile.yearLevel)}</p>
          <p>{props.profile.semester}</p>
        </div>
      </div>

      {/* Amount Input */}
      <div>
        <input
          type="number"
          name="amount"
          min={1}
          max={2000}
          placeholder="Enter amount"
          className="w-full hover:bg-gray-100 border border-gray-400 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>
      <div>
        <button
          className="w-full bg-red-500 text-white p-3 rounded-full font-bold hover:bg-red-600 transition duration-200"
          type="submit"
        >
          Complete Payment
        </button>
      </div>
    </form>
  );
}
