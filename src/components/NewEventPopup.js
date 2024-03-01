import React, { useState } from "react";
import "./css/NewEventPopupStyles.css";

function NewEventPopup({ onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const formattedTime = new Date(`2000-01-01T${time}`)
        .toISOString()
        .substr(11, 5);

      const response = await fetch("/api/v1/events", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: {
            title,
            date: formattedDate,
            time: formattedTime,
            location,
            description,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
      console.log("Event created successfully");
      onClose();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
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
          <h2>Create New Event</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit">Create Event</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEventPopup;
