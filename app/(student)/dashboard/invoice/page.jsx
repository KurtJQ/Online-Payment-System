import { InvoiceList } from "@/components/dashboard/invoiceList";

export default function Page() {
  return (
    <div className="flex flex-col m-4 md:m-8 p-4 md:p-6 rounded-3xl bg-gray-300 shadow-lg">
      {/* Header: Date Range and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="bg-gray-400 rounded-3xl px-4 py-2 font-bold text-sm md:text-base text-center shadow">
          01/01/2024 - 12/31/2024
        </div>

        {/* Search Bar Placeholder */}
        <div className="flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full md:w-64 bg-white px-4 py-2 rounded-3xl text-sm outline-none shadow-inner"
            disabled // Remove this and wire it up to make functional
          />
        </div>
      </div>

      {/* Invoice List Container */}
      <div className="rounded-3xl h-96 mt-3 bg-gray-500 overflow-y-auto p-3 space-y-2 shadow-inner">
        <InvoiceList />
      </div>
    </div>
  );
}
