'use client';
import React, { useEffect, useState } from "react";
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
    <div className="flex flex-col gap-4">
      <PatientConsultationCharges />
      <PatientDiagnostics />
      <PatientLaboratoryAndImagingRequests />
      <PatientMedicalInstructions />
      <PatientMedicalProcedures />
      <PatientPrescription />
      <PatientPrescriptionOfMedications />
      <PatientTreatmentPlan />
    </div>
  );
}
