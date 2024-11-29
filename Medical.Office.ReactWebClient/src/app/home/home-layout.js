import React, { useState } from "react";
import { MultiLevelSidebar } from "../components/sidebar";
import { PatientsList } from "../components/Patients/PatientsList";

export default function HomeLayout() {
  const [currentView, setCurrentView] = useState("default");

  const renderView = () => {
    switch (currentView) {
      case "patients":
        return <PatientsList />;
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Bienvenido</h2>
            <p>Selecciona una opción del menú lateral para empezar.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 border-r">
          <MultiLevelSidebar setCurrentView={setCurrentView} />
        </aside>
        <main className="flex-grow p-6 bg-white">{renderView()}</main>
      </div>
    </div>
  );
}
