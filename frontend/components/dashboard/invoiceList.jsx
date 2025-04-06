import { auth } from "app/auth";

export async function InvoiceList() {
  let invoices;
  const session = await auth();
  if (!session.user) {
    return null;
  }
  const studentId = session.user.studentId;

  try {
    const res = await fetch(`http://localhost:5050/api/student/invoice/`);
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
        <div className="grid grid-cols-6 items-center bg-gray-300 rounded-3xl m-3 py-4 font-bold text-lg text-center">
          <div>{new Date(invoice.createdAt).toLocaleDateString()}</div>
          <div>{invoice.referenceNumber}</div>
          <div>4th Year</div>
          <div>Second Semester</div>
          <div>{invoice.amount} PHP</div>
        </div>
      ))}
    </>
  );
}
