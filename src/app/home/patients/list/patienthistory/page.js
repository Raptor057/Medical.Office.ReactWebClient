'use client'; // Necesario para habilitar el entorno cliente

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Typography } from '@material-tailwind/react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';
import { PatientDetails } from '@/app/components/Patients/PatientDetails';

export default function PatientDetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Obtén el ID de los parámetros de consulta

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="blue-gray">
          Cargando detalles del paciente...
        </Typography>
      </div>
    );
  }

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
      <PatientDetails patientData={patientData} />
    </div>
  );
}

