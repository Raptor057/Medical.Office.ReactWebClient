'use client';

import React, { useState, useEffect } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function CalendarWeekView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await MedicalOfficeWebApi.getMedicalAppointmentCalendar(0, 0);
        setAppointments(response?.calendar || []);
      } catch (err) {
        console.error("Error al obtener las citas:", err);
      }
    };
    fetchAppointments();
  }, [currentDate]);

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const getAppointmentsForDay = (date) =>
    appointments.filter(
      (a) => new Date(a.appointmentDateTime).toDateString() === new Date(date).toDateString()
    );

  const renderWeekView = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => new Date(startOfWeek.setDate(startOfWeek.getDate() + (i === 0 ? 0 : 1))));

    return (
      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-7">
        {days.map((day, i) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg shadow-md transition cursor-pointer border border-gray-200 flex flex-col justify-between bg-white hover:bg-gray-50 ${
                isToday ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => dayAppointments.length > 0 && setSelectedAppointment(dayAppointments[0])}
            >
              <Typography className="font-semibold text-center text-blue-gray-800">
                {DAYS[day.getDay()]} {day.getDate()}
              </Typography>
              <div className="mt-2 space-y-1">
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appt, idx) => (
                    <div
                      key={idx}
                      className={`p-1 rounded text-xs text-center font-medium text-white ${
                        appt.appointmentStatus === "Activa" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {appt.reasonForVisit}
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-center text-gray-400">Sin citas</div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
  };

  return (
    <div className="w-full px-4 py-6 bg-gray-100">
      <div className="max-w-6xl p-4 mx-auto bg-white rounded-lg shadow-lg">
        <motion.div layout className="flex flex-col items-center justify-between gap-4 mb-4 sm:flex-row">
          <Button onClick={() => changeWeek(-1)} variant="outlined">
            Semana Anterior
          </Button>
          <Typography variant="h5" className="font-bold text-center text-blue-gray-800">
            Semana de {new Date(getStartOfWeek(currentDate)).toLocaleDateString("es-MX")}
          </Typography>
          <Button onClick={() => changeWeek(1)} variant="outlined">
            Semana Siguiente
          </Button>
        </motion.div>

        {renderWeekView()}

        {selectedAppointment && (
          <Dialog open={!!selectedAppointment} handler={() => setSelectedAppointment(null)} size="lg">
            <DialogHeader>
              <Typography variant="h4">Detalles de la Cita</Typography>
            </DialogHeader>
            <DialogBody divider>
              <Typography variant="h6">
                <strong>Razón:</strong> {selectedAppointment.reasonForVisit}
              </Typography>
              <Typography>
                <strong>Paciente:</strong> {selectedAppointment.patientName || "Desconocido"}
              </Typography>
              <Typography>
                <strong>Doctor:</strong> {selectedAppointment.doctorName || "Desconocido"}
              </Typography>
              <Typography>
                <strong>Fecha y Hora:</strong> {new Date(selectedAppointment.appointmentDateTime).toLocaleString("es-MX")}
              </Typography>
              <Typography>
                <strong>Estado:</strong> {selectedAppointment.appointmentStatus}
              </Typography>
              <Typography>
                <strong>Notas:</strong> {selectedAppointment.notes || "Sin notas"}
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
    </div>
  );
}
