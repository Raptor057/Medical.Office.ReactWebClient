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
import InsertLoadFile from "@/app/components/Forms/Posts/InsertLoadFile";

export default function PatientFormsDashboard() {
  const searchParams = useSearchParams();
  const patientId = parseInt(searchParams.get("id")) || 0;

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-bold mb-8"
      >
        Formularios de Paciente
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Card para cada formulario */}
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Medicamentos Activos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertActiveMedicationsForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Historial Familiar
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertFamilyHistoryForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Notas de Historial Médico
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertMedicalHistoryNotesForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Antecedentes No Patológicos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertNonPathologicalHistoryForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Antecedentes Patológicos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPathologicalBackgroundForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Alergias del Paciente
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPatientAllergiesForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Historial Psiquiátrico
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertPsychiatricHistoryForm patientId={patientId} />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Subir Archivos
            </Typography>
          </CardHeader>
          <CardBody>
            <InsertLoadFile patientId={patientId} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
