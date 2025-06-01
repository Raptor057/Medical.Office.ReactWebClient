'use client';

import React, { useEffect, useState } from "react";
import HttpRequestsPatientPrescription from "@/app/utils/HttpRequestsPatientPrescription";
import { Transition } from "@headlessui/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function PatientMedicalInstructions({ patientId, appointmentId }) {
  const idPatient = patientId;
  const idAppointment = appointmentId;

  const [medicalInstructions, setMedicalInstructions] = useState("");
  const [isExistingRecord, setIsExistingRecord] = useState(false);
  const [error, setError] = useState(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const [notificationMessage, setNotificationMessage] = useState("");

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

  const showToast = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

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

      showToast("success", "Indicaciones guardadas correctamente");
    } catch (err) {
      const errorMessage = typeof err === "string" ? err : err?.message || "Error al guardar los datos.";
      setError(errorMessage);
      showToast("error", errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSave} className="p-4 space-y-6 bg-white rounded shadow">
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

      {/* Notificación */}
      <div
        aria-live="assertive"
        className="fixed inset-0 z-50 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          <Transition show={showNotification}>
            <div className="w-full max-w-sm overflow-hidden transition bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black/5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    {notificationType === "success" ? (
                      <CheckCircleIcon className="text-green-500 size-6" />
                    ) : (
                      <XCircleIcon className="text-red-500 size-6" />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {notificationType === "success" ? "¡Éxito!" : "Error"}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{notificationMessage}</p>
                  </div>
                  <div className="flex ml-4 shrink-0">
                    <button
                      onClick={() => setShowNotification(false)}
                      className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <XMarkIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
