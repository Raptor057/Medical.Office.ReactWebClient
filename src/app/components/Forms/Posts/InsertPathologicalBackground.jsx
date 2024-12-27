import React, { useState } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertPathologicalBackgroundForm({ patientId }) {
  const [formData, setFormData] = useState({
    idPatient: patientId || 0,
    previousHospitalization: false,
    previousSurgeries: false,
    diabetes: false,
    thyroidDiseases: false,
    hypertension: false,
    cardiopathies: false,
    trauma: false,
    cancer: false,
    tuberculosis: false,
    transfusions: false,
    respiratoryDiseases: false,
    gastrointestinalDiseases: false,
    stDs: false,
    stDsData: "",
    chronicKidneyDisease: false,
    others: "",
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
      await MedicalOfficeWebApi.insertPathologicalBackground(formData);
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
        Registrar Antecedentes Patológicos
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa los antecedentes patológicos del paciente.
      </Typography>

      {/* Campos de antecedentes patológicos */}
      <div className="space-y-4">
        <Checkbox
          label="Hospitalización previa"
          name="previousHospitalization"
          checked={formData.previousHospitalization}
          onChange={handleChange}
        />
        <Checkbox
          label="Cirugías previas"
          name="previousSurgeries"
          checked={formData.previousSurgeries}
          onChange={handleChange}
        />
        <Checkbox
          label="Diabetes"
          name="diabetes"
          checked={formData.diabetes}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedades de tiroides"
          name="thyroidDiseases"
          checked={formData.thyroidDiseases}
          onChange={handleChange}
        />
        <Checkbox
          label="Hipertensión"
          name="hypertension"
          checked={formData.hypertension}
          onChange={handleChange}
        />
        <Checkbox
          label="Cardiopatías"
          name="cardiopathies"
          checked={formData.cardiopathies}
          onChange={handleChange}
        />
        <Checkbox
          label="Trauma"
          name="trauma"
          checked={formData.trauma}
          onChange={handleChange}
        />
        <Checkbox
          label="Cáncer"
          name="cancer"
          checked={formData.cancer}
          onChange={handleChange}
        />
        <Checkbox
          label="Tuberculosis"
          name="tuberculosis"
          checked={formData.tuberculosis}
          onChange={handleChange}
        />
        <Checkbox
          label="Transfusiones"
          name="transfusions"
          checked={formData.transfusions}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedades respiratorias"
          name="respiratoryDiseases"
          checked={formData.respiratoryDiseases}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedades gastrointestinales"
          name="gastrointestinalDiseases"
          checked={formData.gastrointestinalDiseases}
          onChange={handleChange}
        />
        <Checkbox
          label="ETS (Enfermedades de transmisión sexual)"
          name="stDs"
          checked={formData.stDs}
          onChange={handleChange}
        />
        {formData.stDs && (
          <Textarea
            label="Detalles de ETS"
            name="stDsData"
            value={formData.stDsData}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles de ETS..."
          />
        )}
        <Checkbox
          label="Enfermedad renal crónica"
          name="chronicKidneyDisease"
          checked={formData.chronicKidneyDisease}
          onChange={handleChange}
        />
        <Textarea
          label="Otros detalles"
          name="others"
          value={formData.others}
          onChange={handleChange}
          placeholder="Escribe aquí otros antecedentes patológicos..."
        />
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
