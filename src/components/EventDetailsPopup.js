// EventDetailsPopup.js
import React, { useState } from "react";
import "./css/EventDetailsPopupStyles.css";
import UpdateEventPopup from "./UpdateEventPopup ";

function EventDetailsPopup({ event, onClose }) {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handleEdit = () => {
    setShowUpdatePopup(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/${event.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      console.log("Event deleted successfully");
      onClose(); // Close the popup after successful deletion
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error deleting event:", error);
      // Handle error
    }
  };

  const handleUpdate = () => {
    setShowUpdatePopup(false); // Close the UpdateEventPopup
    onClose(); // Close the EventDetailsPopup
    window.location.reload(); // Reload the page
  };

  // Function to format time to 12-hour format in user's local timezone
  const formatTime = (dateString) => {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      {!showUpdatePopup && (
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
              <p>Time: {formatTime(event.time)}</p>
              <p>Location: {event.location}</p>
              <p>Description: {event.description}</p>
            </div>
            <div className="popup-buttons">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
      {showUpdatePopup && (
        <UpdateEventPopup
          eventId={event.id}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdate} // Pass the handleUpdate callback
        />
      )}
    </>
  );
}

export default EventDetailsPopup;
