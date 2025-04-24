"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner"; // Make sure to import the spinner

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true); // Mark client-side mount
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/api/student/events`);
        if (!res.ok) throw new Error("Failed to load events");
        const data = await res.json();
        setEvents(data);
        toast.success("Events loaded successfully!");

        const now = new Date();
        const pastEvents = data.filter(event => new Date(event.date) < now);
        if (pastEvents.length > 0) {
          toast((t) => (
            <span>
              ⚠️ {pastEvents.length} event{pastEvents.length > 1 ? "s" : ""} already passed.
            </span>
          ), {
            icon: '⏰',
            style: {
              borderRadius: '8px',
              background: '#fff3cd',
              color: '#856404',
              border: '1px solid #ffeeba',
            },
          });
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        toast.error("Unable to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className=" w-full">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">📅 Events</h2>

      {loading ? (
        <div className="flex justify-center mt-4">
          <LoadingSpinner /> {/* Display the spinner */}
        </div>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events available.</p>
      ) : (
        <div className="overflow-y-auto max-h-[240px] pr-1 custom-scrollbar-x">
          <ul className="space-y-3">
            {events.map((event) => {
              const isExpanded = expandedEventId === event._id;
              return (
                <li
                  key={event._id}
                  className="bg-gray-200 hover:bg-gray/30 p-3 rounded-lg border border-gray-300 shadow-sm hover:shadow-lg transition duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">{event.title}</h3>
                      <p className="text-xs text-gray-500">
                        {hasMounted ? new Date(event.date).toLocaleDateString() : ""} • {event.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setExpandedEventId(isExpanded ? null : event._id)}
                      className="text-xs text-red-500 font-semibold hover:underline"
                    >
                      {isExpanded ? "Hide" : "View"}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                      <p>{event.description}</p>
                      <p className="text-xs text-gray-500">
                        🏷️ {event.eventType} | 👤 {event.organizer}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
