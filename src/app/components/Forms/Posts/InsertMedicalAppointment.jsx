"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertMedicalAppointment() {
  const searchParams = useSearchParams();
  const patientId = parseInt(searchParams.get("id")) || 0;

  const [formData, setFormData] = useState({
    idPatient: patientId,
    idDoctor: "", // Valor inicial válido para Select
    appointmentDateTime: "",
    reasonForVisit: "",
    appointmentStatus: "Activa",
    typeOfAppointment: "", // Valor inicial válido para Select
    notes: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [typeOfAppointments, setTypeOfAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsData = await MedicalOfficeWebApi.getDoctors(0);
        setDoctors(doctorsData?.doctors || []);

        const configData = await MedicalOfficeWebApi.getAllConfigurations();
        const appointmentTypes =
          configData.allConfigurations?.typeOfAppointments || [];
        setTypeOfAppointments(appointmentTypes);
      } catch (err) {
        setError(err?.message || "Error al cargar datos");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDoctorChange = (value) => {
    setFormData({
      ...formData,
      idDoctor: value || "", // Aseguramos que siempre haya un valor válido
    });
  };

  const handleAppointmentTypeChange = (value) => {
    setFormData({
      ...formData,
      typeOfAppointment: value || "", // Aseguramos que siempre haya un valor válido
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.insertMedicalAppointmentCalendar(formData);
      setSuccess(true);
      setFormData({
        idPatient: patientId,
        idDoctor: "",
        appointmentDateTime: "",
        reasonForVisit: "",
        appointmentStatus: "Activa",
        typeOfAppointment: "",
        notes: "",
      });
    } catch (err) {
      setError(err?.message || "Error al agendar la cita médica.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-white shadow-md rounded-lg max-w-xl mx-auto">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Agendar Cita Médica
      </Typography>

      {error && <Typography color="red">{error}</Typography>}
      {success && (
        <Typography color="green">¡Cita médica agendada con éxito!</Typography>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Typography variant="small">Doctor</Typography>
          <Select
            value={formData.idDoctor || ""}
            onChange={(value) => handleDoctorChange(value)}
            required
          >
            <Option value="">Seleccione un doctor</Option>
            {doctors.map((doctor) => (
              <Option key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName} - {doctor.specialty}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <Typography variant="small">Fecha y Hora</Typography>
          <Input
            type="datetime-local"
            name="appointmentDateTime"
            value={formData.appointmentDateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Typography variant="small">Razón de la Visita</Typography>
          <Input
            type="text"
            name="reasonForVisit"
            value={formData.reasonForVisit}
            onChange={handleChange}
            placeholder="Ingrese la razón de la visita"
            required
          />
        </div>

        <div>
          <Typography variant="small">Tipo de Cita</Typography>
          <Select
            value={formData.typeOfAppointment || ""}
            onChange={(value) => handleAppointmentTypeChange(value)}
            required
          >
            <Option value="">Seleccione el tipo de cita</Option>
            {typeOfAppointments.map((type) => (
              <Option key={type.id} value={type.nameTypeOfAppointment}>
                {type.nameTypeOfAppointment}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <Typography variant="small">Notas</Typography>
          <Input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notas adicionales"
          />
        </div>

        <Button type="submit" color="blue" fullWidth disabled={loading}>
          {loading ? "Guardando..." : "Agendar Cita"}
        </Button>
      </form>
    </Card>
  );
}
