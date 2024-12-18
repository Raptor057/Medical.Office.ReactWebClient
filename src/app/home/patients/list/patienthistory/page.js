//Modifica el inicio de tu código y protege el useSearchParams con un chequeo de window.

'use client'; // Necesario para habilitar el entorno cliente

import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { useSearchParams } from 'next/navigation';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';
import { PatientDetails } from '@/app/components/Patients/PatientDetails';

export default function PatientDetailsPage() {
  const [id, setId] = useState(null);
  const searchParams = typeof window !== 'undefined' ? useSearchParams() : null;

  useEffect(() => {
    if (searchParams) {
      setId(searchParams.get('id'));
    }
  }, [searchParams]);

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
