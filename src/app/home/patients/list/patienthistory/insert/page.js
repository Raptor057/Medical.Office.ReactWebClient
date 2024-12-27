'use client';

import dynamic from "next/dynamic";

const PatientFormsDashboard = dynamic(
  () => import("@/app/components/Forms/Posts/PatientFormsDashboard"),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <PatientFormsDashboard />
    </div>
  );
}
