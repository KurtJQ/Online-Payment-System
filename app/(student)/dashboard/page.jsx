import Transactions from "components/dashboard/transactionwidget";
import Fees from "components/dashboard/breakdown";
import Events from "components/dashboard/EventList";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-6 px-4 md:px-0">
      {/* Left Column: Events + Transactions */}
      <div className="flex flex-col gap-4 w-full md:w-[350px]">
        <div className="bg-gray-300 rounded-3xl p-4 md:p-6">
          <Events />
        </div>
        <div className="bg-gray-300 rounded-3xl p-4 md:p-6">
          <Transactions />
        </div>
      </div>

      {/* Right Column: Fees */}
      <div className="flex-1">
        <div className="h-full rounded-3xl p-4 md:p-6 bg-gray-300">
          <Fees />
        </div>
      </div>
    </div>
  );
}
