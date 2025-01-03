'use client';

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Input,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function ScheduleAppointment({ open, onClose, patientId }) {
  const [appointmentData, setAppointmentData] = useState({
    idPatient: patientId,
    idDoctor: "",
    appointmentDateTime: "",
    reasonForVisit: "",
    notes: "",
    typeOfAppointment: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAppointmentData((prev) => ({ ...prev, idPatient: patientId }));
  }, [patientId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorResponse = await MedicalOfficeWebApi.getDoctors(0);
        const configResponse = await MedicalOfficeWebApi.getAllConfigurations();

        setDoctors(doctorResponse?.doctors || []);
        setAppointmentTypes(
          configResponse?.allConfigurations?.typeOfAppointments || []
        );
      } catch (err) {
        console.error("Error al obtener doctores o configuraciones:", err);
        setError("Error al cargar la información necesaria.");
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAppointment = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.scheduleAppointment(appointmentData);
      setSuccess(true);
      setTimeout(() => {
        onClose(); // Cerrar el modal automáticamente después de 2 segundos
        setSuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Error al agendar la cita:", err);
      setError("Error al guardar la cita. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} handler={onClose} size="lg">
      <DialogHeader>
        <Typography variant="h4" color="blue-gray">
          Agendar Cita
        </Typography>
      </DialogHeader>
      <DialogBody>
        <form className="space-y-4">
          <div>
            <Typography variant="small" className="mb-2">
              Doctor
            </Typography>
            <Select
              value={appointmentData.idDoctor}
              onChange={(value) => handleSelectChange("idDoctor", value)}
              required
            >
              {doctors.map((doctor) => (
                <Option key={doctor.id} value={doctor.id}>
                  {doctor.firstName} {doctor.lastName}
                </Option>
              ))}
            </Select>
          </div>
          <Input
            type="datetime-local"
            label="Fecha y Hora"
            name="appointmentDateTime"
            value={appointmentData.appointmentDateTime}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Razón de la Cita"
            name="reasonForVisit"
            value={appointmentData.reasonForVisit}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Notas"
            name="notes"
            value={appointmentData.notes}
            onChange={handleInputChange}
          />
          <div>
            <Typography variant="small" className="mb-2">
              Tipo de Cita
            </Typography>
            <Select
              value={appointmentData.typeOfAppointment}
              onChange={(value) =>
                handleSelectChange("typeOfAppointment", value)
              }
              required
            >
              {appointmentTypes.map((type) => (
                <Option key={type.id} value={type.nameTypeOfAppointment}>
                  {type.nameTypeOfAppointment}
                </Option>
              ))}
            </Select>
          </div>
        </form>
        {success && (
          <Alert color="green" className="mt-4">
            ¡Cita guardada con éxito!
          </Alert>
        )}
        {error && (
          <Alert color="red" className="mt-4">
            {error}
          </Alert>
        )}
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          color="blue"
          onClick={handleSaveAppointment}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cita"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
