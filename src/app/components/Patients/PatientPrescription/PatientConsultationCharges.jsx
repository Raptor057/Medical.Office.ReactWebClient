'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientConsultationCharges() {
  const idPatient = 2;
  const idAppointment = 1;

  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerCargosPorConsulta(idPatient, idAppointment);
        const data = response?.patientConsultationCharges;

        if (data) {
          setDescription(data.description || "");
          setTotal(data.total !== undefined ? data.total.toString() : "");
          setIsExistingRecord(true);
        } else {
          setIsExistingRecord(false);
          setDescription("");
          setTotal("");
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
      description,
      total: parseFloat(total) || 0
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarCargosPorConsulta(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarCargosPorConsulta(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerCargosPorConsulta(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientConsultationCharges;

      if (updatedData) {
        setDescription(updatedData.description || "");
        setTotal(updatedData.total !== undefined ? updatedData.total.toString() : "");
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
          Descripción
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Motivo de consulta"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="total" className="block text-sm font-medium text-gray-900">
          Total
        </label>
        <div className="mt-2">
          <input
            id="total"
            name="total"
            type="number"
            placeholder="0.00"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
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
