"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function ClassSchedule({ student, classes }) {
  const [day, setDay] = useState();
  const [showSched, setShowSched] = useState({});
  const toggleSchedule = (classID) => {
    setShowSched((prev) => ({
      ...prev,
      [classID]: !prev[classID],
    }));
  };
  const router = useRouter();

  const handleSubmit = async (data) => {
    data.preventDefault();
    const formData = new FormData(data.currentTarget);
    const sectionID = formData.get("class");
    const form = {
      _id: sectionID,
      _studentId: student._studentId,
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + `/api/class/add`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse.error);
        return toast.error(errorResponse.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="bg-gray-300 p-6 rounded-3xl md:w-1/2 transition hover:shadow-2xl">
      <div className="mb-3">
        <div className="text-xl font-bold">Class Schedule</div>
      </div>
      {!student.section ? (
        <form onSubmit={handleSubmit}>
          <div>Please select a Class</div>
          <div className="grid md:grid-cols-2 gap-3 m-3">
            {classes.map((data) => (
              <label className="cursor-pointer" key={data._id}>
                <input
                  type="radio"
                  name="class"
                  value={data._id}
                  className="hidden peer"
                />
                <div className="border-2 p-3 bg-white rounded-md border-white transition peer-checked:border-2 peer-checked:border-green-500 peer-checked:ring-2 peer-checked:ring-green-400 peer-checked:shadow-md">
                  <div>Class: {data.sectionID}</div>
                  <div className="mb-3">
                    Number of Students: {data.students.length}/{data.maxLimit}
                  </div>
                  <button
                    type="button"
                    className="bg-gray-500 text-white border border-black p-1 rounded-md"
                    onClick={() => toggleSchedule(data._id)}
                  >
                    {!showSched[data._id] ? "Show Schedule" : "Hide Schedule"}
                  </button>
                  {!showSched[data._id] ? (
                    ""
                  ) : (
                    <div>
                      {data.subjects.map((data) => (
                        <div
                          className="grid grid-cols-2 gap-3 mb-3"
                          key={data.code}
                        >
                          <div>
                            <div>{data.description}</div>
                            <div>{data.code}</div>
                            <div>{data.professor}</div>
                          </div>
                          <div>
                            <div
                              className={
                                !data.schedule.monday ? "hidden" : "block"
                              }
                            >
                              Monday: {data.schedule.monday}
                            </div>
                            <div
                              className={
                                !data.schedule.tuesday ? "hidden" : "block"
                              }
                            >
                              Tuesday: {data.schedule.tuesday}
                            </div>
                            <div
                              className={
                                !data.schedule.wednesday ? "hidden" : "block"
                              }
                            >
                              Wednesday: {data.schedule.wednesday}
                            </div>
                            <div
                              className={
                                !data.schedule.thursday ? "hidden" : "block"
                              }
                            >
                              Thursday: {data.schedule.thursday}
                            </div>
                            <div
                              className={
                                !data.schedule.friday ? "hidden" : "block"
                              }
                            >
                              Friday: {data.schedule.friday}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="mb-3 w-full bg-red-500 rounded-full p-2 font-bold text-white transition hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-2 mb-2 pb-2 border-b-2 border-black">
            <div>
              <div>
                <span className="font-bold">Section:</span> {student.section}
              </div>
              <div>
                <span className="font-bold">School Year:</span>{" "}
                {student.schoolYear}
              </div>
            </div>
            <div>
              <div>
                <span className="font-bold">Year Level:</span>{" "}
                {student.yearLevel}
              </div>
              <div>
                <span className="font-bold">Semester:</span> {student.semester}
              </div>
            </div>
          </div>
          <label className="">
            Sort by
            <select
              name="day"
              className="my-3"
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="">All Days</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </label>

          <div className="flex flex-col md:flex-row flex-wrap gap-3">
            {!classes ? (
              "Class does not exist"
            ) : classes.find(
                (classes) => classes.sectionID === student.section
              ) ? (
              <>
                {classes
                  .find((classes) => classes.sectionID === student.section)
                  .subjects.filter((data) => (day ? data.schedule[day] : true))
                  .map((data) => (
                    <div
                      className="bg-gray-200 rounded-lg p-3 space-y-3 mb-3"
                      key={data.code}
                    >
                      <div>
                        <div className="font-bold">{data.description}</div>
                        <div className="uppercase">{data.code}</div>
                        <div className="text-sm">{data.professor}</div>
                      </div>
                      <div className="">
                        <div
                          className={!data.schedule.monday ? "hidden" : "block"}
                        >
                          Monday: {data.schedule.monday}
                        </div>
                        <div
                          className={
                            !data.schedule.tuesday ? "hidden" : "block"
                          }
                        >
                          Tuesday: {data.schedule.tuesday}
                        </div>
                        <div
                          className={
                            !data.schedule.wednesday ? "hidden" : "block"
                          }
                        >
                          Wednesday: {data.schedule.wednesday}
                        </div>
                        <div
                          className={
                            !data.schedule.thursday ? "hidden" : "block"
                          }
                        >
                          Thursday: {data.schedule.thursday}
                        </div>
                        <div
                          className={!data.schedule.friday ? "hidden" : "block"}
                        >
                          Friday: {data.schedule.friday}
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            ) : (
              "Class not found."
            )}
          </div>
        </>
      )}
    </div>
  );
}
