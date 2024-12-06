import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Divider,
} from "@material-tailwind/react";
import InsertActiveMedicationsForm from "@/app/components/Forms/Posts/InsertActiveMedications";
import InsertFamilyHistoryForm from "@/app/components/Forms/Posts/InsertFamilyHistory";
import InsertMedicalHistoryNotesForm from "@/app/components/Forms/Posts/InsertMedicalHistoryNotes";
import InsertNonPathologicalHistoryForm from "@/app/components/Forms/Posts/InsertNonPathologicalHistory";
import InsertPathologicalBackgroundForm from "@/app/components/Forms/Posts/InsertPathologicalBackground";
import InsertPatientAllergiesForm from "@/app/components/Forms/Posts/InsertPatientAllergies";
import InsertPsychiatricHistoryForm from "@/app/components/Forms/Posts/InsertPsychiatricHistory";
import InsertLoadFile from "@/app/components/Forms/Posts/InsertLoadFile";


export default function PatientInsertForms() {
  return (
    <Card className="w-full p-6 space-y-6 bg-gray-50">
      <CardHeader floated={false} shadow={false}>
        <Typography variant="h4" color="blue-gray" className="font-bold text-center">
          Registro de Datos del Paciente
        </Typography>
        <Typography color="gray" className="mt-1 text-center">
          Completa las siguientes secciones para registrar la información del paciente.
        </Typography>
      </CardHeader>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Medicamentos Activos */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Medicamentos Activos
        </Typography>
        <Typography color="gray" className="text-sm">
          Registra los medicamentos actuales del paciente.
        </Typography>
        <InsertActiveMedicationsForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Antecedentes Familiares */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Antecedentes Familiares
        </Typography>
        <Typography color="gray" className="text-sm">
          Registra antecedentes familiares relevantes.
        </Typography>
        <InsertFamilyHistoryForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Notas del Historial Médico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Notas del Historial Médico
        </Typography>
        <Typography color="gray" className="text-sm">
          Agrega notas relevantes al historial médico del paciente.
        </Typography>
        <InsertMedicalHistoryNotesForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Antecedentes Patológicos */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Antecedentes Patológicos
        </Typography>
        <Typography color="gray" className="text-sm">
          Completa información sobre antecedentes patológicos del paciente.
        </Typography>
        <InsertPathologicalBackgroundForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Historial No Patológico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Historial No Patológico
        </Typography>
        <Typography color="gray" className="text-sm">
          Ingresa detalles relacionados con hábitos y estilo de vida.
        </Typography>
        <InsertNonPathologicalHistoryForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Alergias del Paciente */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Alergias del Paciente
        </Typography>
        <Typography color="gray" className="text-sm">
          Registra alergias conocidas del paciente.
        </Typography>
        <InsertPatientAllergiesForm />
      </CardBody>
      <div className="my-4 border-t border-blue-gray-100"></div>

      {/* Sección: Historial Psiquiátrico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Historial Psiquiátrico
        </Typography>
        <Typography color="gray" className="text-sm">
          Ingresa detalles del historial psiquiátrico del paciente.
        </Typography>
        <InsertPsychiatricHistoryForm />
      </CardBody>
    </Card>
  );
}
