'use client';

import React, { useEffect, useState } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import { motion } from "framer-motion";

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
    const fetchAppointments = async () => {
      try {
        const response = await MedicalOfficeWebApi.getMedicalAppointmentCalendar(0, 0);
        setAppointments(response?.calendar || []);
      } catch (err) {
        console.error("Error al obtener las citas:", err);
      }
    };
    fetchAppointments();
  }, [month, year]);

  const getAppointmentsForDay = (date) => {
    return appointments.filter(
      (a) =>
        new Date(a.appointmentDateTime).toDateString() ===
        new Date(date).toDateString()
    );
  };

  const handleDayClick = (date) => {
    setSelectedDayAppointments(getAppointmentsForDay(date));
    setModalOpen(true);
  };

  const renderMonthDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));

    return (
      <motion.div layout className="grid grid-cols-7 gap-2 mt-2">
        {blanks.map((_, i) => <div key={`blank-${i}`} className="h-24" />)}
        {days.map((day) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = new Date().toDateString() === day.toDateString();

          return (
            <motion.div
              key={day.toISOString()}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleDayClick(day)}
              className={`p-2 h-24 rounded-lg shadow-sm transition cursor-pointer border border-gray-200 flex flex-col justify-between ${
                isToday ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-100'
              }`}
            >
              <span className="text-sm font-bold text-gray-700">{day.getDate()}</span>
              {dayAppointments.length > 0 && (
                <span className={`text-xs font-medium text-center py-1 rounded ${
                  dayAppointments.some(a => a.appointmentStatus === "Activa")
                    ? "bg-green-500 text-white"
                    : "bg-red-400 text-white"
                }`}>
                  {dayAppointments.length} cita(s)
                </span>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    );
  };

  const handleMonthChange = (direction) => {
    setMonth((prev) => {
      const newMonth = direction === "prev" ? prev - 1 : prev + 1;
      if (newMonth < 0) {
        setYear(year - 1);
        return 11;
      }
      if (newMonth > 11) {
        setYear(year + 1);
        return 0;
      }
      return newMonth;
    });
  };

  return (
    <div className="w-full py-6 bg-gray-100">
      <div className="max-w-6xl p-4 mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Button onClick={() => handleMonthChange("prev")} variant="outlined">
            &lt;
          </Button>
          <Typography variant="h5" className="font-semibold text-blue-gray-800">
            {MONTH_NAMES[month]} {year}
          </Typography>
          <Button onClick={() => handleMonthChange("next")} variant="outlined">
            &gt;
          </Button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 pb-2 font-medium text-center text-gray-600 border-b">
          {DAYS.map((day) => (
            <div key={day} className="uppercase">{day}</div>
          ))}
        </div>

        {/* Days */}
        {renderMonthDays()}

        {/* Modal */}
        {modalOpen && (
          <Dialog open={modalOpen} handler={() => setModalOpen(false)} size="lg">
            <DialogHeader>Citas del día</DialogHeader>
            <DialogBody divider>
              {selectedDayAppointments.length === 0 ? (
                <Typography>No hay citas para este día.</Typography>
              ) : (
                selectedDayAppointments.map((appt, idx) => (
                  <div key={idx} className="mb-4 space-y-1">
                    <Typography variant="h6">{appt.reasonForVisit}</Typography>
                    <Typography><strong>Paciente:</strong> {appt.patientName}</Typography>
                    <Typography><strong>Doctor:</strong> {appt.doctorName}</Typography>
                    <Typography><strong>Fecha:</strong> {new Date(appt.appointmentDateTime).toLocaleString("es-MX")}</Typography>
                    <Typography><strong>Estado:</strong> {appt.appointmentStatus}</Typography>
                    <Typography><strong>Notas:</strong> {appt.notes || "Sin notas"}</Typography>
                  </div>
                ))
              )}
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setModalOpen(false)} color="red">Cerrar</Button>
            </DialogFooter>
          </Dialog>
        )}
      </div>
    </div>
  );
}
