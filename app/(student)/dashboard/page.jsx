import Transactions from "app/(student)/dashboard/invoice/transactionwidget";
import Fees from "components/dashboard/breakdown";
import Events from "components/dashboard/EventList";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-6 px-4 md:px-0">
      {/* Left Column: Events + Transactions */}
      <div className="flex flex-col gap-4 w-full md:w-[600px]">
        <div className="bg-gray-300 rounded-3xl p-4 md:p-6">
          <Events />
        </div>
        <div className="bg-gray-300 rounded-3xl p-4 md:p-6">
          <Transactions />
        </div>
      </div>

      {/* Right Column: Fees */}
      <div className="flex-1">
      <div className="h-full w-full rounded-2xl p-6 md:p-8 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl">
        <Fees />
      </div>
      </div>
    </div>
  );
}
