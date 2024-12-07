import Transactions from "app/ui/dashboard/transactionwidget";

export default function Page() {
  return (
    <>
      <div className="flex m-8 gap-12">
        <div className="basis-full w-3/4">
          {/* Top */}
          <div className="flex mb-4 justify-between text-2xl">
            <div className="bg-gray-300 px-3 py-4 rounded-full font-bold">
              Total Balance: 7,500 PHP
            </div>
            <div className="bg-gray-300 px-3 py-4 rounded-full font-bold">
              Pay Now
            </div>
          </div>
          {/* Bottom */}
          <div className="grid gap-3 bg-gray-300 rounded-3xl p-8 font-bold text-2xl ">
            <div className="flex border-b-2 border-black">
              1st Periodical <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              Prelim <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              2nd Periodical <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              Midterm <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              3rd Periodical <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              Pre-Finals <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              4th Periodical <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex border-b-2 border-black">
              Finals <span className="ml-auto">1,500 PHP</span>
            </div>
            <div className="flex">
              Total <span className="ml-auto">1,500 PHP</span>
            </div>
          </div>
        </div>
        <Transactions />
      </div>
    </>
  );
}
