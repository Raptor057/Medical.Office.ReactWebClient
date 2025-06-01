'use client';
import React from "react";
import PatientConsultationCharges from "@/app/components/Patients/PatientPrescription/PatientConsultationCharges";
import PatientDiagnostics from "@/app/components/Patients/PatientPrescription/PatientDiagnostics";
import PatientLaboratoryAndImagingRequests from "@/app/components/Patients/PatientPrescription/PatientLaboratoryAndImagingRequests";
import PatientMedicalInstructions from "@/app/components/Patients/PatientPrescription/PatientMedicalInstructions";
import PatientMedicalProcedures from "@/app/components/Patients/PatientPrescription/PatientMedicalProcedures";
import PatientPrescription from "@/app/components/Patients/PatientPrescription/PatientPrescription";
import PatientPrescriptionOfMedications from "@/app/components/Patients/PatientPrescription/PatientPrescriptionOfMedications";
import PatientTreatmentPlan from "@/app/components/Patients/PatientPrescription/PatientTreatmentPlan";

export default function PatientPrescriptionPage() {
  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">Prescripción del Paciente</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PatientConsultationCharges />
        <PatientDiagnostics />

        <PatientLaboratoryAndImagingRequests />
        <PatientMedicalInstructions />

        <PatientMedicalProcedures />
        <PatientPrescriptionOfMedications />
      </div>

      <div className="mt-6">
        <PatientPrescription />
      </div>

      <div className="mt-6">
        <PatientTreatmentPlan />
      </div>
    </div>
  );
}
