"use server";
import { auth } from "@/app/auth";

export default async function transactionWidget() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  const session = await auth();
  if (!session) {
    return null;
  }
  const studentId = session.user.id;

  let invoice = [];
  try {
    const res = await fetch(
      process.env.SERVER_URL + `/api/payment/payment/${studentId}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    invoice = await res.json();
  } catch (error) {
    console.error(error);
  }

  return { invoice }; // Passing the fetched data to the client
}
