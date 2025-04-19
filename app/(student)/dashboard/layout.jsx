import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { auth } from "@/app/auth";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session) return null;

  const user = session.user;
  let profile = null;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + `/api/student/profile-data/${user.id}`,
      { cache: "no-store" }
    );
    profile = await res.json();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }

  return <DashboardLayoutClient profile={profile}>{children}</DashboardLayoutClient>;
}
