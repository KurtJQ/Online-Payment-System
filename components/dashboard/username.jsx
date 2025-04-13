import { auth } from "app/auth";

export default async function UserName() {
  const session = await auth();
  if (!session.user) return null;
  const user = session.user;

  return <span className="text-2xl font-bold">{user.name.toUpperCase()}</span>;
}
