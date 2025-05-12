import Transactions from "app/(student)/dashboard/invoice/transactionwidget";
import Fees from "components/dashboard/breakdown";
import Events from "components/dashboard/EventList";
import { ClassSchedule } from "components/dashboard/ClassSchedule";
import { auth } from "@/app/auth";

async function getProfile(id) {
  try {
    const response = await fetch(
      process.env.SERVER_URL + "/api/student/profile-data/" + id
    );
    if (!response.ok) {
      throw new Error("Profile Fetch Failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getClasses(course, yearLevel, semester, schoolYear) {
  try {
    const response = await fetch(
      process.env.SERVER_URL +
        `/api/class/get/${course}/${yearLevel}/${semester}/${schoolYear}`
    );
    if (!response.ok) {
      throw new Error("Class Fetch Failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const session = await auth();
  if (!session.user) {
    return null;
  }
  const user = session.user;

  const student = await getProfile(user.id);
  const classes = await getClasses(
    student.course,
    student.yearLevel,
    student.semester,
    student.schoolYear
  );
  return (
    <div className="flex flex-col md:flex-row w-full h-full gap-6 px-4 md:px-0">
      <div className="flex flex-col gap-4 w-full md:w-[600px]">
        <div className="bg-gray-300 hover:shadow-2xl rounded-3xl p-4 md:p-6">
          <Events />
        </div>
        <div className="bg-gray-300 hover:shadow-2xl rounded-3xl p-4 md:p-6">
          <Transactions />
        </div>
      </div>
      <ClassSchedule student={student} classes={classes} />
      <Fees />
    </div>
  );
}
