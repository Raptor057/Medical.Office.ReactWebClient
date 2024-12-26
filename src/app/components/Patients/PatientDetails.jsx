import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export function PatientDetails({ patientData, onEdit, onInsert }) {
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

      {/* Medicamentos Activos */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Medicamentos Activos
        </Typography>
        <Typography variant="small" color="gray">
          {activeMedications?.activeMedicationsData || "Sin medicamentos reportados."}
        </Typography>
      </CardBody>

      {/* Notas del Historial Médico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Notas del Historial Médico
        </Typography>
        <Typography variant="small" color="gray">
          {medicalHistoryNotes?.medicalHistoryNotesData || "Sin notas registradas."}
        </Typography>
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

      {/* Antecedentes Patológicos */}
<CardBody className="space-y-4">
  <Typography variant="h5" color="blue-gray" className="font-semibold">
    Antecedentes Patológicos
  </Typography>
  <div className="flex flex-wrap gap-2">
    <Chip
      value="Hospitalización Previa"
      color={pathologicalBackground?.previousHospitalization ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Cirugías Previas"
      color={pathologicalBackground?.previousSurgeries ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Diabetes"
      color={pathologicalBackground?.diabetes ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Hipertensión"
      color={pathologicalBackground?.hypertension ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Cardiopatías"
      color={pathologicalBackground?.cardiopathies ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Cáncer"
      color={pathologicalBackground?.cancer ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Tuberculosis"
      color={pathologicalBackground?.tuberculosis ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Enfermedad Renal Crónica"
      color={pathologicalBackground?.chronicKidneyDisease ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Enfermedades Respiratorias"
      color={pathologicalBackground?.respiratoryDiseases ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Enfermedades Gastrointestinales"
      color={pathologicalBackground?.gastrointestinalDiseases ? "green" : "gray"}
      variant="ghost"
    />
    <Chip
      value="Enfermedades de Transmisión Sexual"
      color={pathologicalBackground?.stDs ? "green" : "gray"}
      variant="ghost"
    />
  </div>
  <Typography variant="small" color="gray">
    Detalles de ETS: {pathologicalBackground?.stDsData || "N/A"}
  </Typography>
  <Typography variant="small" color="gray">
    Otros: {pathologicalBackground?.others || "N/A"}
  </Typography>
</CardBody>



      {/* Historial No Patológico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Historial No Patológico
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Typography variant="small" color="gray">
            Actividad Física: {nonPathologicalHistory?.physicalActivity ? "Sí" : "No"}
          </Typography>
          <Typography variant="small" color="gray">
            Fuma: {nonPathologicalHistory?.smoking ? "Sí" : "No"}
          </Typography>
          <Typography variant="small" color="gray">
            Alcoholismo: {nonPathologicalHistory?.alcoholism ? "Sí" : "No"}
          </Typography>
          <Typography variant="small" color="gray">
            Abuso de Sustancias:{" "}
            {nonPathologicalHistory?.substanceAbuse ? "Sí" : "No"}
          </Typography>
        </div>
        <Typography variant="small" color="gray">
          Vacunación Reciente:{" "}
          {nonPathologicalHistory?.recentVaccination ? "Sí" : "No"}
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

      {/* Historial Psiquiátrico */}
      <CardBody className="space-y-4">
        <Typography variant="h5" color="blue-gray" className="font-semibold">
          Historial Psiquiátrico
        </Typography>
        <Typography variant="small" color="gray">
          Áreas Afectadas: {psychiatricHistory?.affectedAreas || "N/A"}
        </Typography>
        <Typography variant="small" color="gray">
          Tratamientos Pasados y Actuales:{" "}
          {psychiatricHistory?.pastAndCurrentTreatments || "N/A"}
        </Typography>
        <Typography variant="small" color="gray">
          Apoyo Familiar y Social:{" "}
          {psychiatricHistory?.familySocialSupport ? "Sí" : "No"}
        </Typography>
      </CardBody>

      {/* Botones de Acción */}
      {/* <CardBody className="flex justify-end gap-4">
        <Link href={"/home/patients/list/patienthistory/insert"}>
          <Button
            color="green"
            variant="filled"
            onClick={onInsert}
            className="w-32"
          >
            Insertar
          </Button>
        </Link>

        <Button
          color="blue"
          variant="filled"
          onClick={onEdit}
          className="w-32"
        >
          Editar
        </Button>
      </CardBody> */}
    </Card>
  );
}
