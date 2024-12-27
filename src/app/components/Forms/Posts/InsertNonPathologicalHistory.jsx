import React, { useState } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertNonPathologicalHistoryForm({ patientId }) {
  const [formData, setFormData] = useState({
    idPatient: patientId || 0,
    physicalActivity: false,
    smoking: false,
    alcoholism: false,
    substanceAbuse: false,
    substanceAbuseData: "",
    recentVaccination: false,
    recentVaccinationData: "",
    others: false,
    othersData: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      await MedicalOfficeWebApi.insertNonPathologicalHistory(formData);
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
        Registrar Antecedentes No Patológicos
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa los antecedentes no patológicos del paciente.
      </Typography>

      {/* Campos de antecedentes no patológicos */}
      <div className="space-y-4">
        <Checkbox
          label="Actividad Física"
          name="physicalActivity"
          checked={formData.physicalActivity}
          onChange={handleChange}
        />
        <Checkbox
          label="Tabaquismo"
          name="smoking"
          checked={formData.smoking}
          onChange={handleChange}
        />
        <Checkbox
          label="Alcoholismo"
          name="alcoholism"
          checked={formData.alcoholism}
          onChange={handleChange}
        />
        <Checkbox
          label="Consumo de Sustancias"
          name="substanceAbuse"
          checked={formData.substanceAbuse}
          onChange={handleChange}
        />
        {formData.substanceAbuse && (
          <Textarea
            label="Detalles del Consumo de Sustancias"
            name="substanceAbuseData"
            value={formData.substanceAbuseData}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles del consumo de sustancias..."
          />
        )}
        <Checkbox
          label="Vacunación Reciente"
          name="recentVaccination"
          checked={formData.recentVaccination}
          onChange={handleChange}
        />
        {formData.recentVaccination && (
          <Textarea
            label="Detalles de la Vacunación Reciente"
            name="recentVaccinationData"
            value={formData.recentVaccinationData}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles de la vacunación reciente..."
          />
        )}
        <Checkbox
          label="Otros"
          name="others"
          checked={formData.others}
          onChange={handleChange}
        />
        {formData.others && (
          <Textarea
            label="Detalles Adicionales"
            name="othersData"
            value={formData.othersData}
            onChange={handleChange}
            placeholder="Escribe aquí otros antecedentes no patológicos..."
          />
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Guardar Antecedentes"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Antecedentes guardados con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
