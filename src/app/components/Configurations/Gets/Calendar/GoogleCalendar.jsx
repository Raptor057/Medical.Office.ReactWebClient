'use client';

import React from "react";
import { Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function GoogleCalendar() {
  const calendarId =
    "84c3f9e81d3f2b18946215f08e6913f5031db45f21b23e4583f42798a1e787ac@group.calendar.google.com";
  const timeZone = "America/Matamoros";
  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
    calendarId
  )}&ctz=${encodeURIComponent(timeZone)}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center w-full px-4 py-6 bg-gray-50"
    >
      <Card className="w-full max-w-6xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 text-white bg-blue-500">
          <Typography variant="h5" className="font-bold">
            Google Calendar Integrado
          </Typography>
          <Typography variant="small" className="opacity-80">
            Consulta tu agenda sincronizada directamente desde Google
          </Typography>
        </div>
        <iframe
          src={calendarUrl}
          style={{ border: 0, width: "100%", height: "700px" }}
          frameBorder="0"
          scrolling="no"
          className="rounded-b-md"
        />
      </Card>
    </motion.div>
  );
}
