'use client';

import React, { useState, useEffect } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Typography, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function CalendarDayView() {
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

  const renderAppointmentsForDay = () =>
    appointments.filter(
      (appointment) =>
        new Date(appointment.appointmentDateTime).toDateString() ===
        currentDate.toDateString()
    );

  const handlePreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Navegación del día */}
      <motion.div layout className="flex justify-between mb-4 items-center">
        <Button
          onClick={handlePreviousDay}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Día Anterior
        </Button>
        <Typography variant="h5" color="blue-gray" className="font-bold">
          {currentDate.toLocaleDateString("es-MX", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
        <Button
          onClick={handleNextDay}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Día Siguiente
        </Button>
      </motion.div>

      {/* Citas del día */}
      <motion.div layout className="p-4 border rounded-lg bg-white shadow-sm">
        {renderAppointmentsForDay().map((appointment, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-4 mb-2 rounded-lg cursor-pointer shadow-md transition-shadow ${
              appointment.appointmentStatus === "Activa" ? "bg-green-100" : "bg-red-100"
            }`}
            onClick={() => setSelectedAppointment(appointment)}
          >
            <Typography variant="h6" color="blue-gray" className="font-bold">
              {appointment.reasonForVisit}
            </Typography>
            <Typography variant="small" color="gray" className="opacity-70">
              {`${new Date(appointment.appointmentDateTime).toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${new Date(appointment.endOfAppointmentDateTime).toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </Typography>
            <Typography variant="small" color="gray">
              Paciente: {appointment.patientName || "N/A"}
            </Typography>
            <Typography variant="small" color="gray">
              Doctor: {appointment.doctorName || "N/A"}
            </Typography>
          </motion.div>
        ))}
        {renderAppointmentsForDay().length === 0 && (
          <Typography variant="small" color="gray" className="text-center">
            No hay citas para este día.
          </Typography>
        )}
      </motion.div>

      {/* Modal para detalles de la cita */}
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} handler={() => setSelectedAppointment(null)} size="lg">
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Detalles de la Cita
            </Typography>
          </DialogHeader>
          <DialogBody>
            <Typography variant="small" color="gray">
              <strong>Razón:</strong> {selectedAppointment.reasonForVisit}
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Paciente:</strong> {selectedAppointment.patientName || "N/A"}
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Doctor:</strong> {selectedAppointment.doctorName || "N/A"}
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Fecha:</strong> {new Date(selectedAppointment.appointmentDateTime).toLocaleString("es-MX")}
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Estado:</strong> {selectedAppointment.appointmentStatus}
            </Typography>
            <Typography variant="small" color="gray">
              <strong>Notas:</strong> {selectedAppointment.notes || "N/A"}
            </Typography>
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={() => setSelectedAppointment(null)}>
              Cerrar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
