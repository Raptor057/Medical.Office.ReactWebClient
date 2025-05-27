'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientDiagnostics() {
  const idPatient = 1;
  const idAppointment = 1;

  const [diagnosticsType, setDiagnosticsType] = useState("");
  const [comments, setComments] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerDiagnosticos(idPatient, idAppointment);
        const data = response?.patientDiagnostics;

        if (data) {
          setDiagnosticsType(data.diagnosticsType || "");
          setComments(data.comments || "");
          setIsExistingRecord(true);
        } else {
          setDiagnosticsType("");
          setComments("");
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
      diagnosticsType,
      comments
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarDiagnostico(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarDiagnostico(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerDiagnosticos(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientDiagnostics;

      if (updatedData) {
        setDiagnosticsType(updatedData.diagnosticsType || "");
        setComments(updatedData.comments || "");
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
        <label htmlFor="diagnosticsType" className="block text-sm font-medium text-gray-900">
          Tipo de Diagnóstico
        </label>
        <div className="mt-2">
          <textarea
            id="diagnosticsType"
            name="diagnosticsType"
            rows={2}
            placeholder="Ej. Laboratorio, Rayos X..."
            value={diagnosticsType}
            onChange={(e) => setDiagnosticsType(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-900">
          Comentarios
        </label>
        <div className="mt-2">
          <textarea
            id="comments"
            name="comments"
            rows={4}
            placeholder="Observaciones del diagnóstico"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
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
