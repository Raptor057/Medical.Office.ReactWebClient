'use client';

import React, { useEffect, useState } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const MONTH_NAMES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function CalendarMonthView() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [appointments, setAppointments] = useState([]);
  const [selectedDayAppointments, setSelectedDayAppointments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [month, year]);

  const fetchAppointments = async () => {
    try {
      const response = await MedicalOfficeWebApi.getMedicalAppointmentCalendar(0, 0);
      setAppointments(response?.calendar || []);
    } catch (err) {
      console.error("Error al obtener las citas:", err);
    }
  };

  const getAppointmentsForDay = (date) => {
    return appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDateTime).toDateString() ===
        new Date(date).toDateString()
    );
  };

  const handleDayClick = (date) => {
    const dayAppointments = getAppointmentsForDay(date);
    setSelectedDayAppointments(dayAppointments);
    setModalOpen(true);
  };

  const renderMonthDays = () => {
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
          const dayAppointments = getAppointmentsForDay(currentDay);

          return (
            <div
              key={date}
              className="p-4 border cursor-pointer hover:bg-gray-100"
              onClick={() => handleDayClick(currentDay)}
            >
              <div className="text-center font-bold">{date}</div>
              {dayAppointments.length > 0 && (
                <div
                  className={`mt-2 p-1 rounded text-center text-white ${
                    dayAppointments.some((a) => a.appointmentStatus === "Activa")
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {dayAppointments.length} cita(s)
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const handlePreviousMonth = () => {
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

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
        <div className="flex justify-between p-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            &lt;
          </button>
          <h2 className="text-xl font-bold">
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            &gt;
          </button>
        </div>
        <div className="grid grid-cols-7 text-center text-gray-600">
          {DAYS.map((day) => (
            <div key={day} className="p-2 font-medium uppercase">
              {day}
            </div>
          ))}
        </div>
        {renderMonthDays()}
      </div>

      {modalOpen && (
        <Dialog open={modalOpen} handler={() => setModalOpen(false)} size="lg">
          <DialogHeader>Detalles de las citas</DialogHeader>
          <DialogBody>
            {selectedDayAppointments.map((appointment, idx) => (
              <div key={idx} className="mb-4">
                <Typography variant="h6" color="blue-gray">
                  {appointment.reasonForVisit}
                </Typography>
                <Typography variant="small" color="gray">
                  Paciente: {appointment.patientName || "Desconocido"}
                </Typography>
                <Typography variant="small" color="gray">
                  Doctor: {appointment.doctorName || "Desconocido"}
                </Typography>
                <Typography variant="small" color="gray">
                  Fecha: {new Date(appointment.appointmentDateTime).toLocaleString("es-MX")}
                </Typography>
                <Typography variant="small" color="gray">
                  Estado: {appointment.appointmentStatus}
                </Typography>
                <Typography variant="small" color="gray">
                  Notas: {appointment.notes || "Sin notas"}
                </Typography>
              </div>
            ))}
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={() => setModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
