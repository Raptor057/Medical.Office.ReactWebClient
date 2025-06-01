'use client';

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import HttpRequestsPatientPrescription from '@/app/utils/HttpRequestsPatientPrescription';

function replaceNulls(obj) {
  if (Array.isArray(obj)) {
    return obj.map(replaceNulls);
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, replaceNulls(value)])
    );
  } else {
    return obj ?? 'N/A';
  }
}

export default function PatientPrescriptionPrintView() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id');
  const patientId = searchParams.get('idPatient');

  const [data, setData] = useState({
    consultation: {},
    diagnostics: {},
    lab: {},
    instructions: {},
    procedures: {},
    medications: {},
    prescription: {},
    treatment: {},
  });

  const [error, setError] = useState(null);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);

  useEffect(() => {
    const safeFetch = async (promise, propertyName) => {
      try {
        const res = await promise;
        const value = res?.data?.[propertyName] ?? {};
        return replaceNulls(value);
      } catch (e) {
        console.error('Error al obtener', propertyName, e);
        return replaceNulls({});
      }
    };

    const fetchAllData = async () => {
      try {
        const consultation = await safeFetch(HttpRequestsPatientPrescription.obtenerCargosPorConsulta(patientId, appointmentId), 'patientConsultationCharges');
        const diagnostics = await safeFetch(HttpRequestsPatientPrescription.obtenerDiagnosticos(patientId, appointmentId), 'patientDiagnostics');
        const lab = await safeFetch(HttpRequestsPatientPrescription.obtenerSolicitudesLaboratorioEImagen(patientId, appointmentId), 'patientLaboratoryAndImaging');
        const instructions = await safeFetch(HttpRequestsPatientPrescription.obtenerIndicacionesMedicas(patientId, appointmentId), 'patientMedicalInstructions');
        const procedures = await safeFetch(HttpRequestsPatientPrescription.obtenerProcedimientosMedicos(patientId, appointmentId), 'patientMedicalProcedures');
        const medications = await safeFetch(HttpRequestsPatientPrescription.obtenerMedicamentosPrescritos(patientId, appointmentId), 'patientPrescriptionOfMedications');
        const prescription = await safeFetch(HttpRequestsPatientPrescription.obtenerPrescripcion(patientId, appointmentId), 'patientPrescription');
        const treatment = await safeFetch(HttpRequestsPatientPrescription.obtenerPlanTratamiento(patientId, appointmentId), 'patientTreatmentPlan');

        setData({ consultation, diagnostics, lab, instructions, procedures, medications, prescription, treatment });
        setIsReadyToPrint(true);
      } catch (err) {
        setError(`Error al obtener los datos: ${err.message || 'desconocido'}`);
        console.error(err);
      }
    };

    if (appointmentId && patientId) {
      fetchAllData();
    }
  }, [appointmentId, patientId]);

  useLayoutEffect(() => {
    if (isReadyToPrint) {
      // Esperar a que el DOM esté listo visualmente
      const timeout = setTimeout(() => window.print(), 600);
      return () => clearTimeout(timeout);
    }
  }, [isReadyToPrint]);

  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="w-full min-h-screen p-0 m-0 text-black bg-white print:p-0 print:m-0">
      <div className="p-10 print:p-10">
        <h1 className="mb-6 text-3xl font-bold text-center">Receta Médica</h1>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Notas de consulta</h2>
          <p>{data.prescription.consultationNotes}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Signos vitales</h2>
          <ul className="ml-6 list-disc">
            <li>Estatura: {data.prescription.height} cm</li>
            <li>Peso: {data.prescription.weight} kg</li>
            <li>IMC: {data.prescription.bodyMassIndex}</li>
            <li>Temperatura: {data.prescription.temperature} °C</li>
            <li>Frecuencia respiratoria: {data.prescription.respiratoryRate}</li>
            <li>Presión arterial: {data.prescription.systolicPressure}/{data.prescription.diastolicPressure}</li>
            <li>Frecuencia cardíaca: {data.prescription.heartRate}</li>
            <li>% Grasa corporal: {data.prescription.bodyFatPercentage}</li>
            <li>% Masa muscular: {data.prescription.muscleMassPercentage}</li>
            <li>Circunferencia cefálica: {data.prescription.headCircumference}</li>
            <li>Saturación de oxígeno: {data.prescription.oxygenSaturation}%</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Diagnóstico</h2>
          <p><strong>Tipo:</strong> {data.diagnostics.diagnosticsType}</p>
          <p><strong>Comentarios:</strong> {data.diagnostics.comments}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Laboratorio / Imagen</h2>
          <p><strong>Tipo de estudio:</strong> {data.lab.medicalStudiesOrImagesTypes}</p>
          <p><strong>Comentarios:</strong> {data.lab.comments}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Instrucciones Médicas</h2>
          <p>{data.instructions.medicalInstructions}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Procedimientos Médicos</h2>
          <p><strong>Procedimiento:</strong> {data.procedures.medicalProceduresTypes}</p>
          <p><strong>Comentarios:</strong> {data.procedures.comments}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Medicamentos</h2>
          <p><strong>Medicamento:</strong> {data.medications.medications}</p>
          <p><strong>Dosis:</strong> {data.medications.dose}</p>
          <p><strong>Frecuencia:</strong> {data.medications.frequency}</p>
          <p><strong>Duración:</strong> {data.medications.duration}</p>
          <p><strong>Comentarios:</strong> {data.medications.comments}</p>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Plan de Tratamiento</h2>
          <p>{data.treatment.treatmentPlan}</p>
        </section>

        <div className="mt-12 text-right">
          <p className="text-sm">Firma del médico</p>
          <div className="w-48 mt-2 border-t"></div>
        </div>
      </div>
    </div>
  );
}
