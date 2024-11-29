'use client';

import InsertPatientDataForm from "@/app/components/Forms/Posts/InsertPatientData";

export default function InsertPatientPage() {
  const handleSuccess = () => {
    console.log("Paciente registrado con éxito.");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <InsertPatientDataForm onSuccess={handleSuccess} />
    </div>
  );
}
