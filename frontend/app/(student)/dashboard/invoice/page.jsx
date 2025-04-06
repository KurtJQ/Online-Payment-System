import Image from "next/image";
import { InvoiceList } from "@/components/dashboard/invoiceList";

export default function Page() {
  return (
    <div className="flex flex-col m-8 p-3 rounded-3xl bg-gray-300">
      <div className="flex justify-between ">
        <div className="bg-gray-400 rounded-3xl p-2 font-bold">
          01/01/2024 - 12/31/2024
        </div>
        <div className="bg-gray-400 rounded-3xl p-2 font-bold">Search Bar</div>
      </div>
      <div className="rounded-3xl h-96 mt-3 bg-gray-500 overflow-y-auto">
        <InvoiceList />
      </div>
    </div>
  );
}
