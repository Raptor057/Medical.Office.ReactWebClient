'use client';

import React, { useEffect, useState } from "react";
import { PatientDetails } from "@/app/components/Patients/PatientDetails";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Typography } from "@material-tailwind/react";

export default function PatientDetailsPage() {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await MedicalOfficeWebApi.getPatientDataAndAntecedents(1); // Usando ID=1 como ejemplo
        console.log("Datos del paciente obtenidos:", response); // Log de depuración
        setPatientData(response.patientDataAndAntecedents);
      } catch (err) {
        console.error("Error al obtener los detalles del paciente:", err); // Log de error
        setError(err.message || "Error al cargar los detalles del paciente.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

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

  if (!patientData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="red">
          No se encontraron datos del paciente.
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
