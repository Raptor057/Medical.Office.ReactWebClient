'use client';

import React from "react";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import InsertOfficeSetupForm from "@/app/components/Configurations/Posts/InsertOfficeSetup";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function OfficeConfiguration() {
  return (
    <div className="w-screen h-screen overflow-y-auto bg-gray-100">
      <div className="flex flex-col px-6 py-10 mx-auto space-y-10 max-w-7xl">
        {/* Botón de regreso */}
        <div className="flex justify-start">
          <Link href="/home">
            <Button className="flex items-center gap-2" color="blue-gray">
              <HomeIcon className="w-5 h-5" /> Inicio
            </Button>
          </Link>
        </div>

        {/* Encabezado */}
        <div className="text-center">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Configuración de Oficina
          </Typography>
          <Typography color="gray" className="mt-2">
            Aquí podrás gestionar los datos de la oficina, incluyendo agregar, editar o eliminar información.
          </Typography>
        </div>

        {/* Formulario */}
        <Card className="w-full shadow-md">
          <CardBody>
            <InsertOfficeSetupForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
