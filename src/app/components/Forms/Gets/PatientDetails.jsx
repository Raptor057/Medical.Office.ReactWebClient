import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

export function PatientDetails({ patientData }) {
  if (!patientData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Typography variant="h6" color="red">
          No se encontró información del paciente.
        </Typography>
      </div>
    );
  }

  const {
    patientsData,
    activeMedications,
    familyHistory,
    medicalHistoryNotes,
    nonPathologicalHistory,
    pathologicalBackground,
    patientAllergies,
    psychiatricHistory,
  } = patientData || {};

  return (
    <Card className="w-full p-6 space-y-6 bg-gray-50">
      {/* Header: Foto y Nombre */}
      <CardHeader floated={false} shadow={false} className="flex items-center gap-6">
        <Avatar
          src={
            patientsData?.photo
              ? `data:image/jpeg;base64,${patientsData.photo}`
              : "https://via.placeholder.com/150"
          }
          alt={`${patientsData?.name || "N/A"} ${
            patientsData?.fathersSurname || ""
          }`}
          size="xl"
          className="w-32 h-32"
        />
        <div>
          <Typography variant="h4" color="blue-gray" className="font-bold">
            {`${patientsData?.name || "N/A"} ${
              patientsData?.fathersSurname || ""
            } ${patientsData?.mothersSurname || ""}`}
          </Typography>
          <Typography variant="small" color="gray" className="opacity-70">
            Fecha de Nacimiento:{" "}
            {patientsData?.dateOfBirth
              ? new Date(patientsData.dateOfBirth).toLocaleDateString("es-MX")
              : "N/A"}
          </Typography>
          <Typography variant="small" color="gray" className="opacity-70">
            Género: {patientsData?.gender?.trim() || "N/A"}
          </Typography>
        </div>
      </CardHeader>

      {/* Información de Contacto */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Información de Contacto
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Typography variant="small" color="gray">
            Dirección: {patientsData?.address || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            País: {patientsData?.country || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            Ciudad: {patientsData?.city || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            Teléfono: {patientsData?.phoneNumber || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            Correo Electrónico: {patientsData?.email || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            Contacto de Emergencia: {patientsData?.emergencyContactName || "N/A"}
          </Typography>
          <Typography variant="small" color="gray">
            Teléfono de Emergencia: {patientsData?.emergencyContactPhone || "N/A"}
          </Typography>
        </div>
      </CardBody>

      {/* Antecedentes Familiares */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Antecedentes Familiares
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Chip
            value="Diabetes"
            color={familyHistory?.diabetes ? "green" : "gray"}
            variant="ghost"
          />
          <Chip
            value="Cardiopatías"
            color={familyHistory?.cardiopathies ? "green" : "gray"}
            variant="ghost"
          />
          <Chip
            value="Hipertensión"
            color={familyHistory?.hypertension ? "green" : "gray"}
            variant="ghost"
          />
          <Chip
            value="Enfermedades de Tiroides"
            color={familyHistory?.thyroidDiseases ? "green" : "gray"}
            variant="ghost"
          />
          <Chip
            value="Enfermedad Renal Crónica"
            color={familyHistory?.chronicKidneyDisease ? "green" : "gray"}
            variant="ghost"
          />
          <Chip
            value="Otros"
            color={familyHistory?.others ? "green" : "gray"}
            variant="ghost"
          />
        </div>
        <Typography variant="small" color="gray">
          Detalles: {familyHistory?.othersData || "N/A"}
        </Typography>
      </CardBody>

      {/* Alergias */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Alergias
        </Typography>
        <Typography variant="small" color="gray">
          {patientAllergies?.allergies || "Sin alergias reportadas."}
        </Typography>
      </CardBody>

      {/* Medicamentos Activos */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Medicamentos Activos
        </Typography>
        <Typography variant="small" color="gray">
          {activeMedications?.activeMedicationsData || "Sin medicamentos reportados."}
        </Typography>
      </CardBody>

      {/* Historia Psiquiátrica */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Historia Psiquiátrica
        </Typography>
        <Typography variant="small" color="gray">
          {psychiatricHistory?.pastAndCurrentTreatments || "Sin historial psiquiátrico."}
        </Typography>
      </CardBody>
    </Card>
  );
}
