'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientMedicalInstructions() {
  const idPatient = 1;
  const idAppointment = 1;

  const [medicalInstructions, setMedicalInstructions] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerIndicacionesMedicas(idPatient, idAppointment);
        const data = response?.patientMedicalInstructions;

        if (data) {
          setMedicalInstructions(data.medicalInstructions || "");
          setIsExistingRecord(true);
        } else {
          setMedicalInstructions("");
          setIsExistingRecord(false);
        }
      } catch (err) {
        const errorMessage = typeof err === "string" ? err : err?.message || "Error al obtener los datos.";
        setError(errorMessage);
        setIsExistingRecord(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    const requestData = {
      idPatient,
      idAppointment,
      medicalInstructions
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarIndicacionesMedicas(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarIndicacionesMedicas(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerIndicacionesMedicas(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientMedicalInstructions;

      if (updatedData) {
        setMedicalInstructions(updatedData.medicalInstructions || "");
        setIsExistingRecord(true);
      }
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Error al guardar los datos.";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSave} className="p-4 space-y-6 bg-white rounded shadow">
      {error && <div className="font-medium text-red-600">{error}</div>}

      <div>
        <label htmlFor="medicalInstructions" className="block text-sm font-medium text-gray-900">
          Indicaciones médicas
        </label>
        <div className="mt-2">
          <textarea
            id="medicalInstructions"
            name="medicalInstructions"
            rows={5}
            placeholder="Ej. Tomar medicamento cada 8 horas..."
            value={medicalInstructions}
            onChange={(e) => setMedicalInstructions(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
}
