'use client';

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import InsertLoadFile from '@/app/components/Forms/Posts/InsertLoadFile';
import PatientFilesList from '@/app/components/Forms/Gets/PatientFilesList';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
} from "@material-tailwind/react";

export function PatientDetails({ patientData, onEdit, onInsert }) {
  const searchParams = useSearchParams(); // Hook siempre al inicio
  const patientId = parseInt(searchParams.get("id")) || 0;

  const [openModal, setOpenModal] = useState(false);

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
  patientsData, // Información general del paciente
  activeMedications, // Medicamentos activos
  familyHistory, // Antecedentes familiares
  medicalHistoryNotes, // Notas del historial médico
  nonPathologicalHistory, // Antecedentes no patológicos
  pathologicalBackground, // Antecedentes patológicos
  patientAllergies, // Alergias del paciente
  psychiatricHistory, // Historial psiquiátrico
  medicalAppointmentsActive,
  medicalAppointmentsHistory
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

        {/* Citas Activas */}
<Card className="shadow-lg">
  <CardHeader className="bg-green-500 text-white p-4">
    <Typography variant="h6" color="white">
      Citas Activas
    </Typography>
  </CardHeader>
  <CardBody>
    {medicalAppointmentsActive && medicalAppointmentsActive.length > 0 ? (
      medicalAppointmentsActive.map((appointment) => (
        <div key={appointment.id} className="mb-4 border-b pb-2">
          <Typography variant="h6" color="blue-gray">
            {appointment.typeOfAppointment} - {appointment.reasonForVisit}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Paciente:</strong> {appointment.patientName}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Doctor:</strong> {appointment.doctorName}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Fecha y Hora:</strong>{" "}
            {new Date(appointment.appointmentDateTime).toLocaleString("es-MX")}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Estado:</strong> {appointment.appointmentStatus}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Notas:</strong> {appointment.notes || "Sin notas"}
          </Typography>
        </div>
      ))
    ) : (
      <Typography variant="small" color="gray">
        No hay citas activas para este paciente.
      </Typography>
    )}
  </CardBody>
</Card>

{/* Historial de Citas */}
<Card className="shadow-lg">
  <CardHeader className="bg-gray-500 text-white p-4">
    <Typography variant="h6" color="white">
      Historial de Citas
    </Typography>
  </CardHeader>
  <CardBody>
    {medicalAppointmentsHistory && medicalAppointmentsHistory.length > 0 ? (
      medicalAppointmentsHistory.map((appointment) => (
        <div key={appointment.id} className="mb-4 border-b pb-2">
          <Typography variant="h6" color="blue-gray">
            {appointment.typeOfAppointment} - {appointment.reasonForVisit}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Paciente:</strong> {appointment.patientName}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Doctor:</strong> {appointment.doctorName}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Fecha y Hora:</strong>{" "}
            {new Date(appointment.appointmentDateTime).toLocaleString("es-MX")}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Estado:</strong> {appointment.appointmentStatus}
          </Typography>
          <Typography variant="small" color="gray">
            <strong>Notas:</strong> {appointment.notes || "Sin notas"}
          </Typography>
        </div>
      ))
    ) : (
      <Typography variant="small" color="gray">
        No hay historial de citas para este paciente.
      </Typography>
    )}
  </CardBody>
</Card>

 {/* Subir Archivos */}
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

              {/* Subir Archivos */}
      <Card className="shadow-lg">
          <CardHeader className="bg-blue-500 text-white p-4">
            <Typography variant="h6" color="white">
              Subir Archivos
            </Typography>
          </CardHeader>
          <CardBody>
            <PatientFilesList patientId={patientId} />
          </CardBody>
        </Card>

    </Card>
  );
}
