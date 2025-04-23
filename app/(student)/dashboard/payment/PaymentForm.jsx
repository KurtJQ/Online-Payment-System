"use server";

import { auth } from "@/app/auth";
import PaymentClientForm from "./PaymentClientForm";

export default async function PaymentForm() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/student/profile-data/${session.user.id}`);

  if (!res.ok) return <div>Failed to fetch profile</div>;

  const profile = await res.json();

  return <PaymentClientForm profile={profile} />;
}
