'use client';

import InsertPatientDataForm from "@/app/components/Forms/Posts/InsertPatientData";

export default function InsertPatientPage() {
  const handleSuccess = () => {
    console.log("Paciente registrado con éxito.");
  };

  return (
    <div className="w-screen h-screen overflow-y-auto bg-gray-100">
      <InsertPatientDataForm onSuccess={handleSuccess} />
    </div>
  );
}
