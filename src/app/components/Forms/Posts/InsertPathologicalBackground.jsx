import React, { useState, useEffect } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertUpdatePathologicalBackgroundForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
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
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener antecedentes patológicos al cargar el componente
  useEffect(() => {
    const fetchPathologicalBackground = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getPathologicalBackground(patientId);
        if (response && response.pathologicalBackground) {
          const { pathologicalBackground } = response;
          setFormData({
            idPatient: patientId,
            previousHospitalization: pathologicalBackground.previousHospitalization || false,
            previousSurgeries: pathologicalBackground.previousSurgeries || false,
            diabetes: pathologicalBackground.diabetes || false,
            thyroidDiseases: pathologicalBackground.thyroidDiseases || false,
            hypertension: pathologicalBackground.hypertension || false,
            cardiopathies: pathologicalBackground.cardiopathies || false,
            trauma: pathologicalBackground.trauma || false,
            cancer: pathologicalBackground.cancer || false,
            tuberculosis: pathologicalBackground.tuberculosis || false,
            transfusions: pathologicalBackground.transfusions || false,
            respiratoryDiseases: pathologicalBackground.respiratoryDiseases || false,
            gastrointestinalDiseases: pathologicalBackground.gastrointestinalDiseases || false,
            stDs: pathologicalBackground.stDs || false,
            stDsData: pathologicalBackground.stDsData || "",
            chronicKidneyDisease: pathologicalBackground.chronicKidneyDisease || false,
            others: pathologicalBackground.others || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener los antecedentes patológicos.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPathologicalBackground();
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
      await MedicalOfficeWebApi.insertPathologicalBackground(formData);
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
        previousHospitalization: formData.previousHospitalization,
        previousSurgeries: formData.previousSurgeries,
        diabetes: formData.diabetes,
        thyroidDiseases: formData.thyroidDiseases,
        hypertension: formData.hypertension,
        cardiopathies: formData.cardiopathies,
        trauma: formData.trauma,
        cancer: formData.cancer,
        tuberculosis: formData.tuberculosis,
        transfusions: formData.transfusions,
        respiratoryDiseases: formData.respiratoryDiseases,
        gastrointestinalDiseases: formData.gastrointestinalDiseases,
        stDs: formData.stDs,
        stDsData: formData.stDsData,
        chronicKidneyDisease: formData.chronicKidneyDisease,
        others: formData.others,
      };
      await MedicalOfficeWebApi.updatePathologicalBackground(patientId, updateData);
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
          Antecedentes Patológicos
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza los antecedentes patológicos del paciente.
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

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Antecedentes"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Antecedentes"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
