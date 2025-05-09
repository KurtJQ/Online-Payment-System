"use server";
import bcrypt from "bcryptjs";

export async function signup(formData) {
  const hashPassword = bcrypt.hashSync(formData.get("password"), 10);

  // Capitalize helper
  function capitalizeWords(str) {
    return str?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const data = {
    fname: capitalizeWords(formData.get("fname")),
    mname: capitalizeWords(formData.get("mname")),
    lname: capitalizeWords(formData.get("lname")),
    address: capitalizeWords(formData.get("address")),
    mobile: formData.get("mobile"),
    landline: formData.get("landline"),
    facebook: formData.get("facebook"),
    birthdate: new Date(formData.get("birthdate")),
    birthplace: capitalizeWords(formData.get("birthplace")),
    nationality: capitalizeWords(formData.get("nationality")),
    religion: capitalizeWords(formData.get("religion")),
    sex: formData.get("sex"),
    father: capitalizeWords(formData.get("father")),
    mother: capitalizeWords(formData.get("mother")),
    guardian: capitalizeWords(formData.get("guardian")),
    guardianOccupation: capitalizeWords(formData.get("guardianOccupation")),
    registrationDate: new Date(formData.get("registrationDate")),
    lrn: formData.get("lrn"),
    email: formData.get("email"),
    password: hashPassword,

    nursery: {
      schoolName: capitalizeWords(formData.get("nurseryName")),
      yearAttended: formData.get("nurseryYear"),
    },
    elementary: {
      schoolName: capitalizeWords(formData.get("elementaryName")),
      yearAttended: formData.get("elementaryYear"),
    },
    juniorHigh: {
      schoolName: capitalizeWords(formData.get("juniorHighName")),
      yearAttended: formData.get("juniorHighYear"),
    },
    seniorHigh: {
      schoolName: capitalizeWords(formData.get("seniorHighName")),
      yearAttended: formData.get("seniorHighYear"),
    },

    education: formData.get("education"),
    course: formData.get("course"),
    yearLevel: formData.get("yearLevel"),
    semester: formData.get("semester"),
    schoolYear: formData.get("schoolYear"),
    subjects: JSON.parse(formData.get("subjects")),

    files: [],
    tuitionFee: 0,
    totalPaid: 0,
    balance: 0,
    payments: [],
    status: "missing files",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const response = await fetch(process.env.SERVER_URL + "/api/student/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return console.error("Error adding new account");
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.error(error.message);
  }
}
