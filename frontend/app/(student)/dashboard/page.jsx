import Transactions from "app/ui/dashboard/transactionwidget";
import Fees from "app/ui/dashboard/breakdown";

export default function Page() {
  return (
    <>
      <div className="flex m-8 gap-12">
        <Fees />
        <Transactions />
      </div>
    </>
  );
}
