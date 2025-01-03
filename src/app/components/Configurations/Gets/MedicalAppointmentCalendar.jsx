'use client';

import React, { useState, useEffect } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";


const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function MedicalAppointmentCalendar() {
  const [viewMode, setViewMode] = useState("month"); // month, week, day
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, [month, year, currentDate]);

  const fetchAppointments = async () => {
    try {
      const response = await MedicalOfficeWebApi.getMedicalAppointmentCalendar(0, 0);
      setAppointments(response?.calendar || []);
    } catch (err) {
      console.error("Error al obtener las citas:", err);
    }
  };

  const renderAppointmentsForDay = (date) => 
    appointments.filter((appointment) =>
      new Date(appointment.appointmentDateTime).toDateString() ===
      new Date(date).toDateString()
    );

  const renderMonthView = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const blankDays = Array.from({ length: firstDayOfMonth });
    const noOfDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="grid grid-cols-7 border-t">
        {blankDays.map((_, index) => (
          <div key={index} className="p-4"></div>
        ))}
        {noOfDays.map((date) => {
          const currentDay = new Date(year, month, date);
          const hasAppointments = renderAppointmentsForDay(currentDay).length > 0;
          return (
            <div
              key={date}
              className={`p-4 border cursor-pointer ${
                hasAppointments ? "bg-blue-200" : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentDate(currentDay)}
            >
              <div className="text-center font-bold">{date}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    return (
      <div className="grid grid-cols-7 border-t overflow-y-auto h-60">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = new Date(startOfWeek);
          date.setDate(date.getDate() + i);
          const dayAppointments = renderAppointmentsForDay(date);
          return (
            <div key={i} className="p-4 border">
              <div className="text-center font-bold mb-2">
                {DAYS[date.getDay()]} {date.getDate()}
              </div>
              <div className="space-y-2">
                {dayAppointments.map((appointment, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-blue-100 rounded text-sm"
                  >
                    {appointment.reasonForVisit} - {appointment.patientName}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const dayAppointments = renderAppointmentsForDay(currentDate);

    return (
      <div className="relative h-96 overflow-y-auto border">
        {hours.map((hour, idx) => (
          <div key={idx} className="border-b p-2 relative">
            <div className="text-xs">{hour}</div>
            {dayAppointments.map((appointment, index) => {
              const appointmentStart = new Date(appointment.appointmentDateTime).getHours();
              const appointmentEnd = new Date(appointment.endOfAppointmentDateTime).getHours();
              if (idx === appointmentStart) {
                const duration = appointmentEnd - appointmentStart;
                return (
                  <div
                    key={index}
                    className={`absolute left-0 right-0 p-2 bg-blue-200 rounded text-xs`}
                    style={{ top: 0, height: `${duration * 60}px` }}
                  >
                    {appointment.reasonForVisit} ({appointment.patientName})
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between p-4">
          <div>
            <h2 className="text-xl font-bold">
              {MONTH_NAMES[month]} {year}
            </h2>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => setViewMode("month")}
              className={`p-2 rounded ${viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Mes
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`p-2 rounded ${viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Semana
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`p-2 rounded ${viewMode === "day" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Día
            </button>
          </div>
        </div>
        {viewMode === "month" && renderMonthView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "day" && renderDayView()}
      </div>
    </div>
  );
}
