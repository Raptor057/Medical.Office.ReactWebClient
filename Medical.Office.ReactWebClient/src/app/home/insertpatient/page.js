'use client';

//import HomeLayout from './home-layout'; // Ajusta la ruta según la estructura de tu proyecto
import InsertPatient from '../../components/Forms/Posts/InsertPatientData'
import InsertActiveMedications from '../../components/Forms/Posts/InsertActiveMedications'
import InsertFamilyHistoryForm from '@/app/components/Forms/Posts/InsertFamilyHistory';
import InsertMedicalHistoryNotesForm from '@/app/components/Forms/Posts/InsertMedicalHistoryNotes';
import InsertNonPathologicalHistoryForm from '@/app/components/Forms/Posts/InsertNonPathologicalHistory';
import InsertOfficeSetupForm from '@/app/components/Configurations/Posts/InsertOfficeSetup';
import InsertPathologicalBackgroundForm from '@/app/components/Forms/Posts/InsertPathologicalBackground';
import InsertPatientAllergiesForm from '@/app/components/Forms/Posts/InsertPatientAllergies';
import InsertPsychiatricHistoryForm from '@/app/components/Forms/Posts/InsertPsychiatricHistory';
import RegisterUsersForm from '@/app/components/Configurations/Posts/RegisterUsers';
import UpdateLaboralDaysForm from '@/app/components/Configurations/Patchs/UpdateLaboralDays';

export default function HomePage() {
  return (
    <div>
      <div>
        <InsertPatient/>
      </div>
        <div>
          <InsertActiveMedications/>
        </div>
        <div>
          <InsertFamilyHistoryForm/>
        </div>
        <div>
          <InsertMedicalHistoryNotesForm/>
        </div>
        <div>
          <InsertNonPathologicalHistoryForm/>
        </div>
        <div>
          <InsertOfficeSetupForm/>
        </div>
        <div>
          <InsertPathologicalBackgroundForm/>
        </div>
      <div>
        <InsertPatientAllergiesForm/>
      </div>
      <div>
        <InsertPsychiatricHistoryForm/>
      </div>
      <div>
        <RegisterUsersForm/>
      </div>
      <div>
        <UpdateLaboralDaysForm/>
      </div>

    </div>
  );
}

// ejemplo de como hacer la solicitud 
// <InsertFamilyHistoryForm
//   onSubmit={(data) => {
//     const finalData = { ...data, idPatient: somePatientId };
//     console.log(finalData);
//     // Aquí puedes hacer tu solicitud POST
//   }}
// />
