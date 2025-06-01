'use client';

import React from "react";
import Link from "next/link";
import { Typography, Button, Card, CardBody } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";

import InsertDoctorsForm from "@/app/components/Configurations/Posts/InsertDoctorsForm";
import DoctorsList from "@/app/components/Configurations/Gets/DoctorsList";

export default function DoctorsConfiguration() {
  return (
    <div className="w-full min-h-screen px-4 py-10 bg-gray-50 lg:px-12">
      <div className="mx-auto space-y-10 max-w-7xl">

        {/* Botón de regreso */}
        <div className="flex justify-start">
          <Link href="/home">
            <Button className="flex items-center gap-2" color="blue-gray">
              <HomeIcon className="w-5 h-5" />
              Inicio
            </Button>
          </Link>
        </div>

        {/* Título principal */}
        <div className="text-center">
          <Typography variant="h3" color="blue-gray" className="font-bold">
            Configuración de Doctores
          </Typography>
          <Typography color="gray" className="mt-2">
            Gestiona la información del personal médico: agrega, edita o revisa los registros existentes.
          </Typography>
        </div>

        {/* Sección: Insertar doctor */}
        <Card shadow={true} className="p-6">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
              Registrar nuevo doctor
            </Typography>
            <InsertDoctorsForm />
          </CardBody>
        </Card>

        {/* Sección: Lista de doctores */}
        <Card shadow={true} className="p-6">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-4 font-semibold">
              Lista de doctores registrados
            </Typography>
            <DoctorsList />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
