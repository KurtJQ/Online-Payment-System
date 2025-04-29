import { auth } from "app/auth";

function formatYear(year) {
  switch (year) {
    case "1":
      return "1st Year";
    case "2":
      return "2nd Year";
    case "3":
      return "3rd Year";
    case "4":
      return "4th Year";
    default:
      return "ERROR Wrong format";
  }
}

export async function InvoiceList() {
  let invoices;
  const session = await auth();
  if (!session.user) {
    return null;
  }
  const studentId = session.user.id;

  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/student/invoice/${studentId}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    invoices = await res.json();
  } catch (error) {
    console.error("An error occured while fetching data: ", error);
  }

  // Check if invoices are empty or null
  if (!invoices || invoices.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-xl font-semibold text-gray-700">No Payment Found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.referenceNumber}
          className="relative bg-gradient-to-r from-white via-gray-100 to-white rounded-2xl shadow-lg px-4 py-5 mx-2 md:mx-0 transition hover:scale-[1.01] duration-200 overflow-hidden"
        >
          {/* Left Accent Bar */}
          <div className="absolute top-0 left-0 h-full w-2 bg-red-500" />

          {/* Mobile layout */}
          <div className="md:hidden space-y-2 pl-4 text-sm text-gray-800">
            <div className="text-xs text-gray-500 italic mb-1">
              {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Reference:</span>
              <span>{invoice.referenceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Year Level:</span>
              <span>{formatYear(invoice.yearLevel)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Semester:</span>
              <span>{invoice.semester}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">Exam Period:</span>
              <span>{invoice.examPeriod}</span>
            </div>
            <div className="flex justify-between mt-1 pt-2 border-t border-dashed border-gray-300">
              <span className="font-semibold text-red-600">Amount:</span>
              <span className="font-bold text-red-700">
                {invoice.amount} PHP
              </span>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-6 text-center text-base font-medium text-gray-800 pl-2">
            <div className="text-gray-500 text-sm">
              {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
            <div>{invoice.referenceNumber}</div>
            <div>{formatYear(invoice.yearLevel)}</div>
            <div>{invoice.semester}</div>
            <div>{invoice.examPeriod}</div>
            <div className="text-red-700 font-bold">{invoice.amount} PHP</div>
          </div>
        </div>
      ))}
    </div>
  );
}
