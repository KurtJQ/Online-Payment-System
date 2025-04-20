"use client";
import { useEffect, useState } from "react";
import { patchProfileData } from "@/components/dashboard/patchProfileData";
import Input from "@/components/Input";
import { getProfileData } from "@/components/dashboard/getProfileData";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const session = await getSession();
      const studentId = session?.user?.id;

      if (studentId) {
        const data = await getProfileData(studentId); // Pass studentId here

        if (data) {
          setProfile(data);
          setUpdatedProfile(data);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);
  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while fetching profile
  }

  if (!profile) {
    return <div>Error: Unable to load profile.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const session = await getSession();
      const studentId = session?.user?.id;

      console.log("Fetching profile for studentId:", studentId);
      if (!studentId) {
        throw new Error("No student ID found");
      }

      let updatedData = { ...updatedProfile };
      if (updatedData.password !== profile.password) {
        const newPassword = await bcrypt.hash(updatedData.password, 10);
        updatedData.password = newPassword;
      }

      await patchProfileData(updatedData);
      toast.success("Profile updated successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-gray-50 shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
          <b className="text-4xl">🪪</b>Student Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                value={updatedProfile.fname || ""}
                onChange={handleInputChange}
                name="fname"
                type="text"
              />
              <Input
                label="Middle Name"
                value={updatedProfile.mname || ""}
                onChange={handleInputChange}
                name="mname"
                type="text"
              />
              <Input
                label="Last Name"
                value={updatedProfile.lname || ""}
                onChange={handleInputChange}
                name="lname"
                type="text"
              />
              <Input
                label="Address"
                value={updatedProfile.address || ""}
                onChange={handleInputChange}
                name="address"
                type="text"
              />
              <Input
                label="Mobile"
                value={updatedProfile.mobile || ""}
                onChange={handleInputChange}
                name="mobile"
                type="text"
              />
              <Input
                label="Birthdate"
                value={
                  updatedProfile.birthdate
                    ? new Date(updatedProfile.birthdate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                name="birthdate"
                type="date"
              />
              <Input
                label="Birthplace"
                value={updatedProfile.birthplace || ""}
                onChange={handleInputChange}
                name="birthplace"
                type="text"
              />
              <Input
                label="Nationality"
                value={updatedProfile.nationality || ""}
                onChange={handleInputChange}
                name="nationality"
                type="text"
              />
              <Input
                label="Sex"
                value={updatedProfile.sex || ""}
                onChange={handleInputChange}
                name="sex"
                type="text"
              />
              <Input
                label="Facebook"
                value={updatedProfile.facebook || ""}
                onChange={handleInputChange}
                name="facebook"
                type="text"
              />
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Course"
                value={updatedProfile.course || ""}
                onChange={handleInputChange}
                name="course"
                type="text"
              />
              <Input
                label="Year Level"
                value={updatedProfile.yearLevel || ""}
                onChange={handleInputChange}
                name="yearLevel"
                type="text"
              />
              <Input
                label="Semester"
                value={updatedProfile.semester || ""}
                onChange={handleInputChange}
                name="semester"
                type="text"
              />
              <Input
                label="School Year"
                value={updatedProfile.schoolYear || ""}
                onChange={handleInputChange}
                name="schoolYear"
                type="text"
              />
              <Input
                label="LRN"
                value={updatedProfile.lrn || ""}
                onChange={handleInputChange}
                name="lrn"
                type="number"
              />
              <Input
                label="Education"
                value={updatedProfile.education || ""}
                onChange={handleInputChange}
                name="education"
                type="text"
              />
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Contact & Guardian Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Landline"
                value={updatedProfile.landline || ""}
                onChange={handleInputChange}
                name="landline"
                type="number"
              />
              <Input
                label="Father"
                value={updatedProfile.father || ""}
                onChange={handleInputChange}
                name="father"
                type="text"
              />
              <Input
                label="Mother"
                value={updatedProfile.mother || ""}
                onChange={handleInputChange}
                name="mother"
                type="text"
              />
              <Input
                label="Guardian"
                value={updatedProfile.guardian || ""}
                onChange={handleInputChange}
                name="guardian"
                type="text"
              />
              <Input
                label="Guardian Occupation"
                value={updatedProfile.guardianOccupation || ""}
                onChange={handleInputChange}
                name="guardianOccupation"
                type="text"
              />
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Login Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email"
                onChange={handleInputChange}
                name="email"
                type="email"
              />
              <Input
                label="Password"
                onChange={handleInputChange}
                name="password"
                type="password"
              />
            </div>
          </section>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
