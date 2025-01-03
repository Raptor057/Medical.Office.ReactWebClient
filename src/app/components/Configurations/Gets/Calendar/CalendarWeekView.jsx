'use client';

import React, { useState, useEffect } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function CalendarWeekView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      const response = await MedicalOfficeWebApi.getMedicalAppointmentCalendar(0, 0);
      setAppointments(response?.calendar || []);
    } catch (err) {
      console.error("Error al obtener las citas:", err);
    }
  };

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    return startOfWeek;
  };

  const renderAppointmentsForDay = (date) =>
    appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDateTime).toDateString() ===
        new Date(date).toDateString()
    );

  const renderWeekView = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      return day;
    });

    return (
      <div className="grid grid-cols-7 border-t">
        {daysOfWeek.map((day, index) => {
          const dayAppointments = renderAppointmentsForDay(day);
          return (
            <div key={index} className="p-4 border">
              <div className="text-center font-bold mb-2">
                {DAYS[day.getDay()]} {day.getDate()}
              </div>
              <div className="space-y-2">
                {dayAppointments.map((appointment, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded text-sm cursor-pointer ${
                      appointment.appointmentStatus === "Activa"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                    onClick={() => setSelectedAppointment(appointment)}
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

  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePreviousWeek}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Semana Anterior
        </button>
        <Typography variant="h5" color="blue-gray" className="font-bold">
          Semana de {new Date(getStartOfWeek(currentDate)).toLocaleDateString("es-MX")}
        </Typography>
        <button
          onClick={handleNextWeek}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Semana Siguiente
        </button>
      </div>
      {renderWeekView()}

      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} handler={() => setSelectedAppointment(null)} size="lg">
          <DialogHeader>
            <Typography variant="h4" color="blue-gray">
              Detalles de la Cita
            </Typography>
          </DialogHeader>
          <DialogBody>
            <Typography variant="h6">
              <strong>Razón:</strong> {selectedAppointment.reasonForVisit}
            </Typography>
            <Typography>
              <strong>Paciente:</strong> {selectedAppointment.patientName}
            </Typography>
            <Typography>
              <strong>Doctor:</strong> {selectedAppointment.doctorName}
            </Typography>
            <Typography>
              <strong>Fecha y Hora:</strong> {new Date(selectedAppointment.appointmentDateTime).toLocaleString("es-MX")}
            </Typography>
            <Typography>
              <strong>Estado:</strong> {selectedAppointment.appointmentStatus}
            </Typography>
            <Typography>
              <strong>Notas:</strong> {selectedAppointment.notes || "N/A"}
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button color="blue" onClick={() => setSelectedAppointment(null)}>
              Cerrar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
