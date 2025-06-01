'use client';

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import PatientConsultationCharges from "@/app/components/Patients/PatientPrescription/PatientConsultationCharges";
import PatientDiagnostics from "@/app/components/Patients/PatientPrescription/PatientDiagnostics";
import PatientLaboratoryAndImagingRequests from "@/app/components/Patients/PatientPrescription/PatientLaboratoryAndImagingRequests";
import PatientMedicalInstructions from "@/app/components/Patients/PatientPrescription/PatientMedicalInstructions";
import PatientMedicalProcedures from "@/app/components/Patients/PatientPrescription/PatientMedicalProcedures";
import PatientPrescription from "@/app/components/Patients/PatientPrescription/PatientPrescription";
import PatientPrescriptionOfMedications from "@/app/components/Patients/PatientPrescription/PatientPrescriptionOfMedications";
import PatientTreatmentPlan from "@/app/components/Patients/PatientPrescription/PatientTreatmentPlan";

export default function PatientPrescriptionPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("id");
  const patientId = searchParams.get("idPatient");
  const [activeTab, setActiveTab] = useState("consultation");

  const tabs = [
    { label: "Consulta", value: "consultation", component: <PatientConsultationCharges appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Diagnósticos", value: "diagnostics", component: <PatientDiagnostics appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Laboratorio / Imagen", value: "lab", component: <PatientLaboratoryAndImagingRequests appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Instrucciones Médicas", value: "instructions", component: <PatientMedicalInstructions appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Procedimientos", value: "procedures", component: <PatientMedicalProcedures appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Medicamentos", value: "medications", component: <PatientPrescriptionOfMedications appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Prescripción", value: "prescription", component: <PatientPrescription appointmentId={appointmentId} patientId={patientId} /> },
    { label: "Plan de Tratamiento", value: "treatment", component: <PatientTreatmentPlan appointmentId={appointmentId} patientId={patientId} /> },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-gray-800">Prescripción del Paciente</h1>

      <div className="flex justify-between">
        <a
          href="/home"
          className="px-4 py-2 font-semibold text-white bg-gray-600 rounded hover:bg-gray-700"
        >
          Regresar al inicio
        </a>

        <a
          href={`/home/patients/patientprescription/patientprescriptionprintview?id=${appointmentId}&idPatient=${patientId}`}
          target="_blank"
          className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Imprimir receta
        </a>
      </div>

      <Tabs value={activeTab} className="mt-6">
        <TabsHeader>
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="p-4">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
