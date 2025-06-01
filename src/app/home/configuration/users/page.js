'use client';

import React, { useState } from 'react';
import { Typography, Button, Tab, TabPanel, Tabs, TabsHeader, TabsBody } from '@material-tailwind/react';
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';
import RegisterUser from '@/app/components/Configurations/Posts/RegisterUser';
import UsersList from '@/app/components/Configurations/Gets/UsersList';

export default function UsersConfiguration() {
  const [activeTab, setActiveTab] = useState('registro');

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Configuración de Usuarios
        </Typography>
        <Link href="/home">
          <Button className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5" /> Inicio
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} className="bg-white rounded-lg shadow-lg">
        <TabsHeader>
          <Tab value="registro" onClick={() => setActiveTab('registro')}>
            Registrar Usuario
          </Tab>
          <Tab value="lista" onClick={() => setActiveTab('lista')}>
            Lista de Usuarios
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="registro">
            <RegisterUser />
          </TabPanel>
          <TabPanel value="lista">
            <UsersList />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
