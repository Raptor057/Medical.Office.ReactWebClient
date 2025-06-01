import React, { useState, useEffect } from "react";
import { MultiLevelSidebar } from "../components/sidebar";
import { PatientsList } from "../components/Patients/PatientsList";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import CalendarLayoutCalendarLayout from "@/app/components/Configurations/Gets/Calendar/CalendarLayout";

export default function HomeLayout() {
  const [currentView, setCurrentView] = useState("default");
  const [officeConfig, setOfficeConfig] = useState({
    nameOfOffice: "N/A",
    address: "N/A",
    todaysWorkingHours: {
      days: "No Registrado",
      laboral: false,
      openingTime: "N/A",
      closingTime: "N/A",
    },
  });

  useEffect(() => {
    const loadConfiguration = async () => {
      try {
        const data = await MedicalOfficeWebApi.getAllConfigurations();
        const { officeSetup, todaysWorkingHours } = data.allConfigurations;
        setOfficeConfig({
          nameOfOffice: officeSetup?.nameOfOffice || "N/A",
          address: officeSetup?.address || "N/A",
          todaysWorkingHours: {
            days: todaysWorkingHours?.days || "No Registrado",
            laboral: todaysWorkingHours?.laboral || false,
            openingTime: todaysWorkingHours?.openingTime || "N/A",
            closingTime: todaysWorkingHours?.closingTime || "N/A",
          },
        });
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
      }
    };
    loadConfiguration();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "patients":
        return <PatientsList />;
      default:
        return (
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{officeConfig.nameOfOffice}</h2>
            <p className="text-sm text-gray-600">Dirección: {officeConfig.address}</p>
            <div>
              <strong>Horario del día:</strong>
              <p className="text-sm text-gray-600">Día: {officeConfig.todaysWorkingHours.days}</p>
              <p className="text-sm text-gray-600">
                Horario: {officeConfig.todaysWorkingHours.laboral
                  ? `${officeConfig.todaysWorkingHours.openingTime} - ${officeConfig.todaysWorkingHours.closingTime}`
                  : "No Laboral"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 h-screen bg-white border-r">
        <MultiLevelSidebar setCurrentView={setCurrentView} />
      </aside>

      <div className="flex flex-col flex-1">
        <header className="px-6 py-4 bg-white border-b border-gray-200 shrink-0">
          {renderView()}
        </header>

        <main className="flex-1 px-6 py-8 overflow-y-auto bg-gray-50">
          <CalendarLayoutCalendarLayout />
        </main>
      </div>
    </div>
  );
}
