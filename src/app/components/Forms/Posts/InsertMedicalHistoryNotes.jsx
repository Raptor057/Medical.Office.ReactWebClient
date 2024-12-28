import React, { useState, useEffect } from "react";
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation"; // Hook para obtener parámetros de la URL
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Importa la instancia de API

export default function InsertUpdateMedicalHistoryNotesForm() {
  const searchParams = useSearchParams(); // Hook para obtener los parámetros de la URL
  const patientId = parseInt(searchParams.get("id")) || 0; // Obtiene el parámetro `id` y lo convierte a entero

  const [formData, setFormData] = useState({
    idPatient: patientId,
    medicalHistoryNotesData: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están cargados

  // Obtener las notas del historial médico al cargar el componente
  useEffect(() => {
    const fetchMedicalHistoryNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getMedicalHistoryNotes(patientId);
        if (response && response.medicalHistoryNotes) {
          const { medicalHistoryNotes } = response;
          setFormData({
            idPatient: patientId,
            medicalHistoryNotesData: medicalHistoryNotes.medicalHistoryNotesData || "",
          });
          setIsDataLoaded(true);
        }
      } catch (err) {
        setError(err || "Error al obtener las notas del historial médico.");
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchMedicalHistoryNotes();
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
      await MedicalOfficeWebApi.insertMedicalHistoryNotes(formData);
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
        notes: formData.medicalHistoryNotesData,
      };
      await MedicalOfficeWebApi.updateMedicalHistoryNotes(patientId, updateData);
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
          Notas del Historial Médico
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Completa o actualiza las notas del historial médico del paciente.
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

        {/* Botones de envío */}
        <div className="flex justify-between">
          <Button type="submit" color="blue" disabled={loading || isDataLoaded}>
            {loading ? "Enviando..." : "Guardar Notas"}
          </Button>
          <Button type="button" color="green" onClick={handleUpdateSubmit}>
            {loading ? "Actualizando..." : "Actualizar Notas"}
          </Button>
        </div>

        {/* Mensajes de éxito o error */}
        {success && <Typography color="green" className="mt-2">¡Operación realizada con éxito!</Typography>}
        {error && <Typography color="red" className="mt-2">{error}</Typography>}
      </form>
    </div>
  );
}
