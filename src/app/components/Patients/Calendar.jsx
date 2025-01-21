import React, { useState, useEffect } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openEventDetails, setOpenEventDetails] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    theme: "blue",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const themes = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ];

  useEffect(() => {
    calculateDays();
  }, [month, year]);

  const calculateDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    setBlankDays(Array.from({ length: firstDayOfMonth }));
    setNoOfDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      today.getDate() === date &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const addEvent = () => {
    if (!eventDetails.title) {
      alert("Event title is required.");
      return;
    }

    setEvents((prev) => [
      ...prev,
      {
        ...eventDetails,
        date: new Date(eventDetails.date).toDateString(),
      },
    ]);
    setOpenEventModal(false);
    setEventDetails({ title: "", date: "", theme: "blue" });
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const renderEvents = (date) =>
    events
      .filter(
        (event) =>
          new Date(event.date).toDateString() ===
          new Date(year, month, date).toDateString()
      )
      .map((event, idx) => (
        <div
          key={idx}
          onClick={(e) => {
            e.stopPropagation(); // Evitar propagación del clic al contenedor del día
            setSelectedEvent(event);
            setOpenEventDetails(true);
          }}
          className={`px-2 py-1 mt-1 text-sm rounded-lg cursor-pointer ${
            event.theme === "blue" ? "bg-blue-100 text-blue-800" : ""
          }`}
        >
          {event.title}
        </div>
      ));

  return (
    <div className="h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between p-4">
          <div>
            <h2 className="text-xl font-bold">
              {MONTH_NAMES[month]} {year}
            </h2>
          </div>
          <div className="space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Previous Month"
            >
              &lt;
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              aria-label="Next Month"
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-gray-600">
          {DAYS.map((day) => (
            <div key={day} className="p-2 font-medium uppercase">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-t">
          {blankDays.map((_, index) => (
            <div key={index} className="p-4"></div>
          ))}
          {noOfDays.map((date) => (
            <div
              key={date}
              className="p-4 border cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setEventDetails((prev) => ({
                  ...prev,
                  date: new Date(year, month, date).toDateString(),
                }));
                setOpenEventModal(true);
              }}
            >
              <div
                className={`inline-flex items-center justify-center w-6 h-6 mx-auto rounded-full ${
                  isToday(date)
                    ? "bg-blue-500 text-white"
                    : "text-gray-800 hover:bg-blue-200"
                }`}
              >
                {date}
              </div>
              <div>{renderEvents(date)}</div>
            </div>
          ))}
        </div>
      </div>

      {openEventModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Add Event</h3>
            <div className="mt-4">
              <label className="block text-sm font-bold">Event Title</label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded"
                value={eventDetails.title}
                onChange={(e) =>
                  setEventDetails((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold">Event Theme</label>
              <select
                className="w-full p-2 mt-1 border rounded"
                value={eventDetails.theme}
                onChange={(e) =>
                  setEventDetails((prev) => ({ ...prev, theme: e.target.value }))
                }
              >
                {themes.map((theme) => (
                  <option key={theme.value} value={theme.value}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setOpenEventModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addEvent}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openEventDetails && selectedEvent && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Event Details</h3>
            <p className="mt-2">
              <strong>Title:</strong> {selectedEvent.title}
            </p>
            <p className="mt-2">
              <strong>Date:</strong> {selectedEvent.date}
            </p>
            <p className="mt-2">
              <strong>Theme:</strong> {selectedEvent.theme}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpenEventDetails(false)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;