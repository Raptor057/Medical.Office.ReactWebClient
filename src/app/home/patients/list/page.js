'use client';

import React, { useEffect, useState } from "react";
import { PatientsList } from "@/app/components/Patients/PatientsList";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { Typography } from "@material-tailwind/react";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const data = await MedicalOfficeWebApi.getPatientData(0); // Llama al endpoint con ID = 0
        console.log("Datos devueltos por la API:", data); // Log para depuración
        const patientList =
          data?.getShortPatientsDtoList?.getShortPatientsDtolist || [];
        console.log("Lista de pacientes procesada:", patientList); // Log para depuración
        setPatients(patientList);
      } catch (err) {
        console.error("Error al cargar pacientes:", err); // Log de errores
        setError(
          err.response?.data?.message ||
          err.message ||
          "Error desconocido al cargar los datos de pacientes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []); // Dependencia vacía para ejecutarse al montar la página

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="blue-gray">
          Cargando pacientes...
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
      <PatientsList patients={patients} />
    </div>
  );
}
