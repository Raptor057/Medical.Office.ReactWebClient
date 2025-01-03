// 'use client';

import React, { useState } from "react";
import CalendarMonthView from "@/app/components/Configurations/Gets/Calendar/CalendarMonthView";
import CalendarWeekView from "@/app/components/Configurations/Gets/Calendar/CalendarWeekView";
import CalendarDayView from "@/app/components/Configurations/Gets/Calendar/CalendarDayView";
import { Typography, Button } from "@material-tailwind/react";

export default function CalendarLayoutCalendarLayout() {
  const [viewMode, setViewMode] = useState("month");

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg">
        {/* Header para cambiar entre vistas */}
        <div className="flex justify-between p-4">
          <Typography variant="h4" color="blue-gray" className="font-bold">
            Vista del Calendario
          </Typography>
          <div className="space-x-2">
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
          </div>
        </div>

        {/* Renderizar componentes basados en el modo de vista */}
        <div className="p-4">
          {viewMode === "month" && <CalendarMonthView />}
          {viewMode === "week" && <CalendarWeekView />}
          {viewMode === "day" && <CalendarDayView />}
        </div>
      </div>
    </div>
  );
}
