export function Subjects({ student }) {
  if (!student.subjects) {
    return (
      <div className="bg-gray-300 p-6 rounded-3xl">No Subjects available</div>
    );
  }
  return (
    <div className="bg-gray-300 p-6 rounded-3xl">
      <h1 className="text-xl font-bold">My Subjects</h1>
      <ul className="grid grid-cols-3 gap-y-3 py-3 text-sm md:text-base">
        <li className="font-semibold">Subject Code</li>
        <li className="font-semibold">Subject Description</li>
        <li className="font-semibold text-center">Units</li>

        {student.subjects.map((data) => (
          <>
            <li>{String(data.code).toUpperCase()}</li>
            <li>{data.description}</li>
            <li className="text-center">{data.units}</li>
          </>
        ))}
      </ul>
    </div>
  );
}
