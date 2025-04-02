export default function Page() {
  return (
    <div className="m-4 md:m-8 flex flex-col md:flex-row">
      {/* Payment Method Section */}
      <div className="bg-gray-300 rounded-3xl p-4 md:p-6 w-full md:w-2/3">
        <p className="font-medium text-lg">Select payment method</p>
        <div className="mt-3">
          {/* Payment Methods */}
          <div className="border-2 border-black p-2 mb-2 rounded cursor-pointer hover:bg-gray-200">
            GCash e-Wallet
          </div>
          <div className="border-2 border-black p-2 mb-2 rounded cursor-pointer hover:bg-gray-200">
            Paymaya e-Wallet
          </div>
          <div className="border-2 border-black p-2 mb-2 rounded cursor-pointer hover:bg-gray-200">
            Credit / Debit Card
          </div>
        </div>
        <div>
          <p className="font-medium mt-4">Payment for</p>
          <p>Kurt Justine Que</p>
          <p>BSCS</p>
          <p>4th Year</p>
          <p>Second Semester</p>
        </div>
        <input
          type="number"
          placeholder="Enter amount"
          className="border-2 border-black p-2 mb-2 rounded w-full"
        />
        <div className="bg-red-500 text-center text-white p-2 rounded-full font-bold">
          <button type="submit">Complete payment</button>
        </div>
      </div>

      {/* Information or Fees Section */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0 md:ml-8">
        <p className="font-medium text-lg">Payment Details</p>
        {/* Example payment details */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p>Amount to Pay: <span className="font-bold">₱5,000.00</span></p>
          <p>Due Date: <span className="font-bold">April 15, 2025</span></p>
          <p>Payment Status: <span className="font-bold">Pending</span></p>
        </div>
      </div>
    </div>
  );
}
