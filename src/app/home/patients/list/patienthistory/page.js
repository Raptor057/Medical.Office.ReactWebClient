'use client'; // Necesario para habilitar el entorno cliente

import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';  // Importamos useRouter para redirigir
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';
import { PatientDetails } from '@/app/components/Patients/PatientDetails';

export default function PatientDetailsPage() {
  const [id, setId] = useState(null);
  const router = useRouter();  // Inicializamos el router para la redirección

  useEffect(() => {
    // Extraer el parámetro de búsqueda directamente desde la URL del cliente
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setId(params.get('id'));
    }
  }, []);

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await MedicalOfficeWebApi.getPatientDataAndAntecedents(id);
        console.log('Datos del paciente obtenidos:', response);
        setPatientData(response.patientDataAndAntecedents);
      } catch (err) {
        console.error('Error al obtener los detalles del paciente:', err);
        setError(err.message || 'Error al cargar los detalles del paciente.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  // Función para manejar la redirección a la página de "Insert"
  const handleInsertUpdateButtonClick = () => {
    router.push(`/home/patients/list/patienthistory/insert?id=${id}`);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="red">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {loading ? (
        <Typography variant="h6" color="blue-gray">
          Cargando detalles del paciente...
        </Typography>
      ) : (
        <>
          <PatientDetails patientData={patientData} />
          {/* Botones para redirigir a Insertar o Actualizar paciente */}
          <div className="flex justify-center gap-4 mt-6">
            <Button color="blue" onClick={handleInsertUpdateButtonClick}>
              Insertar / Actualizar Datos del Paciente
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
