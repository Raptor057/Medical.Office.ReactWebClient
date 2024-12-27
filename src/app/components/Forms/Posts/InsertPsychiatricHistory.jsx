import React, { useState } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertPsychiatricHistoryForm({ patientId }) {
  const [formData, setFormData] = useState({
    idPatient: patientId || 0,
    familyHistory: false,
    familyHistoryData: "",
    affectedAreas: "",
    pastAndCurrentTreatments: "",
    familySocialSupport: false,
    familySocialSupportData: "",
    workLifeAspects: "",
    socialLifeAspects: "",
    authorityRelationship: "",
    impulseControl: "",
    frustrationManagement: "",
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
      await MedicalOfficeWebApi.insertPsychiatricHistory(formData);
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
        Registrar Historial Psiquiátrico
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa los antecedentes psiquiátricos del paciente.
      </Typography>

      {/* Campos de historial psiquiátrico */}
      <div className="space-y-4">
        <Checkbox
          label="Antecedentes familiares"
          name="familyHistory"
          checked={formData.familyHistory}
          onChange={handleChange}
        />
        {formData.familyHistory && (
          <Textarea
            label="Detalles de antecedentes familiares"
            name="familyHistoryData"
            value={formData.familyHistoryData}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles de antecedentes familiares..."
          />
        )}
        <Textarea
          label="Áreas afectadas"
          name="affectedAreas"
          value={formData.affectedAreas}
          onChange={handleChange}
          placeholder="Escribe aquí las áreas afectadas..."
        />
        <Textarea
          label="Tratamientos pasados y actuales"
          name="pastAndCurrentTreatments"
          value={formData.pastAndCurrentTreatments}
          onChange={handleChange}
          placeholder="Escribe aquí los tratamientos pasados y actuales..."
        />
        <Checkbox
          label="Apoyo social familiar"
          name="familySocialSupport"
          checked={formData.familySocialSupport}
          onChange={handleChange}
        />
        {formData.familySocialSupport && (
          <Textarea
            label="Detalles del apoyo social familiar"
            name="familySocialSupportData"
            value={formData.familySocialSupportData}
            onChange={handleChange}
            placeholder="Escribe aquí los detalles del apoyo social familiar..."
          />
        )}
        <Textarea
          label="Aspectos de la vida laboral"
          name="workLifeAspects"
          value={formData.workLifeAspects}
          onChange={handleChange}
          placeholder="Escribe aquí los aspectos de la vida laboral..."
        />
        <Textarea
          label="Aspectos de la vida social"
          name="socialLifeAspects"
          value={formData.socialLifeAspects}
          onChange={handleChange}
          placeholder="Escribe aquí los aspectos de la vida social..."
        />
        <Textarea
          label="Relación con la autoridad"
          name="authorityRelationship"
          value={formData.authorityRelationship}
          onChange={handleChange}
          placeholder="Escribe aquí la relación con la autoridad..."
        />
        <Textarea
          label="Control de impulsos"
          name="impulseControl"
          value={formData.impulseControl}
          onChange={handleChange}
          placeholder="Escribe aquí el control de impulsos..."
        />
        <Textarea
          label="Manejo de la frustración"
          name="frustrationManagement"
          value={formData.frustrationManagement}
          onChange={handleChange}
          placeholder="Escribe aquí el manejo de la frustración..."
        />
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
