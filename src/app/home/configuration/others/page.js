'use client';

import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";
import InsertPositionsForm from "@/app/components/Configurations/Posts/InsertPositionsForm";
import InsertSpecialtiesForm from "@/app/components/Configurations/Posts/InsertSpecialtiesForm";
import UpdateLaboralDaysdForm from "@/app/components/Configurations/Patchs/UpdateLaboralDaysForm";

export default function OthersConfiguration() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <Typography
        variant="h3"
        color="blue-gray"
        className="font-bold text-center mb-6"
      >
        Configuración de Datos Generales
      </Typography>
      <Typography color="gray" className="text-center mb-8">
        Aquí podrás gestionar los datos generales, incluyendo agregar, editar o eliminar información.
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="shadow-lg">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold text-center mb-4"
            >
              Agregar Puestos
            </Typography>
            <InsertPositionsForm />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold text-center mb-4"
            >
              Agregar Especialidades
            </Typography>
            <InsertSpecialtiesForm />
          </CardBody>
        </Card>

        <Card className="shadow-lg">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-bold text-center mb-4"
            >
              Actualizar Días Laborales
            </Typography>
            <UpdateLaboralDaysdForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
