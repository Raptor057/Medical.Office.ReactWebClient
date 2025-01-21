import React, { useEffect, useState } from "react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Button } from "@material-tailwind/react";
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
      <motion.div layout className="grid grid-cols-7 gap-4">
        {blankDays.map((_, index) => (
          <div key={index} className="h-20"></div>
        ))}
        {noOfDays.map((date) => {
          const currentDay = new Date(year, month, date);
          const dayAppointments = getAppointmentsForDay(currentDay);

          return (
            <motion.div
              key={date}
              whileHover={{ scale: 1.05 }}
              className="h-20 border rounded-lg p-2 bg-white cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => handleDayClick(currentDay)}
            >
              <div className="font-bold text-center">{date}</div>
              {dayAppointments.length > 0 && (
                <div
                  className={`mt-2 p-1 rounded text-sm text-center text-white ${
                    dayAppointments.some((a) => a.appointmentStatus === "Activa")
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {dayAppointments.length} cita(s)
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
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
      <motion.div layout className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handlePreviousMonth} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            &lt;
          </Button>
          <Typography variant="h4" className="font-bold">
            {MONTH_NAMES[month]} {year}
          </Typography>
          <Button onClick={handleNextMonth} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            &gt;
          </Button>
        </div>
        <div className="grid grid-cols-7 text-center text-gray-600 font-medium">
          {DAYS.map((day) => (
            <div key={day} className="uppercase p-2">
              {day}
            </div>
          ))}
        </div>
        {renderMonthDays()}
      </motion.div>

      {modalOpen && (
        <Dialog open={modalOpen} handler={() => setModalOpen(false)} size="lg">
          <DialogHeader>Detalles de las citas</DialogHeader>
          <DialogBody>
            {selectedDayAppointments.map((appointment, idx) => (
              <div key={idx} className="mb-4">
                <Typography variant="h6" color="blue-gray">
                  {appointment.reasonForVisit}
                </Typography>
                <Typography>
                  <strong>Paciente:</strong> {appointment.patientName || "Desconocido"}
                </Typography>
                <Typography>
                  <strong>Doctor:</strong> {appointment.doctorName || "Desconocido"}
                </Typography>
                <Typography>
                  <strong>Fecha:</strong> {new Date(appointment.appointmentDateTime).toLocaleString("es-MX")}
                </Typography>
                <Typography>
                  <strong>Estado:</strong> {appointment.appointmentStatus}
                </Typography>
                <Typography>
                  <strong>Notas:</strong> {appointment.notes || "Sin notas"}
                </Typography>
              </div>
            ))}
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setModalOpen(false)} color="red">
              Cerrar
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}
