"use server";

export async function patchProfileData(data) {
  const form = {
    auth: {
      email: data.email,
      password: data.password,
    },
    data: {
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
      father: data.father,
      mother: data.mother,
      guardian: data.guardian,
      guardianOccupation: data.guardianOccupation,
    },
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
        body: JSON.stringify(form),
        cache: "no-store",
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      return resData;
    }
    return resData;
  } catch (err) {
    console.error("Error updating profile:", err);
    return null;
  }
}
