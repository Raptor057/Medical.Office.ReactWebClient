'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function CalendarDayView() {
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

  const getAppointmentsForDay = () =>
    appointments.filter(
      (a) => new Date(a.appointmentDateTime).toDateString() === currentDate.toDateString()
    );

  const changeDay = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + dir);
    setCurrentDate(newDate);
  };

  const router = useRouter();

const handleStartAppointment = () => {
  if (!selectedAppointment) return;

  const { id, idPatient } = selectedAppointment;
  router.push(`/home/patients/patientprescription?id=${id}&idPatient=${idPatient}`);
};


  return (
    <div className="w-full px-4 py-6 bg-gray-100">
      <div className="max-w-3xl p-4 mx-auto bg-white rounded-lg shadow-lg">
        <motion.div layout className="flex flex-col items-center justify-between gap-4 mb-4 sm:flex-row">
          <Button onClick={() => changeDay(-1)} variant="outlined">
            Día Anterior
          </Button>
          <Typography variant="h5" className="font-bold text-center text-blue-gray-800">
            {currentDate.toLocaleDateString("es-MX", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
          <Button onClick={() => changeDay(1)} variant="outlined">
            Día Siguiente
          </Button>
        </motion.div>

        <motion.div layout className="p-4 bg-white border rounded-lg shadow-sm">
          {getAppointmentsForDay().length > 0 ? (
            getAppointmentsForDay().map((appt, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={`p-4 mb-3 rounded-lg shadow-md transition cursor-pointer border-l-4 ${
                  appt.appointmentStatus === "Activa" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
                }`}
                onClick={() => setSelectedAppointment(appt)}
              >
                <Typography variant="h6" className="font-semibold text-blue-gray-800">
                  {appt.reasonForVisit}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {new Date(appt.appointmentDateTime).toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })} - {new Date(appt.endOfAppointmentDateTime).toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Paciente: {appt.patientName || "N/A"}
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Doctor: {appt.doctorName || "N/A"}
                </Typography>
              </motion.div>
            ))
          ) : (
            <Typography variant="small" color="gray" className="text-center">
              No hay citas para este día.
            </Typography>
          )}
        </motion.div>

        {selectedAppointment && (
          <Dialog open={!!selectedAppointment} handler={() => setSelectedAppointment(null)} size="lg">
            <DialogHeader>
              <Typography variant="h5" color="blue-gray">
                Detalles de la Cita
              </Typography>
            </DialogHeader>
            <DialogBody divider>
              <Typography variant="h6">
                <strong>Razón:</strong> {selectedAppointment.reasonForVisit}
              </Typography>
              <Typography>
                <strong>Paciente:</strong> {selectedAppointment.patientName || "N/A"}
              </Typography>
              <Typography>
                <strong>Doctor:</strong> {selectedAppointment.doctorName || "N/A"}
              </Typography>
              <Typography>
                <strong>Fecha:</strong> {new Date(selectedAppointment.appointmentDateTime).toLocaleString("es-MX")}
              </Typography>
              <Typography>
                <strong>Estado:</strong> {selectedAppointment.appointmentStatus}
              </Typography>
              <Typography>
                <strong>Notas:</strong> {selectedAppointment.notes || "Sin notas"}
              </Typography>
            </DialogBody>
          <DialogFooter className="flex justify-between w-full">
            <Button color="blue" onClick={handleStartAppointment}>
              Iniciar cita
            </Button>
            <Button color="red" onClick={() => setSelectedAppointment(null)}>
              Cerrar
            </Button>
          </DialogFooter>
          </Dialog>
        )}
      </div>
    </div>
  );
}
