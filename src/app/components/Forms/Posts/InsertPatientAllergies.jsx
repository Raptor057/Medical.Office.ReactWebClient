import React, { useState, useEffect } from "react";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertUpdatePatientAllergiesForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    allergies: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener las alergias del paciente al cargar el componente
  useEffect(() => {
    const fetchPatientAllergies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getPatientAllergies(patientId);
        if (response && response.patientAllergies) {
          const { patientAllergies } = response;
          setFormData({
            idPatient: patientId,
            allergies: patientAllergies.allergies || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener las alergias del paciente.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatientAllergies();
    }
  }, [patientId]);

  // Manejo de cambios en el campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      await MedicalOfficeWebApi.insertPatientAllergies(formData);
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
        allergies: formData.allergies,
      };
      await MedicalOfficeWebApi.updatePatientAllergies(patientId, updateData);
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
          Alergias del Paciente
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza la lista de alergias del paciente.
        </Typography>

        {/* Campo de texto para las alergias */}
        <Textarea
          label="Alergias"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Escribe aquí las alergias del paciente..."
          required
        />

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Alergias"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Alergias"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
