import Transactions from "components/dashboard/transactionwidget";
import Fees from "components/dashboard/breakdown";

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
