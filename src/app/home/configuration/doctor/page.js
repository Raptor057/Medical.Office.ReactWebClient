'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  Typography,
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsHeader,
  TabsBody,
} from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";

import InsertDoctorsForm from "@/app/components/Configurations/Posts/InsertDoctorsForm";
import DoctorsList from "@/app/components/Configurations/Gets/DoctorsList";

export default function DoctorsConfiguration() {
  const [activeTab, setActiveTab] = useState("insertar");

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Configuración de Doctores
        </Typography>
        <Link href="/home">
          <Button className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5" /> Inicio
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} className="bg-white rounded-lg shadow-lg">
        <TabsHeader>
          <Tab value="insertar" onClick={() => setActiveTab("insertar")}>🩺 Registrar Doctor</Tab>
          <Tab value="lista" onClick={() => setActiveTab("lista")}>📋 Lista de Doctores</Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="insertar">
            <InsertDoctorsForm />
          </TabPanel>
          <TabPanel value="lista">
            <DoctorsList />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
