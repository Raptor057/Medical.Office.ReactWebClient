import React, { useState } from "react";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertMedicalHistoryNotesForm({ patientId }) {
  const [formData, setFormData] = useState({
    idPatient: patientId || 0,
    medicalHistoryNotesData: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Manejo de cambios en el campo del formulario
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
      await MedicalOfficeWebApi.insertMedicalHistoryNotes(formData);
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
        Registrar Notas del Historial Médico
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Agrega notas relevantes al historial médico del paciente.
      </Typography>

      {/* Campo de texto para las notas del historial médico */}
      <Textarea
        label="Notas del Historial Médico"
        name="medicalHistoryNotesData"
        value={formData.medicalHistoryNotesData}
        onChange={handleChange}
        placeholder="Escribe aquí las notas del historial médico..."
        required
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Guardar Notas"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Notas guardadas con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
