'use client';

import React, { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("consultation");

  const tabs = [
    { label: "Consulta", value: "consultation", component: <PatientConsultationCharges /> },
    { label: "Diagnósticos", value: "diagnostics", component: <PatientDiagnostics /> },
    { label: "Laboratorio / Imagen", value: "lab", component: <PatientLaboratoryAndImagingRequests /> },
    { label: "Instrucciones Médicas", value: "instructions", component: <PatientMedicalInstructions /> },
    { label: "Procedimientos", value: "procedures", component: <PatientMedicalProcedures /> },
    { label: "Medicamentos", value: "medications", component: <PatientPrescriptionOfMedications /> },
    { label: "Prescripción", value: "prescription", component: <PatientPrescription /> },
    { label: "Plan de Tratamiento", value: "treatment", component: <PatientTreatmentPlan /> },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-center text-gray-800">Prescripción del Paciente</h1>

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
