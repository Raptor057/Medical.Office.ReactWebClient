'use client';

import React, { useState } from "react";
import CalendarMonthView from "@/app/components/Configurations/Gets/Calendar/CalendarMonthView";
import CalendarWeekView from "@/app/components/Configurations/Gets/Calendar/CalendarWeekView";
import CalendarDayView from "@/app/components/Configurations/Gets/Calendar/CalendarDayView";
import GoogleCalendar from "@/app/components/Configurations/Gets/Calendar/GoogleCalendar";
import { Typography, Button } from "@material-tailwind/react";

export default function CalendarLayout() {
  const [viewMode, setViewMode] = useState("month");
  const [useGoogleCalendar, setUseGoogleCalendar] = useState(false);

  const isActiveView = (mode) =>
    `px-4 py-2 text-sm rounded-md transition-colors ${
      viewMode === mode ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
    }`;

  return (
    <div className="w-full h-full px-4 py-8 bg-gray-100">
      <div className="mx-auto bg-white shadow max-w-7xl rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Typography variant="h4" color="blue-gray" className="font-semibold">
            Calendario de Citas
          </Typography>

          <div className="flex gap-2">
            {!useGoogleCalendar && (
              <>
                <Button onClick={() => setViewMode("month")} className={isActiveView("month")}>
                  Mes
                </Button>
                <Button onClick={() => setViewMode("week")} className={isActiveView("week")}>
                  Semana
                </Button>
                <Button onClick={() => setViewMode("day")} className={isActiveView("day")}>
                  Día
                </Button>
              </>
            )}
            <Button
              onClick={() => setUseGoogleCalendar(!useGoogleCalendar)}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              {useGoogleCalendar ? "Ver Calendario Interno" : "Ver Google Calendar"}
            </Button>
          </div>
        </div>

        {/* Contenido del calendario */}
        <div className="p-6">
          {useGoogleCalendar ? (
            <GoogleCalendar />
          ) : viewMode === "month" ? (
            <CalendarMonthView />
          ) : viewMode === "week" ? (
            <CalendarWeekView />
          ) : (
            <CalendarDayView />
          )}
        </div>
      </div>
    </div>
  );
}
