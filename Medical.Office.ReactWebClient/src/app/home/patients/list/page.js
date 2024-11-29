'use client';

import InsertPatient from '@/app/components/Forms/Posts/InsertPatientData';
import InsertActiveMedicationsForm from '@/app/components/Forms/Posts/InsertActiveMedications';
import InsertFamilyHistoryForm from '@/app/components/Forms/Posts/InsertFamilyHistory';
import InsertMedicalHistoryNotesForm from '@/app/components/Forms/Posts/InsertMedicalHistoryNotes';
import InsertNonPathologicalHistoryForm from '@/app/components/Forms/Posts/InsertNonPathologicalHistory';
import InsertPathologicalBackgroundForm from '@/app/components/Forms/Posts/InsertPathologicalBackground';
import InsertPatientAllergiesForm from '@/app/components/Forms/Posts/InsertPatientAllergies';
import InsertPatientDataForm from '@/app/components/Forms/Posts/InsertPatientData';
import InsertPsychiatricHistoryForm from '@/app/components/Forms/Posts/InsertPsychiatricHistory';



export default function HomePage() {
  return (
    <div>
      <div>
        <InsertActiveMedicationsForm />
      </div>
      <br/> 

      <div>
        <InsertFamilyHistoryForm />
      </div>
      <br/>

      <div>
        <InsertPathologicalBackgroundForm />
      </div>

      <br/>
      <div>
        <InsertNonPathologicalHistoryForm />
      </div>
      <br/>
      <div>
        <InsertPatientAllergiesForm />
      </div>

      <br/>
      <div>
        <InsertPatientDataForm />
      </div>

      <br/>
      <div>
        <InsertPsychiatricHistoryForm />
      </div>

    </div>
  );
}
