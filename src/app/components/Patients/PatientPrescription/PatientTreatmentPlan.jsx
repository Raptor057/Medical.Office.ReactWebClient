'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientTreatmentPlan() {
  const idPatient = 1;
  const idAppointment = 1;

  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerPlanTratamiento(idPatient, idAppointment);
        const data = response?.patientTreatmentPlan;

        if (data) {
          setTreatmentPlan(data.treatmentPlan || "");
          setIsExistingRecord(true);
        } else {
          setTreatmentPlan("");
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
      treatmentPlan: treatmentPlan || ""
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarPlanTratamiento(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarPlanTratamiento(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerPlanTratamiento(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientTreatmentPlan;

      if (updatedData) {
        setTreatmentPlan(updatedData.treatmentPlan || "");
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
        <label htmlFor="treatmentPlan" className="block text-sm font-medium text-gray-900">
          Plan de tratamiento
        </label>
        <div className="mt-2">
          <textarea
            id="treatmentPlan"
            name="treatmentPlan"
            rows={4}
            placeholder="Describe el plan de tratamiento sugerido"
            value={treatmentPlan}
            onChange={(e) => setTreatmentPlan(e.target.value)}
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
