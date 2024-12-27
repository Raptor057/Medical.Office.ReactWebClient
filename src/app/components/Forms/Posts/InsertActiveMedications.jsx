import React, { useState, useEffect } from "react";
import { Textarea, Button, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Importa la instancia de API

export default function InsertActiveMedicationsForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    activeMedicationsData: "", // Campo para las medicaciones activas
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Actualiza `idPatient` en el estado cuando cambia el valor de `patientId`
  useEffect(() => {
    setFormData((prev) => ({ ...prev, idPatient: patientId }));
  }, [patientId]);

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
      await MedicalOfficeWebApi.insertActiveMedications(formData);
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
        Medicamentos Activos
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Registra los medicamentos activos del paciente.
      </Typography>

      {/* Campo de texto para medicamentos activos */}
      <Textarea
        label="Medicamentos Activos"
        name="activeMedicationsData"
        value={formData.activeMedicationsData}
        onChange={handleChange}
        placeholder="Escribe aquí los medicamentos activos..."
        required
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Guardar Medicamentos"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Medicamentos guardados con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
