// app/signup/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { signup } from "components/auth/sign-up";
import { useState } from "react";
import toast from "react-hot-toast";

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
    <label className="font-semibold block">
      School Year <span className="text-red-500">*</span>
      <input
        type="text"
        name={name}
        placeholder="School Year (e.g., 2000-2001)"
        value={value}
        onChange={handleChange}
        className="input-style font-normal"
        required
      />
    </label>
  );
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");
  const [landline, setLandline] = useState("");
  const [verifyEmailNotif, setVerifyEmailNotif] = useState("");

  //mobile number
  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const limited = cleaned.slice(0, 11);

    if (cleaned.length > 11) {
      toast.error("Phone number cannot exceed 11 digits!");
    }

    if (limited.length <= 4) {
      return limited;
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 4)}-${limited.slice(4)}`;
    } else {
      return `${limited.slice(0, 4)}-${limited.slice(4, 7)}-${limited.slice(
        7
      )}`;
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
    const limited = cleaned.slice(0, 11);

    if (cleaned.length > 11) {
      toast.error("Landline number cannot exceed 11 digits!");
    }

    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 5) {
      return `${limited.slice(0, 2)}-${limited.slice(2)}`;
    } else if (limited.length <= 8) {
      return `${limited.slice(0, 2)}-${limited.slice(2, 5)}-${limited.slice(
        5
      )}`;
    } else {
      return `${limited.slice(0, 2)}-${limited.slice(2, 5)}-${limited.slice(
        5,
        8
      )}-${limited.slice(8)}`;
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    if (data.get("confirmPassword") !== data.get("password")) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    if (!validateFacebookUrl(data.get("facebook"))) {
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
              <label className="font-semibold">
                First Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="fname"
                  required
                  className="input-style font-normal capitalize"
                />
              </label>
              <label className="font-semibold">
                Middle Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="mname"
                  className="input-style font-normal capitalize"
                />
              </label>
              <label className="font-semibold">
                Last Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="lname"
                  required
                  className="input-style font-normal capitalize"
                />
              </label>
            </div>
            {/* Address and Contact */}
            <label className="font-semibold block">
              Address <span className="text-red-500">*</span>
              <input
                type="text"
                name="address"
                required
                className="input-style font-normal capitalize"
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-semibold">
                Mobile Phone <span className="text-red-500">*</span>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Phone Number (11 digits)"
                  required
                  className="input-style font-normal"
                  value={mobile}
                  onChange={(e) => {
                    const formattedPhone = formatPhoneNumber(e.target.value);
                    setMobile(formattedPhone);
                  }}
                />
              </label>
              <label className="font-semibold">
                Landline
                <input
                  type="tel"
                  name="landline"
                  placeholder="Landline Number (11 digits)"
                  className="input-style font-normal"
                  value={landline}
                  onChange={(e) => {
                    const formattedLandline = formatLandline(e.target.value);
                    setLandline(formattedLandline);
                  }}
                />
              </label>
            </div>
            <label className="font-semibold block">
              Facebook URL <span className="text-red-500">*</span>
              <input
                type="url"
                name="facebook"
                placeholder="https://facebook.com/(Your Facebook Profile)"
                required
                className="input-style font-normal"
              />
            </label>

            {/* Birthday and Birthplace */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
              <label className="font-semibold">
                Birth Date <span className="text-red-500">*</span>
                <input
                  type="date"
                  name="birthdate"
                  required
                  className="input-style font-normal"
                />
              </label>
            </div>
            <label className="font-semibold block">
              Birth Place <span className="text-red-500">*</span>
              <input
                type="text"
                name="birthplace"
                required
                className="input-style font-normal capitalize"
              />
            </label>

            {/* Nationality and Religion */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="font-semibold">
                Nationality <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="nationality"
                  required
                  className="input-style font-normal capitalize"
                />
              </label>
              <label className="font-semibold">
                Religion <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="religion"
                  required
                  className="input-style font-normal capitalize"
                />
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-around gap-2 sm:gap-4 text-sm font-medium text-gray-700">
              {["Male", "Female", "Other"].map((gender) => (
                <label
                  key={gender}
                  className="flex items-center justify-center space-x-2 border border-gray-300 px-4 py-2 rounded-full cursor-pointer hover:border-blue-500"
                >
                  <span className="text-red-500">*</span>
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
            <label className="font-semibold block">
              Father`&apos;`s Name
              <input
                type="text"
                name="father"
                className="input-style font-normal capitalize"
              />
            </label>
            <label className="font-semibold block">
              Mother`&apos;`s Name
              <input
                type="text"
                name="mother"
                className="input-style font-normal capitalize"
              />
            </label>
            <label className="font-semibold block">
              Guardian`&apos;`s Name <span className="text-red-500">*</span>
              <input
                type="text"
                name="guardian"
                required
                className="input-style font-normal capitalize"
              />
            </label>
            <label className="font-semibold block">
              Guardian`&apos;`s Occupation{" "}
              <span className="text-red-500">*</span>
              <input
                type="text"
                name="guardianOccupation"
                required
                className="input-style font-normal capitalize"
              />
            </label>
            <label className="font-semibold block">
              Registration Date <span className="text-red-500">*</span>
              <input
                type="date"
                name="registrationDate"
                required
                className="input-style font-normal"
              />
            </label>
            <label className="font-semibold block">
              LRN
              <input
                type="number"
                name="lrn"
                placeholder="Enter LRN (12 digits)"
                className="input-style font-normal"
              />
            </label>

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

            <select name="course" className="input-style" required>
              <option value="">Select Course</option>
              <option value="BSCS">BS Computer Science</option>
              <option value="BSHM">BS Hospitality Management</option>
              <option value="BSBA">BS Business Administration</option>
              <option value="BSTM">BS Tourism Management</option>
              <option value="BEED">Bachelor of Elementary Education</option>
              <option value="BSED-MATH">
                Bachelor of Secondary Education - Math
              </option>
              <option value="BSED-ENG">
                Bachelor of Secondary Education - English
              </option>
              <option value="BA-POLSCI">BA Political Science</option>
            </select>

            <select name="yearLevel" className="input-style" required>
              <option value="">Select Year Level</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            <select name="semester" className="input-style" required>
              <option value="">Select Semester</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>

            <SchoolYearInput required name="schoolYear" />

            <div className="flex flex-col gap-4 mt-4">
              <label className="font-semibold">
                Email <span className="text-red-500">*</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input-style font-normal"
                />
              </label>
              <label className="font-semibold">
                Password <span className="text-red-500">*</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="input-style font-normal"
                />
              </label>
              <label className="font-semibold">
                Confirm Password <span className="text-red-500">*</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Password"
                  required
                  className="input-style font-normal"
                />
              </label>
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
