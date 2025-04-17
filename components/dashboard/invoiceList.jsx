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

function formatSemester(semester) {
  switch (semester) {
    case "1":
      return "First Semester";
    case "2":
      return "Second Semester";
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

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.referenceNumber}
          className="bg-white rounded-2xl shadow-md px-4 py-4 mx-2 md:mx-0"
        >
          {/* Mobile layout */}
          <div className="flex flex-col md:hidden space-y-1 text-sm text-gray-800 font-medium">
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(invoice.createdAt).toLocaleDateString()}
            </div>
            <div>
              <span className="font-semibold">Reference:</span>{" "}
              {invoice.referenceNumber}
            </div>
            <div>
              <span className="font-semibold">Year Level:</span>{" "}
              {formatYear(invoice.yearLevel)}
            </div>
            <div>
              <span className="font-semibold">Semester:</span>{" "}
              {formatSemester("2")}
            </div>
            <div>
              <span className="font-semibold">Amount:</span> {invoice.amount} PHP
            </div>
          </div>
  
          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-5 text-center text-base font-semibold text-gray-800">
            <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
            <div>{invoice.referenceNumber}</div>
            <div>{formatYear(invoice.yearLevel)}</div>
            <div>{formatSemester("2")}</div>
            <div>{invoice.amount} PHP</div>
          </div>
        </div>
      ))}
    </div>
  );
}