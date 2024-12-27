'use client';

import React from "react";
import { Typography } from "@material-tailwind/react";

export default function UsersConfiguration() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg">
        <Typography variant="h3" color="blue-gray" className="font-bold text-center">
          Configuración de Usarios
        </Typography>
        <Typography color="gray" className="text-center mt-4">
          Aquí podrás gestionar los datos de los usuarios, incluyendo agregar, editar o eliminar información.
        </Typography>
      </div>
    </div>
  );
}
