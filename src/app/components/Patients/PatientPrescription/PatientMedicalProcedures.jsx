'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientMedicalProcedures() {
  const idPatient = 1;
  const idAppointment = 1;

  const [medicalProceduresTypes, setMedicalProceduresTypes] = useState("");
  const [comments, setComments] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerProcedimientosMedicos(idPatient, idAppointment);
        const data = response?.patientMedicalProcedures;

        if (data) {
          setMedicalProceduresTypes(data.medicalProceduresTypes || "");
          setComments(data.comments || "");
          setIsExistingRecord(true);
        } else {
          setMedicalProceduresTypes("");
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
      medicalProceduresTypes,
      comments
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarProcedimientosMedicos(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarProcedimientosMedicos(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerProcedimientosMedicos(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientMedicalProcedures;

      if (updatedData) {
        setMedicalProceduresTypes(updatedData.medicalProceduresTypes || "");
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
        <label htmlFor="medicalProceduresTypes" className="block text-sm font-medium text-gray-900">
          Tipo de procedimiento médico
        </label>
        <div className="mt-2">
          <textarea
            id="medicalProceduresTypes"
            name="medicalProceduresTypes"
            rows={3}
            placeholder="Ej. Cirugía menor, curación, etc."
            value={medicalProceduresTypes}
            onChange={(e) => setMedicalProceduresTypes(e.target.value)}
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
            placeholder="Observaciones del procedimiento"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
