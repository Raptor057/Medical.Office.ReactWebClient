// import React, { useState, useEffect } from "react";
// import { MultiLevelSidebar } from "../components/sidebar";
// import { PatientsList } from "../components/Patients/PatientsList";

// import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; //"../utils/HttpRequests";
// import CalendarLayoutCalendarLayout from "@/app/components/Configurations/Gets/Calendar/CalendarLayout"; //"../components/Configurations/Gets/Calendar/CalendarLayout";

// export default function HomeLayout() {
//   const [currentView, setCurrentView] = useState("default");
//   const [officeConfig, setOfficeConfig] = useState({
//     nameOfOffice: "N/A",
//     address: "N/A",
//     todaysWorkingHours: {
//       days: "No Registrado",
//       laboral: false,
//       openingTime: "N/A",
//       closingTime: "N/A",
//     },
//   });

//   useEffect(() => {
//     // Cargar configuración al montar el componente
//     const loadConfiguration = async () => {
//       try {
//         const data = await MedicalOfficeWebApi.getAllConfigurations();
//         const { officeSetup, todaysWorkingHours } = data.allConfigurations;
//         setOfficeConfig({
//           nameOfOffice: officeSetup?.nameOfOffice || "N/A",
//           address: officeSetup?.address || "N/A",
//           todaysWorkingHours: {
//             days: todaysWorkingHours?.days || "No Registrado",
//             laboral: todaysWorkingHours?.laboral || false,
//             openingTime: todaysWorkingHours?.openingTime || "N/A",
//             closingTime: todaysWorkingHours?.closingTime || "N/A",
//           },
//         });
//       } catch (error) {
//         console.error("Error al cargar la configuración:", error);
//       }
//     };
//     loadConfiguration();
//   }, []);

//   const renderView = () => {
//     switch (currentView) {
//       case "patients":
//         return <PatientsList />;
//       default:
//         return (
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">
//               {officeConfig.nameOfOffice}
//             </h2>
//             <p className="text-sm text-gray-600">
//               Dirección: {officeConfig.address}
//             </p>
//             <p className="mt-4">
//               <strong>Horario del día:</strong>
//             </p>
//             <p className="text-sm text-gray-600">
//               Día: {officeConfig.todaysWorkingHours.days}
//             </p>
//             <p className="text-sm text-gray-600">
//               Horario: {" "}
//               {officeConfig.todaysWorkingHours.laboral
//                 ? `${officeConfig.todaysWorkingHours.openingTime} - ${officeConfig.todaysWorkingHours.closingTime}`
//                 : "No Laboral"}
//             </p>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="flex flex-grow">
//         <aside className="w-64 bg-gray-200 border-r">
//           <MultiLevelSidebar setCurrentView={setCurrentView} />
//         </aside>
//         <main className="flex-grow p-6 space-y-6 bg-white">
//           {renderView()}
//           <div className="p-6 bg-white rounded-lg shadow-md">
//             {/* <MedicalAppointmentCalendar /> */}
//             <CalendarLayoutCalendarLayout />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
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
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{officeConfig.nameOfOffice}</h2>
            <p className="text-sm text-gray-600">Dirección: {officeConfig.address}</p>
            <p className="mt-4">
              <strong>Horario del día:</strong>
            </p>
            <p className="text-sm text-gray-600">Día: {officeConfig.todaysWorkingHours.days}</p>
            <p className="text-sm text-gray-600">
              Horario:{" "}
              {officeConfig.todaysWorkingHours.laboral
                ? `${officeConfig.todaysWorkingHours.openingTime} - ${officeConfig.todaysWorkingHours.closingTime}`
                : "No Laboral"}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex h-full">
        {/* Barra lateral con altura fija al 100% de la pantalla */}
        <aside className="w-64 h-full bg-gray-200 border-r">
          <MultiLevelSidebar setCurrentView={setCurrentView} />
        </aside>

        {/* Contenedor principal con altura ajustada */}
        <main className="w-full h-full p-6 space-y-6 overflow-y-auto bg-white">
          {renderView()}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <CalendarLayoutCalendarLayout />
          </div>
        </main>
      </div>
    </div>
  );
}
