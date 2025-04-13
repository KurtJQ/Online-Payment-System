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
      process.env.NODE_ENV + `/api/student/invoice/${studentId}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    invoices = await res.json();
  } catch (error) {
    console.error("An error occured while fetching data: ", error);
  }

  return (
    <>
      {invoices.map((invoice) => (
        <div
          key={invoice.referenceNumber}
          className="grid grid-cols-6 items-center bg-gray-300 rounded-3xl m-3 py-4 font-bold text-lg text-center"
        >
          <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
          <div>{invoice.referenceNumber}</div>
          <div>{formatYear(invoice.yearLevel)}</div>
          <div>{formatSemester("2")}</div>
          <div>{invoice.amount} PHP</div>
        </div>
      ))}
    </>
  );
}
