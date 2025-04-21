"use server";

export async function patchProfileData(data) {
  const dataTest = {
    fname: data.fname,
    mname: data.mname,
    lname: data.lname,
    address: data.address,
    mobile: data.mobile,
    landline: data.landline,
    facebook: data.facebook,
    birthdate: new Date(data.birthdate),
    birthplace: data.birthplace,
    nationality: data.nationality,
    religion: data.religion,
    sex: data.sex,
    lrn: data.lrn,
    course: data.course,
    schoolYear: data.schoolYear,
    yearLevel: data.yearLevel,
    semester: data.semester,
    education: data.education,
    father: data.father,
    mother: data.mother,
    guardian: data.guardian,
    guardianOccupation: data.guardianOccupation,
    email: data.email,
    password: data.password,
  };

  try {
    const res = await fetch(
      process.env.SERVER_URL +
        `/api/student/profile-data/${data._studentId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTest),
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to update profile: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error updating profile:", err);
    return null;
  }
}
