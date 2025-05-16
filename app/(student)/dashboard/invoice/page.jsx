import { InvoiceList } from "@/components/dashboard/invoiceList";
import { auth } from "@/app/auth";

const fetchPayments = async (studentId) => {
  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/payment/invoice/${studentId}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const invoices = await res.json();
    return invoices;
  } catch (error) {
    console.error("An error occured while fetching data: ", error);
  }
};

export default async function Page() {
  const today = new Date();
  const formattedToday = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const session = await auth();
  if (!session.user) {
    return null;
  }
  const studentId = session.user.id;

  const invoice = await fetchPayments(studentId);

  return (
    <div className="flex flex-col m-4 md:m-8 p-4 md:p-6 rounded-3xl bg-gray-300 shadow-lg">
      <div className="flex flex-row flex-wrap justify-between items-center gap-2 mb-4">
        <div className="text-2xl font-extrabold text-gray-800 md:text-3xl px-2">
          Invoices
        </div>
        <div className="bg-gray-400 rounded-3xl px-3 py-2 font-bold text-sm md:text-base text-center shadow">
          {formattedToday}
        </div>
      </div>

      <div className="rounded-3xl mt-3 bg-gray-400 overflow-y-auto p-3 space-y-2 shadow-inner">
        <InvoiceList invoices={invoice} />
      </div>
    </div>
  );
}
