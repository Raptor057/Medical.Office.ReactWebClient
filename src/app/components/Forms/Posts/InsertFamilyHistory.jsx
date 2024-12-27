import React, { useState, useEffect } from "react";
import { Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook de Next.js para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Importa la instancia de API

export default function InsertFamilyHistoryForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    diabetes: false,
    cardiopathies: false,
    hypertension: false,
    thyroidDiseases: false,
    chronicKidneyDisease: false,
    others: false,
    othersData: "",
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
      await MedicalOfficeWebApi.insertFamilyHistory(formData);
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
        Historial Familiar
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa los antecedentes médicos familiares del paciente.
      </Typography>

      {/* Opciones del historial familiar */}
      <div className="space-y-4">
        <Checkbox
          label="Diabetes"
          name="diabetes"
          checked={formData.diabetes}
          onChange={handleChange}
        />
        <Checkbox
          label="Cardiopatías"
          name="cardiopathies"
          checked={formData.cardiopathies}
          onChange={handleChange}
        />
        <Checkbox
          label="Hipertensión"
          name="hypertension"
          checked={formData.hypertension}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedades de Tiroides"
          name="thyroidDiseases"
          checked={formData.thyroidDiseases}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedad Renal Crónica"
          name="chronicKidneyDisease"
          checked={formData.chronicKidneyDisease}
          onChange={handleChange}
        />
        <Checkbox
          label="Otras"
          name="others"
          checked={formData.others}
          onChange={handleChange}
        />
        {formData.others && (
          <Textarea
            label="Detalles adicionales"
            name="othersData"
            value={formData.othersData}
            onChange={handleChange}
            placeholder="Escribe aquí otros antecedentes familiares..."
          />
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Guardar Historial"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Historial guardado con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
