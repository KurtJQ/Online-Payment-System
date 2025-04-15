"use client";

import { useRouter } from "next/navigation";
import { signup } from "components/auth/sign-up";

export default function Signup() {
  const router = useRouter();

  function handleSignUp(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signup(data);
  }

  return (
    <div className="flex flex-col bg-[url(/images/background.webp)] bg-cover bg-center md:flex-row min-h-screen">
      <div className="m-auto">
        <div className="w-full flex flex-col bg-white items-center justify-center my-6 p-6 rounded-3xl">
          <h2 className="text-2xl font-bold mt-4">Create an Account</h2>
          <form className="w-full max-w-sm mt-4" onSubmit={handleSignUp}>
            <div>
              <label htmlFor="fname" className="hidden">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="First Name"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="mname" className="hidden">
                Middle Name
              </label>
              <input
                type="text"
                name="mname"
                id="mname"
                placeholder="Middle Name"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="lname" className="hidden">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                id="lname"
                required
                placeholder="Last Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="address" className="hidden">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                placeholder="Address"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="hidden">
                Mobile Phone Number
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                required
                placeholder="Mobile Phone Number"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="landline" className="hidden">
                Landline Number
              </label>
              <input
                type="tel"
                name="landline"
                id="landline"
                placeholder="Landline Number"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="facebook" className="hidden">
                Facebook
              </label>
              <input
                type="url"
                name="facebook"
                id="facebook"
                required
                placeholder="Facebook Profile URL"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="birthdate" className="ml-4">
                Birthday
              </label>
              <input
                type="date"
                name="birthdate"
                id="birthdate"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="birthplace" className="hidden">
                Birth Place
              </label>
              <input
                type="text"
                name="birthplace"
                id="birthplace"
                placeholder="Birth Place"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="nationality" className="hidden">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                id="nationality"
                placeholder="Nationality"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="religion" className="hidden">
                Religion
              </label>
              <input
                type="text"
                name="religion"
                id="religion"
                placeholder="Religion"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div className="flex justify-between py-2 mb-2 w-full gap-2">
              <div className="px-4 py-2 border-2 border-black rounded-full">
                <input
                  type="radio"
                  name="sex"
                  id="male"
                  value="Male"
                  required
                  className="mr-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="px-4 py-2 border-2 border-black rounded-full">
                <input
                  type="radio"
                  name="sex"
                  id="Female"
                  value="female"
                  required
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="px-4 py-2 border-2 border-black rounded-full">
                <input
                  type="radio"
                  name="sex"
                  id="other"
                  value="Other"
                  required
                  className="mr-2"
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div>
              <label htmlFor="father" className="hidden">
                Father&aposs Name
              </label>
              <input
                type="text"
                name="father"
                id="father"
                required
                placeholder="Father's Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="mother" className="hidden">
                Mother&aposs Name
              </label>
              <input
                type="text"
                name="mother"
                id="mother"
                required
                placeholder="Mother's Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="guardian" className="hidden">
                Guardian&aposs Name
              </label>
              <input
                type="text"
                name="guardian"
                id="guardian"
                required
                placeholder="Guardian's Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="guardianOccupation" className="hidden">
                Guardian&aposs Occupation
              </label>
              <input
                type="text"
                name="guardianOccupation"
                id="guardianOccupation"
                required
                placeholder="Guardian's Occupation"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="registrationDate" className="ml-4">
                Date of Registration
              </label>
              <input
                type="date"
                name="registrationDate"
                id="registrationDate"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="lrn" className="hidden">
                LRN
              </label>
              <input
                type="number"
                name="lrn"
                id="lrn"
                min={1}
                max={999999999999}
                required
                placeholder="LRN Number"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="hidden">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Email"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="password" className="hidden"></label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <div className="ml-4">Nursery</div>
              <label htmlFor="nurseryName" className="hidden">
                Nursery School Name
              </label>
              <input
                type="text"
                name="nurseryName"
                id="nurseryName"
                placeholder="School Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
              <label htmlFor="nurseryYear" className="hidden">
                Nursery School Year
              </label>
              <input
                type="text"
                name="nurseryYear"
                id="nurseryYear"
                placeholder="Year Attended"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <div className="ml-4">Elementary</div>
              <label htmlFor="elementaryName" className="hidden">
                Elementary School Name
              </label>
              <input
                type="text"
                name="elementaryName"
                id="elementaryName"
                placeholder="School Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
              <label htmlFor="elementaryYear" className="hidden">
                Elementary School Year
              </label>
              <input
                type="text"
                name="elementaryYear"
                id="elementaryYear"
                placeholder="Year Attended"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <div className="ml-4">Junior High</div>
              <label htmlFor="juniorHighName" className="hidden">
                Junior High School Name
              </label>
              <input
                type="text"
                name="juniorHighName"
                id="juniorHigh"
                placeholder="School Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
              <label htmlFor="juniorHighYear" className="hidden">
                Junior High School Year
              </label>
              <input
                type="text"
                name="juniorHighYear"
                id="juniorHighYear"
                placeholder="Year Attended"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <div className="ml-4">Senior High</div>
              <label htmlFor="seniorHighName" className="hidden">
                Senior High School Name
              </label>
              <input
                type="text"
                name="seniorHighName"
                id="seniorHighName"
                placeholder="School Name"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
              <label htmlFor="seniorHighYear" className="hidden">
                Senior High School Year
              </label>
              <input
                type="text"
                name="seniorHighYear"
                id="seniorHighYear"
                placeholder="Year Attended"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="education" className="ml-4">
                Education Level
              </label>
              <select
                name="education"
                id="education"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              >
                <option value="college">College</option>
              </select>
            </div>
            <div>
              <label htmlFor="course" className="ml-4">
                Course
              </label>
              <select
                name="course"
                id="course"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              >
                <option value="bscs">
                  Bachelor of Science in Computer Science
                </option>
                <option value="bshm">
                  Bachelor of Science in Hospitality Management
                </option>
                <option value="bsba">
                  Bachelor of Science in Business Administration
                </option>
                <option value="bstm">
                  Bachelor of Science in Tourism Management
                </option>
                <option value="beed">Bachelor of Elementary Education</option>
                <option value="bsed">
                  Bachelor of Secondary Education Major in Math & English
                </option>
                <option value="bapos">
                  Bachelor of Arts in Political Science
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="yearLevel" className="ml-4">
                Year Level
              </label>
              <select
                name="yearLevel"
                id="yearLevel"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              >
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div>
              <label htmlFor="semester" className="ml-4">
                Semester
              </label>
              <select
                name="semester"
                id="semester"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              >
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
              </select>
            </div>
            <div>
              <label htmlFor="schoolYear" className="hidden">
                School Year
              </label>
              <input
                type="text"
                name="schoolYear"
                id="schoolYear"
                required
                placeholder="School Year"
                className="px-4 py-2 border-2 border-black w-full rounded-full mb-2"
              />
            </div>
            <div>
              <label htmlFor="" className="ml-4">
                Documents
              </label>

              <div className="px-4 py-2 border-2 border-black w-full rounded-3xl mb-2">
                <label htmlFor="form137" className="ml-4">
                  Form 137
                </label>
                <input
                  type="file"
                  name="form137"
                  id=""
                  capture
                  accept=".jpeg,.png,.pdf,.jpg,."
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 font-bold rounded-full"
            >
              SIGN UP
            </button>
          </form>

          <p className="mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
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
