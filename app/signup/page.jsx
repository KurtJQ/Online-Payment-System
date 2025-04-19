"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "components/auth/sign-up";
import LoadingSpinner from "components/LoadingSpinner";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function handleSignUp(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true); // Set loading to true when form is submitted
    signup(data)
      .then(() => {
        setLoading(false); // Set loading to false after signup is done
        router.push("/"); // Redirect to the login page (or another page)
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of error
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
      });
  }

  return (
    <div className="flex min-h-screen bg-[url('/images/background.webp')] bg-cover bg-center">
      <div className="flex w-full items-center justify-center bg-black bg-opacity-50 p-6">
        <div className="w-full max-w-2xl bg-gray-100 rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center text-red-700 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Example Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                required
                className="input-style "
              />
              <input
                type="text"
                name="mname"
                placeholder="Middle Name"
                required
                className="input-style"
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                required
                className="input-style"
              />
            </div>

            {/* Address and Contact */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="input-style"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Phone Number"
                required
                className="input-style"
              />
              <input
                type="tel"
                name="landline"
                placeholder="Landline Number"
                className="input-style"
              />
            </div>
            <input
              type="url"
              name="facebook"
              placeholder="Facebook Profile URL"
              required
              className="input-style"
            />

            {/* Birthday and Birthplace */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="date"
                name="birthdate"
                required
                className="input-style"
              />
              <input
                type="text"
                name="birthplace"
                placeholder="Birth Place"
                required
                className="input-style"
              />
            </div>

            {/* Nationality and Religion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                required
                className="input-style"
              />
              <input
                type="text"
                name="religion"
                placeholder="Religion"
                required
                className="input-style"
              />
            </div>

            {/* Gender Selection */}
            <div className="flex justify-around text-sm font-medium text-gray-700">
              {["Male", "Female", "Other"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-full cursor-pointer hover:border-blue-500"
                >
                  <input
                    type="radio"
                    name="sex"
                    value={gender}
                    required
                    className="accent-blue-500"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>

            {/* Additional Fields */}
            <input
              type="text"
              name="father"
              placeholder="Father's Name"
              required
              className="input-style"
            />
            <input
              type="text"
              name="mother"
              placeholder="Mother's Name"
              required
              className="input-style"
            />
            <input
              type="text"
              name="guardian"
              placeholder="Guardian's Name"
              required
              className="input-style"
            />
            <input
              type="text"
              name="guardianOccupation"
              placeholder="Guardian's Occupation"
              required
              className="input-style"
            />
            <input
              type="date"
              name="registrationDate"
              required
              className="input-style"
            />
            <input
              type="number"
              name="lrn"
              placeholder="LRN Number"
              required
              className="input-style"
            />
            {/* Education Fields */}
            {[
              { label: "Nursery", name: "nursery" },
              { label: "Elementary", name: "elementary" },
              { label: "Junior High", name: "juniorHigh" },
              { label: "Senior High", name: "seniorHigh" },
            ].map(({ label, name }) => (
              <div key={name}>
                <p className="font-semibold">{label}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name={`${name}Name`}
                    placeholder="School Name"
                    className="input-style"
                  />
                  <input
                    type="text"
                    name={`${name}Year`}
                    placeholder="Year Attended"
                    className="input-style"
                  />
                </div>
              </div>
            ))}

            {/* Education and Course */}
            <select name="education" className="input-style">
              <option value="">Select Education Level</option>
              <option value="college">College</option>
            </select>

            <select name="course" className="input-style">
              <option value="">Select Course</option>
              <option value="BSCS">BS Computer Science</option>
              <option value="BSHM">BS Hospitality Management</option>
              <option value="BSBA">BS Business Administration</option>
              <option value="BSTM">BS Tourism Management</option>
              <option value="BEED">Bachelor of Elementary Education</option>
              <option value="BSED">
                Bachelor of Secondary Education - Math/English
              </option>
              <option value="bapos">BA Political Science</option>
            </select>

            <select name="yearLevel" className="input-style">
              <option value="">Select Year Level</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>

            <div className="flex flex-col gap-4 mt-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="input-style"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-style"
            />
          </div>


          <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 font-bold rounded-full"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <LoadingSpinner /> // Use the LoadingSpinner component here
              ) : (
                "SIGN UP"
              )}
            </button>
          </form>

          <p className="mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold hover:underline cursor-pointer"
              onClick={() => router.push("/")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
