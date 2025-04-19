"use client";

export default function Input({ label, value, onChange, name, type }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange} // Bind to onChange for editable fields
        name={name}
        type={type}
        className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
      />
    </div>
  );
}
