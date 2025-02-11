// // 'use client';

// import React, { useState } from "react";
// import CalendarMonthView from "@/app/components/Configurations/Gets/Calendar/CalendarMonthView";
// import CalendarWeekView from "@/app/components/Configurations/Gets/Calendar/CalendarWeekView";
// import CalendarDayView from "@/app/components/Configurations/Gets/Calendar/CalendarDayView";
// import GoogleCalendar from "@/app/components/Configurations/Gets/Calendar/GoogleCalendar";
// import { Typography, Button } from "@material-tailwind/react";

// export default function CalendarLayoutCalendarLayout() {
//   const [viewMode, setViewMode] = useState("month");

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-gray-50">
//       <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
//         {/* Header para cambiar entre vistas */}
//         <div className="flex justify-between p-4">
//           <Typography variant="h4" color="blue-gray" className="font-bold">
//             Vista del Calendario
//           </Typography>
//           <div className="space-x-2">
//             <Button
//               onClick={() => setViewMode("month")}
//               className={`p-2 rounded ${
//                 viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               Mes
//             </Button>
//             <Button
//               onClick={() => setViewMode("week")}
//               className={`p-2 rounded ${
//                 viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               Semana
//             </Button>
//             <Button
//               onClick={() => setViewMode("day")}
//               className={`p-2 rounded ${
//                 viewMode === "day" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
//               }`}
//             >
//               Día
//             </Button>
//           </div>
//         </div>

//         {/* Renderizar componentes basados en el modo de vista */}
//         <div className="p-4">
//           {viewMode === "month" && <CalendarMonthView />}
//           {viewMode === "week" && <CalendarWeekView />}
//           {viewMode === "day" && <CalendarDayView />}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import CalendarMonthView from "@/app/components/Configurations/Gets/Calendar/CalendarMonthView";
import CalendarWeekView from "@/app/components/Configurations/Gets/Calendar/CalendarWeekView";
import CalendarDayView from "@/app/components/Configurations/Gets/Calendar/CalendarDayView";
import GoogleCalendar from "@/app/components/Configurations/Gets/Calendar/GoogleCalendar";

import { Typography, Button } from "@material-tailwind/react";

export default function CalendarLayout() {
  const [viewMode, setViewMode] = useState("month");
  const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-gray-50">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
        {/* Header para cambiar entre vistas */}
        <div className="flex justify-between p-4">
          <Typography variant="h4" color="blue-gray" className="font-bold">
            Vista del Calendario
          </Typography>
          <div className="space-x-2">
            {!useGoogleCalendar && (
              <>
                <Button
                  onClick={() => setViewMode("month")}
                  className={`p-2 rounded ${
                    viewMode === "month" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Mes
                </Button>
                <Button
                  onClick={() => setViewMode("week")}
                  className={`p-2 rounded ${
                    viewMode === "week" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Semana
                </Button>
                <Button
                  onClick={() => setViewMode("day")}
                  className={`p-2 rounded ${
                    viewMode === "day" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Día
                </Button>
              </>
            )}
            {/* Botón para alternar entre el calendario propio y el de Google */}
            <Button
              onClick={() => setUseGoogleCalendar(!useGoogleCalendar)}
              className="p-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              {useGoogleCalendar ? "Ver Calendario Interno" : "Ver Google Calendar"}
            </Button>
          </div>
        </div>

        {/* Renderizar Google Calendar o el calendario interno */}
        <div className="p-4">
          {useGoogleCalendar ? (
            <GoogleCalendar />
          ) : (
            <>
              {viewMode === "month" && <CalendarMonthView />}
              {viewMode === "week" && <CalendarWeekView />}
              {viewMode === "day" && <CalendarDayView />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
