"use client";

import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-8 bg-gray-300 rounded-3xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event._id} className="p-4 border rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">{event.title}</h2>                   // ✅ title
                <p className="text-gray-600">{event.description}</p>                       // ✅ description
                <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()} — {event.location}          // ✅ date & location
                </p>
                <p className="text-sm text-gray-500">
                Type: {event.eventType} | Organizer: {event.organizer}                  // ✅ eventType & organizer
                </p>
            </li>
            ))}
        </ul>
      )}
    </div>
  );
}