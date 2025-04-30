"use client";
import { useEffect, useState } from "react";
import { patchProfileData } from "@/components/dashboard/patchProfileData";
import Input from "@/components/Input";
import { getProfileData } from "@/components/dashboard/getProfileData";
import { getSession } from "next-auth/react";
import bcrypt from "bcryptjs";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import formatYear from "app/utils/formatYear.js";

export default function AccountPage() {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
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
    let formattedValue = value;

    const nameFields = [
      "fname",
      "mname",
      "lname",
      "father",
      "mother",
      "guardian",
      "guardianOccupation",
      "address",
      "birthplace",
      "nationality",
      "religion",
    ];
    if (nameFields.includes(name)) {
      formattedValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    }

    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
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
      router.push("/dashboard/account/");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoadingUpdate(false);
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
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="fname"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  onChange={handleInputChange}
                  value={updatedProfile.fname || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="mname"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  name="mname"
                  id="mname"
                  onChange={handleInputChange}
                  value={updatedProfile.mname || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="lname"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  onChange={handleInputChange}
                  value={updatedProfile.lname || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="address"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleInputChange}
                  value={updatedProfile.address || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="mobile"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  onChange={handleInputChange}
                  value={updatedProfile.mobile || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="birthdate"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Birthdate
                </label>
                <input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  onChange={handleInputChange}
                  value={
                    updatedProfile.birthdate
                      ? new Date(updatedProfile.birthdate)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="birthplace"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Birthplace
                </label>
                <input
                  type="text"
                  name="birthplace"
                  id="birthplace"
                  onChange={handleInputChange}
                  value={updatedProfile.birthplace || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="nationality"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  id="nationality"
                  onChange={handleInputChange}
                  value={updatedProfile.nationality || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-sm font-semibold text-gray-700 mb-1">
                  Sex
                </label>
                <div className="flex gap-4">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      onChange={handleInputChange}
                      value="Male"
                      className="hidden peer"
                    />
                    <div className="px-4 py-2 rounded-full text-sm font-medium border transition bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-red-400 peer-checked:bg-red-600 peer-checked:hover:bg-red-700 peer-checked:text-white peer-checked:border-red-600">
                      Male
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      onChange={handleInputChange}
                      value="Female"
                      className="hidden peer"
                    />
                    <div className="px-4 py-2 rounded-full text-sm font-medium border transition bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-red-400 peer-checked:bg-red-600 peer-checked:hover:bg-red-700 peer-checked:text-white peer-checked:border-red-600">
                      Female
                    </div>
                  </label>
                </div>
              </div>
              {/* <Input
                label="Sex"
                value={updatedProfile.sex || ""}
                onChange={handleInputChange}
                name="sex"
                type="radio"
                options={["Male", "Female"]}
              /> */}
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="facebook"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Facebook
                </label>
                <input
                  type="text"
                  name="facebook"
                  id="facebook"
                  onChange={handleInputChange}
                  value={updatedProfile.facebook || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Academic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="course"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Course
                </label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={updatedProfile.course || ""}
                  readOnly
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="yearLevel"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Year Level
                </label>
                <input
                  type="text"
                  name="yearLevel"
                  id="yearLevel"
                  value={formatYear(updatedProfile.yearLevel) || ""}
                  readOnly
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="semester"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  id="semester"
                  value={updatedProfile.semester || ""}
                  readOnly
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="schoolYear"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  School Year
                </label>
                <input
                  type="text"
                  name="schoolYear"
                  id="schoolYear"
                  value={updatedProfile.schoolYear || ""}
                  readOnly
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="lrn"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  LRN
                </label>
                <input
                  type="text"
                  name="lrn"
                  id="lrn"
                  onChange={handleInputChange}
                  value={updatedProfile.lrn || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="education"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  value={updatedProfile.education || ""}
                  readOnly
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Contact & Guardian Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="landline"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Landline
                </label>
                <input
                  type="number"
                  name="landline"
                  id="landline"
                  onChange={handleInputChange}
                  value={updatedProfile.landline || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="father"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Father
                </label>
                <input
                  type="text"
                  name="father"
                  id="father"
                  onChange={handleInputChange}
                  value={updatedProfile.father || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="mother"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Mother
                </label>
                <input
                  type="text"
                  name="mother"
                  id="mother"
                  onChange={handleInputChange}
                  value={updatedProfile.mother || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="guardian"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Guardian
                </label>
                <input
                  type="text"
                  name="guardian"
                  id="guardian"
                  onChange={handleInputChange}
                  value={updatedProfile.guardian || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="guardianOccupation"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Guardian Occupation
                </label>
                <input
                  type="text"
                  name="guardianOccupation"
                  id="guardianOccupation"
                  onChange={handleInputChange}
                  value={updatedProfile.guardianOccupation || ""}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-red-700 mb-3">
              Login Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleInputChange}
                  className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
              disabled={loadingUpdate} // Disable the button while updating
            >
              {loadingUpdate ? "Updating..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
