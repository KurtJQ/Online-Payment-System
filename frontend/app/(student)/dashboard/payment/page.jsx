import Fees from "app/ui/dashboard/breakdown";

export default function Page() {
  return (
    <div className="m-4 md:m-8 flex flex-col md:flex-row">
      {/* Fees Section */}
      <div className="w-full md:w-1/3 mb-6 md:mb-0">
        <Fees hidePay={true} />
      </div>

      {/* Payment Section */}
      <div className="bg-gray-300 rounded-3xl p-4 md:p-6 w-full md:w-2/3">
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
    </div>
  );
}
