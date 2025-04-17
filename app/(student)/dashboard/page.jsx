import Transactions from "components/dashboard/transactionwidget";
import Fees from "components/dashboard/breakdown";
import Events from "components/dashboard/EventList";

export default function Page() {
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-5">
      {/* Left column: Fees + Events */}
      <div className="flex flex-col gap-5 flex-1">
        <Fees />
        <Events />
      </div>

      {/* Right column: Transactions */}
      <div className="flex flex-1 flex-col">
        <Transactions />
      </div>
    </div>
  );
}
