import { auth } from "@/app/auth";
import { ResetPassword } from "@/components/dashboard/ResetPassword";

export default async function Page() {
  const session = await auth();
  if (!session.user) {
    return null;
  }

  return (
    <main className="flex items-center justify-center">
      <ResetPassword user={session.user} />
    </main>
  );
}
