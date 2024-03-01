// UpdateEventPopup.js
import React, { useState, useEffect } from "react";
import "./css/NewEventPopupStyles.css";

function UpdateEventPopup({ eventId, onClose, onUpdate }) {
  const [event, setEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/v1/events/${eventId}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const eventData = await response.json();
        // Convert time format from "2000-01-01T18:39:00.000Z" to "HH:mm"
        const eventDate = new Date(eventData.time);
        const hours = eventDate.getHours().toString().padStart(2, "0");
        const minutes = eventDate.getMinutes().toString().padStart(2, "0");
        const time = `${hours}:${minutes}`;
        setEvent({ ...eventData, time });
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/events/${eventId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      console.log("Event updated successfully");
      onUpdate(); // Callback to notify parent component of update
    } catch (error) {
      console.error("Error updating event:", error);
      // Handle error
    }
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-cancel-button">
            <button
              className="close-btn"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <h2>Update Event</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={event.date}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={event.time}
                onChange={(e) => setEvent({ ...event, time: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={event.location}
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={event.description}
                onChange={(e) =>
                  setEvent({ ...event, description: e.target.value })
                }
              ></textarea>
            </div>
            <button type="submit">Update Event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateEventPopup;
