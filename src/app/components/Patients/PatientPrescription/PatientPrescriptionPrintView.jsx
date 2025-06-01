'use client';

import React, { useEffect, useState } from 'react';
import HttpRequestsPatientPrescription from '@/app/utils/HttpRequestsPatientPrescription';

export default function PatientPrescriptionPrintView({ patientId, appointmentId }) {
  const [data, setData] = useState({
    prescription: null,
    medications: null,
    instructions: null,
    treatment: null,
    diagnostics: null,
    labRequests: null,
    consultationCharges: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          prescription,
          medications,
          instructions,
          treatment,
          diagnostics,
          labRequests,
          consultationCharges
        ] = await Promise.all([
          HttpRequestsPatientPrescription.obtenerPrescripcion(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerMedicamentosPrescritos(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerIndicacionesMedicas(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerPlanTratamiento(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerDiagnosticos(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerSolicitudesLaboratorioEImagen(patientId, appointmentId),
          HttpRequestsPatientPrescription.obtenerCargosConsulta(patientId, appointmentId)
        ]);

        setData({
          prescription: prescription?.patientPrescription,
          medications: medications?.patientPrescriptionOfMedications,
          instructions: instructions?.patientMedicalInstructions,
          treatment: treatment?.patientTreatmentPlan,
          diagnostics: diagnostics?.patientDiagnostics,
          labRequests: labRequests?.patientLaboratoryAndImagingRequests,
          consultationCharges: consultationCharges?.patientConsultationCharges,
        });
      } catch (err) {
        setError(err?.message || 'Error al cargar la información');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [patientId, appointmentId]);

  const section = (title, content) => (
    <div className="mb-6">
      <h3 className="mb-2 text-lg font-semibold border-b border-gray-400">{title}</h3>
      <div className="text-sm whitespace-pre-wrap">{content || 'No disponible'}</div>
    </div>
  );

  if (loading) return <div className="p-6 text-gray-600">Cargando receta médica...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-3xl p-6 mx-auto text-black bg-white print:text-black print:bg-white print:max-w-full print:p-8">
      <div className="pb-4 mb-6 text-center border-b">
        <h1 className="text-2xl font-bold">Receta Médica</h1>
        <p className="text-sm text-gray-600">Consulta #{appointmentId}</p>
      </div>

      {section('Notas de Consulta', data.prescription?.consultationNotes)}
      {section('Diagnóstico', data.diagnostics?.diagnostics)}
      {section('Medicamentos', `
- Medicamentos: ${data.medications?.medications}
- Dosis: ${data.medications?.dose}
- Frecuencia: ${data.medications?.frequency}
- Duración: ${data.medications?.duration}
- Comentarios: ${data.medications?.comments}
      `.trim())}
      {section('Indicaciones Médicas', data.instructions?.medicalInstructions)}
      {section('Plan de Tratamiento', data.treatment?.treatmentPlan)}
      {section('Solicitudes de Laboratorio / Imagen', data.labRequests?.requests)}
      {section('Cargos por Consulta', data.consultationCharges?.charges)}

      <div className="flex justify-center mt-10 print:hidden">
        <button
          onClick={() => window.print()}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
}
