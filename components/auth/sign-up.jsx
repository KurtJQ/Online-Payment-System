"use server";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(formData) {
  const hashPassword = bcrypt.hashSync(formData.get("password"), 10);
  const data = {
    fname: formData.get("fname"),
    mname: formData.get("mname"),
    lname: formData.get("lname"),
    address: formData.get("address"),
    mobile: formData.get("mobile"),
    landline: formData.get("landline"),
    facebook: formData.get("facebook"),
    birthdate: new Date(formData.get("birthday")),
    birthplace: formData.get("birthplace"),
    nationality: formData.get("nationality"),
    religion: formData.get("religion"),
    sex: formData.get("sex"),
    father: formData.get("father"),
    mother: formData.get("mother"),
    guardian: formData.get("guardian"),
    guardianOccupation: formData.get("guardianOccupation"),
    registrationDate: new Date(formData.get("registrationDate")),
    lrn: formData.get("lrn"),
    email: formData.get("email"),
    password: hashPassword,
    nursery: {
      schoolName: formData.get("nurseryName"),
      yearAttended: formData.get("nurseryYear"),
    },
    elementary: {
      schoolName: formData.get("elementaryName"),
      yearAttended: formData.get("elementaryYear"),
    },
    juniorHigh: {
      schoolName: formData.get("juniorHighName"),
      yearAttended: formData.get("juniorHighYear"),
    },
    seniorHigh: {
      schoolName: formData.get("seniorHighName"),
      yearAttended: formData.get("seniorHighYear"),
    },
    education: formData.get("education"),
    course: formData.get("course"),
    yearLevel: formData.get("yearLevel"),
    semester: formData.get("semester"),
    schoolYear: formData.get("schoolYear"),
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
    const response = await fetch(process.env.NODE_ENV + "/api/student/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Error adding new account");
    }
  } catch (error) {
    console.error(error.message);
  }
  redirect("/");
}
