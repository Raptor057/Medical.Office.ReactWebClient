'use client';

import React, { useState } from "react";
import { Typography, Button, Tab, TabPanel, Tabs, TabsHeader, TabsBody, Card, CardBody } from "@material-tailwind/react";
import InsertPositionsForm from "@/app/components/Configurations/Posts/InsertPositionsForm";
import InsertSpecialtiesForm from "@/app/components/Configurations/Posts/InsertSpecialtiesForm";
import UpdateLaboralDaysdForm from "@/app/components/Configurations/Patchs/UpdateLaboralDaysForm";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

export default function OthersConfiguration() {
  const [activeTab, setActiveTab] = useState("puestos");

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Configuración de Datos Generales
        </Typography>
        <Link href="/home">
          <Button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900">
            <HomeIcon className="w-5 h-5" /> Inicio
          </Button>
        </Link>
      </div>

      <Typography color="gray" className="mb-8 text-center">
        Aquí podrás gestionar los datos generales, incluyendo agregar, editar o eliminar información.
      </Typography>

      <Tabs value={activeTab} className="bg-white rounded-lg shadow-lg">
        <TabsHeader>
          <Tab value="puestos" onClick={() => setActiveTab("puestos")}>➕ Puestos</Tab>
          <Tab value="especialidades" onClick={() => setActiveTab("especialidades")}>🏥 Especialidades</Tab>
          <Tab value="dias" onClick={() => setActiveTab("dias")}>📅 Días Laborales</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="puestos">
            <Card className="shadow-lg">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 font-bold text-center">
                  Agregar Puestos
                </Typography>
                <InsertPositionsForm />
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel value="especialidades">
            <Card className="shadow-lg">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 font-bold text-center">
                  Agregar Especialidades
                </Typography>
                <InsertSpecialtiesForm />
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel value="dias">
            <Card className="shadow-lg">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-4 font-bold text-center">
                  Actualizar Días Laborales
                </Typography>
                <UpdateLaboralDaysdForm />
              </CardBody>
            </Card>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
