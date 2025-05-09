// app/signup/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { signup } from "components/auth/sign-up";
import { useState } from "react";
import toast from "react-hot-toast";

const subjects = {
  BSCS: {
    1: {
      "1st Semester": [
        { code: "cc102", description: "Fundamentals of Programming" },
        { code: "cc101", description: "Introduction to Computing" },
        { code: "ge2", description: "Komunikasyon sa Akademikong Filipino" },
        { code: "ge1", description: "Communications Skill 1" },
        { code: "ge3", description: "College Algebra" },
        {
          code: "NSTP 1",
          description: "National Service Training Program 1",
        },
        { code: "PE 1", description: "Physical Fitness" },
        { code: "PDP 1", description: "Professional Development Program 1" },
      ],
    },
    2: {
      "1st Semester": [
        { code: "CC104", description: "Data Structure and Algorithms" },
        { code: "DS102", description: "Discrete Structures 2" },
        { code: "SDF104", description: "Object-oriented Programming" },
        { code: "GE8", description: "Probabilities and Statistics" },
        { code: "GE7", description: "Speech and Oral Communication" },
        { code: "PE 3", description: "Individual and Dual Sports" },
        { code: "PDP 3", description: "Professional Development Program 3" },
      ],
    },
    3: {
      "1st Semester": [
        { code: "IAS101", description: "Information Assurance and Security" },
        {
          code: "GV101",
          description: "Graphics and Visual Computing (elective)",
        },
        { code: "AR101", description: "Architecture and Organization" },
        { code: "AL102", description: "Automata Theory and Formal Languages" },
        {
          code: "CC106",
          description: "Applications Development and Emerging Technologies",
        },
        { code: "GE11", description: "Trigonometry" },
        { code: "GE12", description: "Philosophy of Man and Ethics" },
      ],
    },
    4: {
      "1st Semester": [
        { code: "SF101", description: "System Fundamentals (elective)" },
        { code: "HCI101", description: "Human Computer Interaction" },
        { code: "SE102", description: "Software Engineering 2" },
        { code: "OS101", description: "Operating Systems" },
        { code: "GE15", description: "Philippine History and Culture" },
        {
          code: "GE16",
          description: "Politics & Governance (w/ Philippine Constitution)",
        },
        { code: "THS101", description: "CS Thesis Writing 1" },
      ],
    },
  },
};

function YearAttendedInput({ name }) {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8); // only digits, max 8
    let formatted = raw;
    if (raw.length > 4) {
      formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
    }
    setValue(formatted);
    if (formatted.length === 9 && !/^\d{4}-\d{4}$/.test(formatted)) {
      toast.error("Please use the format YYYY-YYYY");
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder="Year Attended (e.g., 2000-2004)"
      value={value}
      onChange={handleChange}
      className="input-style"
    />
  );
}

function SchoolYearInput({ name }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8); // remove non-digits, max 8 digits
    let formatted = raw;

    if (raw.length > 4) {
      formatted = `${raw.slice(0, 4)}-${raw.slice(4)}`;
    }

    setValue(formatted);

    if (formatted.length === 9 && !/^\d{4}-\d{4}$/.test(formatted)) {
      toast.error("Please use the format YYYY-YYYY");
    }
  };

  return (
    <input
      type="text"
      name={name}
      placeholder="School Year (e.g., 2000-2001)"
      value={value}
      onChange={handleChange}
      className="input-style"
      required
    />
  );
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [verifyEmailNotif, setVerifyEmailNotif] = useState("");
  const [subject, setSubject] = useState({
    course: "",
    yearLevel: "",
    semester: "",
  });

  const handleSubjectChange = (data) => {
    setSubject((prev) => ({ ...prev, [data.target.name]: data.target.value }));
  };

  //mobile number
  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.slice(0, 11);

    if (cleaned.length > 11) {
      toast.error("Phone number cannot exceed 11 digits!");
      return formatted.slice(0, 11);
    }

    if (formatted.length <= 4) {
      return formatted;
    } else if (formatted.length <= 7) {
      return `${formatted.slice(0, 4)}-${formatted.slice(4)}`;
    } else {
      return `${formatted.slice(0, 4)}-${formatted.slice(
        4,
        7
      )}-${formatted.slice(7, 11)}`;
    }
  }

  //facebook
  function validateFacebookUrl(value) {
    const facebookRegex =
      /^https:\/\/www\.facebook\.com\/[A-Za-z0-9_.-]+\/?(\?.*)?$/;
    return facebookRegex.test(value);
  }

  //gmail
  function validateGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  }

  //landline
  function formatLandline(value) {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.slice(0, 11);

    if (cleaned.length > 11) {
      toast.error("Landline number cannot exceed 11 digits!");
      return formatted.slice(0, 11);
    }

    if (formatted.length <= 3) {
      return formatted;
    } else if (formatted.length <= 5) {
      return `${formatted.slice(0, 2)}-${formatted.slice(2)}`;
    } else if (formatted.length <= 8) {
      return `${formatted.slice(0, 2)}-${formatted.slice(
        2,
        5
      )}-${formatted.slice(5)}`;
    } else {
      return `${formatted.slice(0, 2)}-${formatted.slice(
        2,
        5
      )}-${formatted.slice(5, 8)}-${formatted.slice(8)}`;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (!validateFacebookUrl(data.get("facebook"))) {
      console.log(data.get("facebook"));
      setLoading(false);
      return toast.error(
        "Please enter a valid Facebook URL starting with 'https://www.facebook.com/'"
      );
    }
    if (data.get("lrn").length > 12) {
      setLoading(false);
      return toast.error("LRN is more than 12 digits");
    }
    if (!validateGmail(data.get("email"))) {
      setLoading(false);
      return toast.error(
        "Please enter a valid Gmail address ending in @gmail.com"
      );
    }

    data.set("mobile", mobile);
    data.set("landline", landline);
    if (!subject.course || !subject.yearLevel || !subject.semester) {
      return toast.error("Please select Course/Year Level/Semester");
    }
    data.append(
      "subjects",
      JSON.stringify(
        subjects[subject.course][subject.yearLevel][subject.semester]
      )
    );

    try {
      const response = await signup(data);
      if (response) {
        setVerifyEmailNotif(response.message);
      }
    } catch (error) {
      console.error("Signup failed", error);
      toast.error(error);
    } finally {
      setLoading(false); // End loading
    }
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
                className="input-style capitalize"
              />
              <input
                type="text"
                name="mname"
                placeholder="Middle Name"
                className="input-style capitalize"
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                required
                className="input-style capitalize"
              />
            </div>

            {/* Address and Contact */}
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              className="input-style capitalize"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Phone Number (11 digits)"
                required
                className="input-style"
                value={mobile}
                onChange={(e) => {
                  const formattedPhone = formatPhoneNumber(e.target.value);
                  setMobile(formattedPhone);
                }}
              />
              <input
                type="tel"
                name="landline"
                placeholder="Landline Number (11 digits)"
                className="input-style"
                value={landline}
                onChange={(e) => {
                  const formattedLandline = formatLandline(e.target.value);
                  setLandline(formattedLandline);
                }}
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
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <label className="text-md flex items-center space-x-2 gap-4 font-semibold text-black">
                Birth Date:
              </label>
              <input
                type="date"
                name="birthdate"
                placeholder="Birth Date"
                required
                className="input-style"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <input
                type="text"
                name="birthplace"
                placeholder="Birth Place"
                required
                className="input-style capitalize"
              />
            </div>

            {/* Nationality and Religion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nationality"
                placeholder="Nationality"
                required
                className="input-style capitalize"
              />
              <input
                type="text"
                name="religion"
                placeholder="Religion"
                required
                className="input-style capitalize"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-around gap-2 sm:gap-4 text-sm font-medium text-gray-700">
              {["Male", "Female", "Other"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-2 rounded-full cursor-pointer hover:border-blue-500"
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
              className="input-style capitalize"
            />
            <input
              type="text"
              name="mother"
              placeholder="Mother's Name"
              required
              className="input-style capitalize"
            />
            <input
              type="text"
              name="guardian"
              placeholder="Guardian's Name"
              required
              className="input-style capitalize"
            />
            <input
              type="text"
              name="guardianOccupation"
              placeholder="Guardian's Occupation"
              required
              className="input-style capitalize"
            />
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <label className="text-md flex items-center space-x-2 gap-4 font-semibold text-black">
                Registration Date:
              </label>
              <input
                type="date"
                name="registrationDate"
                placeholder="Registration Date"
                required
                className="input-style"
              />
            </div>
            <input
              type="number"
              name="lrn"
              placeholder="Enter LRN (12 digits)"
              className="input-style"
            />
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
                    className="input-style capitalize"
                  />
                  <YearAttendedInput name={`${name}Year`} />
                </div>
              </div>
            ))}

            {/* Education and Course */}
            <select name="education" className="input-style" required>
              <option value="">Select Education Level</option>
              <option value="college">College</option>
            </select>

            <select
              name="course"
              className="input-style"
              onChange={handleSubjectChange}
              required
            >
              <option value="">Select Course</option>
              <option value="BSCS">BS Computer Science</option>
              <option value="BSHM">BS Hospitality Management</option>
              <option value="BSBA">BS Business Administration</option>
              <option value="BSTM">BS Tourism Management</option>
              <option value="BEED">Bachelor of Elementary Education</option>
              <option value="BSEDMATH">
                Bachelor of Secondary Education - Math
              </option>
              <option value="BSEDENG">
                Bachelor of Secondary Education - English
              </option>
              <option value="bapos">BA Political Science</option>
            </select>

            <select
              name="yearLevel"
              className="input-style"
              onChange={handleSubjectChange}
              required
            >
              <option value="">Select Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select
              name="semester"
              className="input-style"
              onChange={handleSubjectChange}
              required
            >
              <option value="">Select Semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>

            <div className="border-2 bg-white rounded-2xl p-3">
              <div className="font-semibold mb-3">Subjects To Be Enrolled</div>
              {!subject.course || !subject.yearLevel || !subject.semester
                ? "Please select Course/Year Level/Semester"
                : subjects[subject.course][subject.yearLevel][
                    subject.semester
                  ].map((data) => (
                    <div
                      className="grid grid-cols-2 gap-y-3 mb-3"
                      key={data.code}
                    >
                      <div>{String(data.code).toUpperCase()}</div>
                      <div>{data.description}</div>
                    </div>
                  ))}
            </div>

            <SchoolYearInput required name="schoolYear" />

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
              className="w-full bg-red-600 text-white py-2 font-bold rounded-full flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              {loading ? "Signing Up..." : "SIGN UP"}
            </button>
            {!verifyEmailNotif ? (
              ""
            ) : (
              <div className="text-center font-bold font-text-lg">
                {verifyEmailNotif}
              </div>
            )}
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
