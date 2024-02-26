import React, { useState, useEffect } from "react";
import "./css/CalendarStyles.css";
import EventDetailsPopup from "./EventDetailsPopup";

function Calendar() {
  // Initial state for the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State to store fetched events
  const [events, setEvents] = useState([]);

  // Function to fetch events from the API
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/events", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      console.log("Data fetched successfully");

      const data = await response.json();
      console.log(data);

      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []); // Re-run whenever events state changes

  // Function to get the number of days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get the name of the month
  const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };

  // Function to get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Function to handle switching to the previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  // Function to handle switching to the next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // Render calendar grid
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfMonth(year, month);

    // Calculate the number of rows needed based on the number of days and starting day of the month
    const numRows = Math.ceil((daysInMonth + firstDayOfWeek) / 7);

    // Create an array of days in the month
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    // Filter events for the current month
    const eventsInMonth = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getUTCFullYear() === year && eventDate.getUTCMonth() === month
      );
    });

    // Group events by day
    const eventsByDay = {};
    eventsInMonth.forEach((event) => {
      const eventDate = new Date(event.date);
      const dayOfMonth = eventDate.getUTCDate();
      if (!eventsByDay[dayOfMonth]) {
        eventsByDay[dayOfMonth] = [];
      }
      eventsByDay[dayOfMonth].push(event);
    });

    // Create an array of cells for the calendar grid
    const cells = [];
    let dayCounter = 1;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(
        <td
          key={`empty-${i}`}
          className="empty-cell"
        ></td>
      );
    }

    // Add cells for the days in the month
    for (let day of days) {
      const dayEvents = eventsByDay[day] || [];
      const handleEventClick = (event) => {
        setSelectedEvent(event);
      };

      cells.push(
        <td
          key={day}
          className={`calendar-cell ${dayEvents.length ? "has-event" : ""}`}
          onClick={() => handleEventClick(dayEvents[0])}
        >
          {day}
          {dayEvents.map((event, index) => (
            <div
              key={index}
              className="event"
            >
              {event.title}
            </div>
          ))}
        </td>
      );
      dayCounter++;
    }

    // Add empty cells for days after the last day of the month to complete the grid
    while (dayCounter <= numRows * 7) {
      cells.push(
        <td
          key={`empty-${dayCounter}`}
          className="empty-cell"
        ></td>
      );
      dayCounter++;
    }

    // Group cells into rows
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(<tr key={i}>{cells.slice(i * 7, (i + 1) * 7)}</tr>);
    }

    return rows;
  };

  return (
    <div className="calendar-container">
      {/* Calendar navigation */}
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous Month</button>
        <h2>
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>

      {/* Calendar grid */}
      <table className="calendar-table">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>

      {/* Button to return to the current day */}
      <button onClick={() => setCurrentDate(new Date())}>Today</button>

      {/* Event details popup */}
      {selectedEvent && (
        <EventDetailsPopup
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default Calendar;
