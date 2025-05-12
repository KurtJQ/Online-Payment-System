import { auth } from "@/app/auth";
import { ClassSchedule } from "@/components/dashboard/ClassSchedule";
import { Subjects } from "@/components/dashboard/Subjects";

const getProfile = async (id) => {
  try {
    const response = await fetch(
      process.env.SERVER_URL + `/api/student/profile-data/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getClasses = async (course, yearLevel, semester, schoolYear) => {
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
};

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
    <section className="flex flex-col md:flex-row gap-3">
      <Subjects student={student} />
      <ClassSchedule student={student} classes={classes} />
    </section>
  );
}
