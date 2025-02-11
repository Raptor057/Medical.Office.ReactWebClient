'use client';

import React from "react";

const GoogleCalendar = () => {
  const calendarId = "84c3f9e81d3f2b18946215f08e6913f5031db45f21b23e4583f42798a1e787ac@group.calendar.google.com";
  const timeZone = "America/Matamoros";
  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=${encodeURIComponent(timeZone)}`;

  return (
    <div className="calendar-container">
      <iframe
        src={calendarUrl}
        style={{ border: 0, width: "100%", height: "600px" }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default GoogleCalendar;
