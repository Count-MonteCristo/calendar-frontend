// EventDetailsPopup.js
import React from "react";
import "./css/EventDetailsPopupStyles.css";

function EventDetailsPopup({ event, onClose }) {
  const handleEdit = () => {
    // Handle edit event logic here
  };

  const handleDelete = () => {
    // Handle delete event logic here
  };

  return (
    <div className="event-details-popup">
      <div
        className="overlay"
        onClick={onClose}
      ></div>
      <div className="popup-inner">
        <div className="popup-cancel-button">
          <button
            className="close-btn"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <h2>Event Details</h2>
        <div>
          <p>Title: {event.title}</p>
          <p>Date: {event.date}</p>
          <p>Description: {event.description}</p>
        </div>
        <div className="popup-buttons">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPopup;
