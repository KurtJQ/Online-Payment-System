"use client";

export default function Input({ label, value, onChange, name, type, options = [] }) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-gray-700 mb-1">{label}</label>

      {type === "radio" ? (
        <div className="flex gap-4">
          {options.map((option) => (
            <label
              key={option}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium border transition 
                ${
                  value === option
                    ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300 hover:border-red-400"
                }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="hidden"
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
