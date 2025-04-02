import { auth } from "app/auth";

export default async function UserName() {
  const session = await auth();
  if (!session.user) return null;
  const user = session.user;

  const name = user.fname + " " + user.mname + " " + user.lname;

  return <span className="text-2xl font-bold">{name.toUpperCase()}</span>;
}
