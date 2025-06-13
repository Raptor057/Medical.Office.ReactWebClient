'use client';

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
} from "@material-tailwind/react";
import InsertActiveMedicationsForm from "@/app/components/Forms/Posts/InsertActiveMedications";
import InsertFamilyHistoryForm from "@/app/components/Forms/Posts/InsertFamilyHistory";
import InsertMedicalHistoryNotesForm from "@/app/components/Forms/Posts/InsertMedicalHistoryNotes";
import InsertNonPathologicalHistoryForm from "@/app/components/Forms/Posts/InsertNonPathologicalHistory";
import InsertPathologicalBackgroundForm from "@/app/components/Forms/Posts/InsertPathologicalBackground";
import InsertPatientAllergiesForm from "@/app/components/Forms/Posts/InsertPatientAllergies";
import InsertPsychiatricHistoryForm from "@/app/components/Forms/Posts/InsertPsychiatricHistory";

export default function PatientFormsDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const patientId = parseInt(searchParams.get("id")) || 0;
  const [activeTab, setActiveTab] = useState("medications");

  const tabs = [
    {
      label: "Medicamentos",
      value: "medications",
      component: <InsertActiveMedicationsForm patientId={patientId} />,
    },
    {
      label: "Historial Familiar",
      value: "family",
      component: <InsertFamilyHistoryForm patientId={patientId} />,
    },
    {
      label: "Notas Médicas",
      value: "notes",
      component: <InsertMedicalHistoryNotesForm patientId={patientId} />,
    },
    {
      label: "No Patológicos",
      value: "nonPath",
      component: <InsertNonPathologicalHistoryForm patientId={patientId} />,
    },
    {
      label: "Patológicos",
      value: "path",
      component: <InsertPathologicalBackgroundForm patientId={patientId} />,
    },
    {
      label: "Alergias",
      value: "allergies",
      component: <InsertPatientAllergiesForm patientId={patientId} />,
    },
    {
      label: "Psiquiátrico",
      value: "psychiatric",
      component: <InsertPsychiatricHistoryForm patientId={patientId} />,
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-start mb-6">
        <Button
          variant="outlined"
          color="gray"
          onClick={() => router.push(`/home/patients/list/patienthistory?id=${patientId}`)}
        >
          ← Regresar al Historial del Paciente
        </Button>
      </div>

      <Typography
        variant="h3"
        color="blue-gray"
        className="mb-6 font-bold text-center"
      >
        Formularios de Paciente
      </Typography>

      <Tabs value={activeTab} className="p-4 bg-white rounded-lg shadow-md">
        <TabsHeader className="bg-blue-100">
          {tabs.map(({ label, value }) => (
            <Tab key={value} value={value} onClick={() => setActiveTab(value)}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="py-6">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
