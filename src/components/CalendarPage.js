import React, { useState, useEffect } from "react";

function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend when the component mounts
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://your-api-url/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`http://your-api-url/events/${eventId}`, {
        method: "DELETE",
      });
      // Remove the deleted event from the state
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Calendar</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {event.date}
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarPage;
