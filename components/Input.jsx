"use client";

export default function Input({ label, value, onChange, name, type, options = [] }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      {type === "radio" ? (
        <div className="flex gap-6">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          className="p-2 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 focus:outline-none"
        />
      )}
    </div>
  );
}
