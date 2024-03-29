import React, { useState } from "react";
import "./css/CalendarPageStyles.css";
import Calendar from "./Calendar";
import NewEventPopup from "./NewEventPopup";
import { useCookies } from 'react-cookie';

function CalendarPage() {
  const [showNewEventPopup, setShowNewEventPopup] = useState(false);
  const [cookies] = useCookies();

  // Function to get greeting based on the time of the day
  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning!";
    } else if (currentTime < 18) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  };

  // Function to handle logout/sign out
  const handleLogout = async () => {
    try {
      const response = await fetch(`/users/sign_out`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "X-CSRF-TOKEN": cookies["CSRF-TOKEN"], 
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Redirect to the login page
      window.location.href = "/login"; // Forcing full page reload to clear state
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error
    }
  };

  // Function to handle creating a new event
  const handleNewEvent = () => {
    setShowNewEventPopup(true);
  };

  // Function to handle submitting new event data
  const handleSubmitNewEvent = (newEventData) => {
    // Handle submitting new event data here
    console.log("New event data:", newEventData);
  };

  // Function to close the new event popup
  const handleCloseNewEventPopup = () => {
    setShowNewEventPopup(false);
  };

  return (
    <div className="calendar-page">
      {/* Header */}
      <div className="header">
        <div className="greeting">{getGreeting()}</div>
        <div className="buttons">
          <button onClick={handleNewEvent}>New Event</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Calendar display area */}
      <div className="calendar">
        {/* Calendar component will go here */}
        <Calendar />
      </div>

      {/* New Event Popup */}
      {showNewEventPopup && (
        <NewEventPopup
          onClose={handleCloseNewEventPopup}
          onSubmit={handleSubmitNewEvent}
        />
      )}
    </div>
  );
}

export default CalendarPage;
