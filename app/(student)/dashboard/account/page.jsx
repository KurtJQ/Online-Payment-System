"use client";

function Input({ label, value, type = "text" }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        readOnly
        className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
      />
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-700">
          Student Profile
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-red-700 mb-3">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="First Name" value="Kurt" />
            <Input label="Middle Name" value="Justine" />
            <Input label="Last Name" value="Que" />
            <Input label="Address" value="123 Happy Street" />
            <Input label="Mobile" value="09123456789" />
            <Input label="Birthdate" value="2002-01-01" />
            <Input label="Birthplace" value="Manila" />
            <Input label="Nationality" value="Filipino" />
            <Input label="Sex" value="Male" />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-red-700 mb-3">
            Academic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Course" value="BSCS" />
            <Input label="Year Level" value="4th Year" />
            <Input label="Semester" value="Second Semester" />
            <Input label="School Year" value="2024-2025" />
            <Input label="LRN" value="1234567890" />
            <Input label="Education" value="College" />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-red-700 mb-3">
            Contact & Guardian Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Facebook" value="fb.com/kurtjustine" />
            <Input label="Landline" value="(02) 1234 567" />
            <Input label="Father" value="Juan Que" />
            <Input label="Mother" value="Maria Que" />
            <Input label="Guardian" value="Uncle Pedro" />
            <Input label="Guardian Occupation" value="Engineer" />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-red-700 mb-3">
            Login Credentials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Email" value="kurt.que@example.com" type="email" />
            <Input label="Password" value="••••••••••••" type="password" />
          </div>
        </section>

        <div className="text-center mt-8">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200">
            Edit Info
          </button>
        </div>
      </div>
    </div>
  );
}
