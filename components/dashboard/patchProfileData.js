"use server";

export async function patchProfileData(studentId) {
  const dataTest = {
    fname: data.fname,
    mname: data.mname,
    lname: data.lname,
    address: data.address,
    mobile: data.mobile,
    landline: data.landline,
    facebook: data.facebook,
    birthdate: data.birthdate,
    birthplace: data.birthplace,
    nationality: data.nationality,
    religion: data.religion,
    sex: data.sex,
    father: data.father,
    mother: data.mother,
    guardian: data.guardian,
    guardianOccupation: data.guardianOccupation,
    registrationDate: data.registrationDate,
    lrn: data.lrn,
    email: data.email,
    password: data.password,
    education: data.education,
    course : data.course,
    lrn: data.lrn,
    
    }
  try {
    const res = await fetch( process.env.SERVER_URL + `/api/student/profile-data/${studentId}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataTest),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to update profile: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error updating profile:", err);
    return null;
  }
}