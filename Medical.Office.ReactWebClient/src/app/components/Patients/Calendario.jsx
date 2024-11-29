import React, { useState, useEffect } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTheme, setEventTheme] = useState("");

  const themes = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ];

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, [month, year]);

  const initDate = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blankDaysCount = new Date(year, month, 1).getDay();

    setBlankDays(Array.from({ length: blankDaysCount }));
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
    const newEvent = {
      event_title: eventTitle,
      event_date: eventDate,
      event_theme: eventTheme,
    };
    setEvents([...events, newEvent]);
    setOpenEventModal(false);
  };

  return (
    <div className="h-screen antialiased bg-gray-100 sans-serif">
      <div className="container px-4 py-2 mx-auto md:py-24">
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <div className="flex items-center justify-between px-6 py-2">
            <div>
              <span className="text-lg font-bold text-gray-800">
                {MONTH_NAMES[month]}
              </span>
              <span className="ml-1 text-lg font-normal text-gray-600">
                {year}
              </span>
            </div>
            <div className="px-1 border rounded-lg" style={{ paddingTop: "2px" }}>
              <button
                type="button"
                className="inline-flex items-center p-1 leading-none transition duration-100 ease-in-out rounded-lg cursor-pointer hover:bg-gray-200"
                disabled={month === 0}
                onClick={() => {
                  if (month > 0) setMonth(month - 1);
                }}
              >
                <svg
                  className="inline-flex w-6 h-6 leading-none text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="inline-flex h-6 border-r"></div>
              <button
                type="button"
                className="inline-flex items-center p-1 leading-none transition duration-100 ease-in-out rounded-lg cursor-pointer hover:bg-gray-200"
                disabled={month === 11}
                onClick={() => {
                  if (month < 11) setMonth(month + 1);
                }}
              >
                <svg
                  className="inline-flex w-6 h-6 leading-none text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="-mx-1 -mb-1">
            <div className="flex flex-wrap" style={{ marginBottom: "-40px" }}>
              {DAYS.map((day, index) => (
                <div
                  key={index}
                  style={{ width: "14.26%" }}
                  className="px-2 py-2"
                >
                  <div className="text-sm font-bold tracking-wide text-center text-gray-600 uppercase">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap border-t border-l">
              {blankDays.map((_, index) => (
                <div
                  key={index}
                  style={{ width: "14.28%", height: "120px" }}
                  className="px-4 pt-2 text-center border-b border-r"
                ></div>
              ))}
              {noOfDays.map((date, index) => (
                <div
                  key={index}
                  style={{ width: "14.28%", height: "120px" }}
                  className="relative px-4 pt-2 border-b border-r"
                >
                  <div
                    onClick={() => {
                      setEventDate(new Date(year, month, date).toDateString());
                      setOpenEventModal(true);
                    }}
                    className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                      isToday(date)
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-blue-200"
                    }`}
                  >
                    {date}
                  </div>
                  <div style={{ height: "80px" }} className="mt-1 overflow-y-auto">
                    {events
                      .filter(
                        (e) =>
                          new Date(e.event_date).toDateString() ===
                          new Date(year, month, date).toDateString()
                      )
                      .map((event, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${
                            event.event_theme === "blue"
                              ? "border-blue-200 text-blue-800 bg-blue-100"
                              : ""
                          }`}
                        >
                          <p className="text-sm leading-tight truncate">
                            {event.event_title}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {openEventModal && (
        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
          className="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full"
        >
          <div className="absolute relative left-0 right-0 max-w-xl p-4 mx-auto mt-24 overflow-hidden">
            <div className="block w-full p-8 overflow-hidden bg-white rounded-lg shadow">
              <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">
                Add Event Details
              </h2>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold tracking-wide text-gray-800">
                  Event title
                </label>
                <input
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold tracking-wide text-gray-800">
                  Event date
                </label>
                <input
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  value={eventDate}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-bold tracking-wide text-gray-800">
                  Select a theme
                </label>
                <select
                  value={eventTheme}
                  onChange={(e) => setEventTheme(e.target.value)}
                  className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded-lg appearance-none focus:outline-none focus:bg-white focus:border-blue-500"
                >
                  {themes.map((theme, idx) => (
                    <option key={idx} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-8 text-right">
                <button
                  onClick={() => setOpenEventModal(false)}
                  className="px-4 py-2 mr-2 font-bold text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={addEvent}
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
