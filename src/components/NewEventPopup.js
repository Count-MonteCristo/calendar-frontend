import React, { useState } from "react";
import "./css/NewEventPopupStyles.css";

function NewEventPopup({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    // Call the onSubmit function and pass the new event data
    onSubmit({ title, date, description });
    // Close the popup
    onClose();
  };

  return (
    <div>
      {/* Overlay */}
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
              <label>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit">Create Event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEventPopup;
