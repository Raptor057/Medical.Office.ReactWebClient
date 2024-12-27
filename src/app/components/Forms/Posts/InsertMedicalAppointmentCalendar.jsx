import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertMedicalAppointmentCalendarForm({ patientId, doctorId }) {
  const [formData, setFormData] = useState({
    idPatient: patientId || 0,
    idDoctor: doctorId || 0,
    appointmentDateTime: "",
    reasonForVisit: "",
    appointmentStatus: "",
    notes: "",
    typeOfAppointment: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint
      await MedicalOfficeWebApi.insertMedicalAppointmentCalendar(formData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Cita Médica
      </Typography>

      {/* Fecha y hora de la cita */}
      <Input
        type="datetime-local"
        label="Fecha y Hora de la Cita"
        name="appointmentDateTime"
        value={formData.appointmentDateTime}
        onChange={handleChange}
        required
      />

      {/* Razón de la visita */}
      <Input
        type="text"
        label="Razón de la Visita"
        name="reasonForVisit"
        value={formData.reasonForVisit}
        onChange={handleChange}
        required
      />

      {/* Estado de la cita */}
      <Input
        type="text"
        label="Estado de la Cita"
        name="appointmentStatus"
        value={formData.appointmentStatus}
        onChange={handleChange}
        placeholder="Ejemplo: Confirmada, Pendiente, Cancelada"
        required
      />

      {/* Tipo de cita */}
      <Input
        type="text"
        label="Tipo de Cita"
        name="typeOfAppointment"
        value={formData.typeOfAppointment}
        onChange={handleChange}
        placeholder="Ejemplo: Presencial, Virtual"
        required
      />

      {/* Notas */}
      <Textarea
        label="Notas Adicionales"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Escribe aquí notas adicionales sobre la cita..."
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Cita"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Cita registrada con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
