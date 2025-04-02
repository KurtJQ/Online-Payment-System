import Link from "next/link";
export default function transactionWidget() {
  return (
    <div className="bg-gray-300 rounded-3xl min-w-fit flex flex-col items-center p-3">
      {/* Header */}
      <div className="font-bold text-2xl">Recent Transactions</div>
      {/* Main Content */}
      <div className="overflow-y-auto basis-full">
        <div className="bg-gray-500 text-white rounded-full p-2 text-sm">
          2nd Periodical 1,500 PHP 11/14/2024
        </div>
      </div>
      {/* Footer */}
      <div className="ml-auto bg-gray-500 text-white p-1 px-2 rounded-full text-xs ">
        <Link href={"/dashboard/invoice"}>Show more</Link>
      </div>
    </div>
  );
}
