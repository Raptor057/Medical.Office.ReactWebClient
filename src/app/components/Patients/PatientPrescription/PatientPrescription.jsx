'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";

export default function PatientPrescription() {
  const idPatient = 1;
  const idAppointment = 1;

  const [formData, setFormData] = useState({
    consultationNotes: "",
    height: "",
    weight: "",
    bodyMassIndex: "",
    temperature: "",
    respiratoryRate: "",
    systolicPressure: "",
    diastolicPressure: "",
    heartRate: "",
    bodyFatPercentage: "",
    muscleMassPercentage: "",
    headCircumference: "",
    oxygenSaturation: ""
  });

  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const response = await HttpRequestsPatientPrescription.obtenerPrescripcion(idPatient, idAppointment);
        const data = response?.patientPrescription;

        if (data) {
          setFormData({
            consultationNotes: data.consultationNotes || "",
            height: data.height || "",
            weight: data.weight || "",
            bodyMassIndex: data.bodyMassIndex || "",
            temperature: data.temperature || "",
            respiratoryRate: data.respiratoryRate || "",
            systolicPressure: data.systolicPressure || "",
            diastolicPressure: data.diastolicPressure || "",
            heartRate: data.heartRate || "",
            bodyFatPercentage: data.bodyFatPercentage || "",
            muscleMassPercentage: data.muscleMassPercentage || "",
            headCircumference: data.headCircumference || "",
            oxygenSaturation: data.oxygenSaturation || ""
          });
          setIsExistingRecord(true);
        } else {
          setFormData({});
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
      ...Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value) || 0])
      ),
      consultationNotes: formData.consultationNotes
    };

    try {
      if (!isExistingRecord) {
        await HttpRequestsPatientPrescription.insertarPrescripcion(requestData);
      } else {
        await HttpRequestsPatientPrescription.actualizarPrescripcion(requestData);
      }

      const updatedResponse = await HttpRequestsPatientPrescription.obtenerPrescripcion(idPatient, idAppointment);
      const updatedData = updatedResponse?.patientPrescription;

      if (updatedData) {
        setFormData({
          consultationNotes: updatedData.consultationNotes || "",
          height: updatedData.height || "",
          weight: updatedData.weight || "",
          bodyMassIndex: updatedData.bodyMassIndex || "",
          temperature: updatedData.temperature || "",
          respiratoryRate: updatedData.respiratoryRate || "",
          systolicPressure: updatedData.systolicPressure || "",
          diastolicPressure: updatedData.diastolicPressure || "",
          heartRate: updatedData.heartRate || "",
          bodyFatPercentage: updatedData.bodyFatPercentage || "",
          muscleMassPercentage: updatedData.muscleMassPercentage || "",
          headCircumference: updatedData.headCircumference || "",
          oxygenSaturation: updatedData.oxygenSaturation || ""
        });
        setIsExistingRecord(true);
      }
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Error al guardar los datos.";
      setError(errorMessage);
    }
  };

const labels = {
  height: "Estatura (cm)",
  weight: "Peso (kg)",
  bodyMassIndex: "Índice de masa corporal (kg/m²)",
  temperature: "Temperatura (°C)",
  respiratoryRate: "Frecuencia respiratoria (resp/min)",
  systolicPressure: "Presión sistólica (mmHg)",
  diastolicPressure: "Presión diastólica (mmHg)",
  heartRate: "Frecuencia cardíaca (latidos/min)",
  bodyFatPercentage: "Porcentaje de grasa corporal (%)",
  muscleMassPercentage: "Porcentaje de masa muscular (%)",
  headCircumference: "Circunferencia cefálica (cm)",
  oxygenSaturation: "Saturación de oxígeno (%)"
};


  return (
    <form onSubmit={handleSave} className="p-4 space-y-6 bg-white rounded shadow">
      {error && <div className="font-medium text-red-600">{error}</div>}

      <div>
        <label htmlFor="consultationNotes" className="block text-sm font-medium text-gray-900">
          Notas de consulta
        </label>
        <div className="mt-2">
          <textarea
            id="consultationNotes"
            name="consultationNotes"
            rows={4}
            value={formData.consultationNotes}
            onChange={handleChange}
            placeholder="Notas del médico sobre la consulta"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      {Object.entries(formData)
        .filter(([key]) => key !== "consultationNotes")
        .map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-900">
              {labels[key]}
            </label>
            <div className="mt-2">
              <input
                id={key}
                name={key}
                type="number"
                step="any"
                value={value}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        ))}

      <button
        type="submit"
        className="px-4 py-2 mt-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
}
