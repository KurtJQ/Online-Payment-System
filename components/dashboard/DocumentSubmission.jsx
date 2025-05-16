"use client";

import toast from "react-hot-toast";

export function DocumentSubmission({ student }) {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = 10 * 1024 * 1024;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");

    if (!file) {
      return toast.error("No file selected");
    }
    if (file && !allowedTypes.includes(file.type)) {
      return toast.error("Only JPEG, PNG and PDF are allowed");
    }
    if (file && file.size > maxSize) {
      return toast.error("File too large, Max 10MB");
    }
    formData.append("_studentId", student._studentId);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/documents/add",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error(data.message);
        return toast.error(data.message);
      }
      return toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-300 rounded-3xl p-6 space-y-3">
      <div>
        {student.files.find((data) => data.doctype === "form137") ? (
          (() => {
            const file = student.files.find(
              (data) => data.doctype === "form137"
            );
            const fileUrl = `data:${file.mimeType};base64,${file.base64}`;

            return (
              <div className="space-y-2">
                <p className="font-semibold">Form 137 Uploaded:</p>
                <a
                  href={fileUrl}
                  download={file.filename}
                  className="text-blue-600 underline text-sm"
                >
                  Download File
                </a>
              </div>
            );
          })()
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Form 137
              <input type="file" className="mb-3" name="file" />
            </label>
            <input
              type="text"
              className="hidden"
              name="document"
              readOnly
              value="form137"
            />
            <button
              type="submit"
              className="bg-red-500 text-white font-semibold rounded-lg p-2"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
      <div>
        {student.files.find((data) => data.doctype === "psa") ? (
          (() => {
            const file = student.files.find((data) => data.doctype === "psa");
            const fileUrl = `data:${file.mimeType};base64,${file.base64}`;

            return (
              <div className="space-y-2">
                <p className="font-semibold">Form 137 Uploaded:</p>
                <a
                  href={fileUrl}
                  download={file.filename}
                  className="text-blue-600 underline text-sm"
                >
                  Download File
                </a>
              </div>
            );
          })()
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              PSA
              <input type="file" className="mb-3" name="file" />
            </label>
            <input
              type="text"
              className="hidden"
              name="document"
              readOnly
              value="psa"
            />
            <button
              type="submit"
              className="bg-red-500 text-white font-semibold rounded-lg p-2"
            >
              Confirm
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
