
"use server";

export async function submitPayment({ studentId, examPeriod, amount }) {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/student/payment/${studentId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      description: `${examPeriod} payment`,
      examPeriod,
    }),
  });

  const data = await res.json();
  return data;
}
