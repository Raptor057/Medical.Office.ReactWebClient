import React, { useState, useEffect } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertUpdatePsychiatricHistoryForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
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
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener historial psiquiátrico al cargar el componente
  useEffect(() => {
    const fetchPsychiatricHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getPsychiatricHistory(patientId);
        if (response && response.psychiatricHistory) {
          const { psychiatricHistory } = response;
          setFormData({
            idPatient: patientId,
            familyHistory: psychiatricHistory.familyHistory || false,
            familyHistoryData: psychiatricHistory.familyHistoryData || "",
            affectedAreas: psychiatricHistory.affectedAreas || "",
            pastAndCurrentTreatments: psychiatricHistory.pastAndCurrentTreatments || "",
            familySocialSupport: psychiatricHistory.familySocialSupport || false,
            familySocialSupportData: psychiatricHistory.familySocialSupportData || "",
            workLifeAspects: psychiatricHistory.workLifeAspects || "",
            socialLifeAspects: psychiatricHistory.socialLifeAspects || "",
            authorityRelationship: psychiatricHistory.authorityRelationship || "",
            impulseControl: psychiatricHistory.impulseControl || "",
            frustrationManagement: psychiatricHistory.frustrationManagement || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener el historial psiquiátrico.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPsychiatricHistory();
    }
  }, [patientId]);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejo del envío del formulario para insertar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint para insertar
      await MedicalOfficeWebApi.insertPsychiatricHistory(formData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  // Manejo del envío del formulario para actualizar
  const handleUpdateSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint para actualizar
      const updateData = {
        familyHistory: formData.familyHistory,
        familyHistoryData: formData.familyHistoryData,
        affectedAreas: formData.affectedAreas,
        pastAndCurrentTreatments: formData.pastAndCurrentTreatments,
        familySocialSupport: formData.familySocialSupport,
        familySocialSupportData: formData.familySocialSupportData,
        workLifeAspects: formData.workLifeAspects,
        socialLifeAspects: formData.socialLifeAspects,
        authorityRelationship: formData.authorityRelationship,
        impulseControl: formData.impulseControl,
        frustrationManagement: formData.frustrationManagement,
      };
      await MedicalOfficeWebApi.updatePsychiatricHistory(patientId, updateData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulario de Inserción */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
        <Typography variant="h4" color="blue-gray" className="font-bold text-center">
          Historial Psiquiátrico
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza el historial psiquiátrico del paciente.
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

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Historial"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Historial"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
