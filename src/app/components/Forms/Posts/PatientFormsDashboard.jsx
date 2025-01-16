'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import InsertActiveMedicationsForm from "@/app/components/Forms/Posts/InsertActiveMedications";
import InsertFamilyHistoryForm from "@/app/components/Forms/Posts/InsertFamilyHistory";
import InsertMedicalHistoryNotesForm from "@/app/components/Forms/Posts/InsertMedicalHistoryNotes";
import InsertNonPathologicalHistoryForm from "@/app/components/Forms/Posts/InsertNonPathologicalHistory";
import InsertPathologicalBackgroundForm from "@/app/components/Forms/Posts/InsertPathologicalBackground";
import InsertPatientAllergiesForm from "@/app/components/Forms/Posts/InsertPatientAllergies";
import InsertPsychiatricHistoryForm from "@/app/components/Forms/Posts/InsertPsychiatricHistory";

export default function PatientFormsDashboard() {
  const searchParams = useSearchParams();
  const patientId = parseInt(searchParams.get("id")) || 0;

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <Typography
        variant="h3"
        color="blue-gray"
        className="mb-8 font-bold text-center"
      >
        Formularios de Paciente
      </Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Card para cada formulario */}
        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Medicamentos Activos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertActiveMedicationsForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Historial Familiar
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertFamilyHistoryForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Notas de Historial Médico
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertMedicalHistoryNotesForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Antecedentes No Patológicos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertNonPathologicalHistoryForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Antecedentes Patológicos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPathologicalBackgroundForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Alergias del Paciente
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPatientAllergiesForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="p-4 text-white bg-blue-500">
            <Typography variant="h6" color="white">
              Historial Psiquiátrico
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPsychiatricHistoryForm patientId={patientId} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
