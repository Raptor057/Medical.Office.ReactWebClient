// 'use client';

// import React from "react";
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Typography,
// } from "@material-tailwind/react";
// import InsertActiveMedicationsForm from "@/app/components/Forms/Posts/InsertActiveMedications";
// import InsertFamilyHistoryForm from "@/app/components/Forms/Posts/InsertFamilyHistory";
// import InsertMedicalHistoryNotesForm from "@/app/components/Forms/Posts/InsertMedicalHistoryNotes";
// import InsertNonPathologicalHistoryForm from "@/app/components/Forms/Posts/InsertNonPathologicalHistory";
// import InsertPathologicalBackgroundForm from "@/app/components/Forms/Posts/InsertPathologicalBackground";
// import InsertPatientAllergiesForm from "@/app/components/Forms/Posts/InsertPatientAllergies";
// import InsertPsychiatricHistoryForm from "@/app/components/Forms/Posts/InsertPsychiatricHistory";
// import InsertLoadFile from "@/app/components/Forms/Posts/InsertLoadFile";
// import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

// export default function PatientInsertForms() {
//   return (
//     <Card className="w-full p-6 space-y-6 bg-gray-50">
//       <CardHeader floated={false} shadow={false}>
//         <Typography variant="h4" color="blue-gray" className="font-bold text-center">
//           Registro de Datos del Paciente
//         </Typography>
//         <Typography color="gray" className="mt-1 text-center">
//           Completa las siguientes secciones para registrar la información del paciente.
//         </Typography>
//       </CardHeader>

//       {/* Layout de Grid para agrupar los formularios */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
//         {/* Sección: Medicamentos Activos */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Medicamentos Activos
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Registra los medicamentos actuales del paciente.
//           </Typography>
//           <InsertActiveMedicationsForm />
//         </div>

//         {/* Sección: Antecedentes Familiares */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Antecedentes Familiares
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Registra antecedentes familiares relevantes.
//           </Typography>
//           <InsertFamilyHistoryForm />
//         </div>

//         {/* Sección: Notas del Historial Médico */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Notas del Historial Médico
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Agrega notas relevantes al historial médico del paciente.
//           </Typography>
//           <InsertMedicalHistoryNotesForm />
//         </div>

//         {/* Sección: Antecedentes Patológicos */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Antecedentes Patológicos
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Completa información sobre antecedentes patológicos del paciente.
//           </Typography>
//           <InsertPathologicalBackgroundForm />
//         </div>

//         {/* Sección: Historial No Patológico */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Historial No Patológico
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Ingresa detalles relacionados con hábitos y estilo de vida.
//           </Typography>
//           <InsertNonPathologicalHistoryForm />
//         </div>

//         {/* Sección: Alergias del Paciente */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Alergias del Paciente
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Registra alergias conocidas del paciente.
//           </Typography>
//           <InsertPatientAllergiesForm />
//         </div>

//         {/* Sección: Historial Psiquiátrico */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Historial Psiquiátrico
//           </Typography>
//           <Typography color="gray" className="text-sm">
//             Ingresa detalles del historial psiquiátrico del paciente.
//           </Typography>
//           <InsertPsychiatricHistoryForm />
//         </div>

//         {/* Sección: Subir Archivo */}
//         <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
//           <Typography variant="h5" color="blue-gray" className="font-semibold">
//             Subir Archivo
//           </Typography>
//           <InsertLoadFile />
//         </div>

//       </div>
//     </Card>
//   );
// }

'use client';

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Importamos useSearchParams
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import InsertActiveMedicationsForm from "@/app/components/Forms/Posts/InsertActiveMedications";
import InsertFamilyHistoryForm from "@/app/components/Forms/Posts/InsertFamilyHistory";
import InsertMedicalHistoryNotesForm from "@/app/components/Forms/Posts/InsertMedicalHistoryNotes";
import InsertNonPathologicalHistoryForm from "@/app/components/Forms/Posts/InsertNonPathologicalHistory";
import InsertPathologicalBackgroundForm from "@/app/components/Forms/Posts/InsertPathologicalBackground";
import InsertPatientAllergiesForm from "@/app/components/Forms/Posts/InsertPatientAllergies";
import InsertPsychiatricHistoryForm from "@/app/components/Forms/Posts/InsertPsychiatricHistory";
import InsertLoadFile from "@/app/components/Forms/Posts/InsertLoadFile";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function PatientInsertForms() {
  const [patientId, setPatientId] = useState(null);

  const searchParams = useSearchParams(); // Usamos useSearchParams para acceder a los parámetros de la URL

  useEffect(() => {
    const id = searchParams.get('id'); // Extraemos el valor de 'id' de la URL
    if (id) {
      setPatientId(id); // Establecemos el patientId en el estado
    }
  }, [searchParams]);

  // Verificamos si patientId está presente
  if (!patientId) {
    return <div>Cargando...</div>; // Si no hay ID, mostramos un mensaje de carga
  }

  const handleInsert = async () => {
    try {
      // Llamada a la API para insertar todos los datos
      await MedicalOfficeWebApi.insertActiveMedications({
        IDPatient: patientId,
        ActiveMedicationsData: "Medication details here",
      });

      await MedicalOfficeWebApi.insertFamilyHistory({
        IDPatient: patientId,
        Diabetes: true,
        Cardiopathies: false,
        Hypertension: true,
        ThyroidDiseases: null,
        ChronicKidneyDisease: false,
        Others: true,
        OthersData: "Family history of asthma",
      });

      await MedicalOfficeWebApi.insertMedicalHistoryNotes({
        IDPatient: patientId,
        MedicalHistoryNotesData: "Patient has a history of hypertension and diabetes.",
      });

      await MedicalOfficeWebApi.insertNonPathologicalHistory({
        IDPatient: patientId,
        PhysicalActivity: true,
        Smoking: false,
        Alcoholism: false,
        SubstanceAbuse: true,
        SubstanceAbuseData: "Occasional marijuana use",
        RecentVaccination: true,
        RecentVaccinationData: "COVID-19 vaccine",
        Others: false,
        OthersData: null,
      });

      await MedicalOfficeWebApi.insertPathologicalBackground({
        IDPatient: patientId,
        PreviousHospitalization: true,
        PreviousSurgeries: false,
        Diabetes: true,
        ThyroidDiseases: null,
        Hypertension: true,
        Cardiopathies: false,
        Trauma: false,
        Cancer: false,
        Tuberculosis: false,
        Transfusions: false,
        RespiratoryDiseases: true,
        GastrointestinalDiseases: false,
        STDs: true,
        STDsData: "History of chlamydia",
      });

      await MedicalOfficeWebApi.insertPatientAllergies({
        IDPatient: patientId,
        Allergies: "Peanuts, Penicillin",
      });

      await MedicalOfficeWebApi.insertPsychiatricHistory({
        IDPatient: patientId,
        FamilyHistory: true,
        FamilyHistoryData: "History of bipolar disorder in the family",
        AffectedAreas: "Mood, behavior",
        PastAndCurrentTreatments: "Cognitive behavioral therapy, medication",
        FamilySocialSupport: true,
        FamilySocialSupportData: "Strong support from immediate family",
        WorkLifeAspects: "Occasional stress at work",
        SocialLifeAspects: "Active social life",
        AuthorityRelationship: "Good relationship with authority figures",
        ImpulseControl: "Moderate",
        FrustrationManagement: "Needs improvement",
      });

      alert('Datos del paciente insertados correctamente');
    } catch (err) {
      console.error('Error al insertar datos del paciente:', err);
      alert('Error al insertar los datos del paciente.');
    }
  };

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

      {/* Layout de Grid para agrupar los formularios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Sección: Medicamentos Activos */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Medicamentos Activos
          </Typography>
          <Typography color="gray" className="text-sm">
            Registra los medicamentos actuales del paciente.
          </Typography>
          <InsertActiveMedicationsForm patientId={patientId} />
        </div>

        {/* Sección: Antecedentes Familiares */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Antecedentes Familiares
          </Typography>
          <Typography color="gray" className="text-sm">
            Registra antecedentes familiares relevantes.
          </Typography>
          <InsertFamilyHistoryForm patientId={patientId} />
        </div>

        {/* Sección: Notas del Historial Médico */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Notas del Historial Médico
          </Typography>
          <Typography color="gray" className="text-sm">
            Agrega notas relevantes al historial médico del paciente.
          </Typography>
          <InsertMedicalHistoryNotesForm patientId={patientId} />
        </div>

        {/* Sección: Antecedentes Patológicos */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Antecedentes Patológicos
          </Typography>
          <Typography color="gray" className="text-sm">
            Completa información sobre antecedentes patológicos del paciente.
          </Typography>
          <InsertPathologicalBackgroundForm patientId={patientId} />
        </div>

        {/* Sección: Historial No Patológico */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Historial No Patológico
          </Typography>
          <Typography color="gray" className="text-sm">
            Ingresa detalles relacionados con hábitos y estilo de vida.
          </Typography>
          <InsertNonPathologicalHistoryForm patientId={patientId} />
        </div>

        {/* Sección: Alergias del Paciente */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Alergias del Paciente
          </Typography>
          <Typography color="gray" className="text-sm">
            Registra alergias conocidas del paciente.
          </Typography>
          <InsertPatientAllergiesForm patientId={patientId} />
        </div>

        {/* Sección: Historial Psiquiátrico */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Historial Psiquiátrico
          </Typography>
          <Typography color="gray" className="text-sm">
            Ingresa detalles del historial psiquiátrico del paciente.
          </Typography>
          <InsertPsychiatricHistoryForm patientId={patientId} />
        </div>

        {/* Sección: Subir Archivo */}
        <div className="flex flex-col bg-white p-4 rounded-lg shadow-md">
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Subir Archivo
          </Typography>
          <InsertLoadFile patientId={patientId} />
        </div>

      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleInsert}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Guardar Datos
        </button>
      </div>
    </Card>
  );
}
