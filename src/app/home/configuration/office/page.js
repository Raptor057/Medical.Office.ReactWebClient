'use client';

import React from "react";
import { Typography } from "@material-tailwind/react";
import InsertOfficeSetupForm from "@/app/components/Configurations/Posts/InsertOfficeSetup";

export default function OfficeConfiguration() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h3" color="blue-gray" className="font-bold text-center">
          Configuración de Oficina
        </Typography>
        <Typography color="gray" className="text-center mt-4">
          Aquí podrás gestionar los datos de la oficina, incluyendo agregar, editar o eliminar información.
        </Typography>
        <InsertOfficeSetupForm />
      </div>
    </div>
  );
}
