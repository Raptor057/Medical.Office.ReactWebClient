'use client';

import React, { useState } from 'react';
import { Typography, Button, Tab, TabPanel, Tabs, TabsHeader, TabsBody } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import AgregarProducto from '@/app/components/ExpressPos/GestiondeProductos/AgregarProducto';
import ActualizarProducto from '@/app/components/ExpressPos/GestiondeProductos/ActualizarProducto';
import EliminarProducto from '@/app/components/ExpressPos/GestiondeProductos/EliminarProducto';
import ListarProductos from '@/app/components/ExpressPos/GestiondeProductos/ListarProductos';

export default function GestionDeProductosPage() {
  const [activeTab, setActiveTab] = useState('listar');
  const router = useRouter();

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Gestión de Productos
        </Typography>
        <Button onClick={() => router.push('/home')} className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900">
          ⬅ Volver al Home
        </Button>
      </div>

      <Tabs value={activeTab} className="bg-white rounded-lg shadow-lg">
        <TabsHeader>
          <Tab value="listar" onClick={() => setActiveTab('listar')}>
            📋 Listar
          </Tab>
          <Tab value="agregar" onClick={() => setActiveTab('agregar')}>
            ➕ Agregar
          </Tab>
          <Tab value="eliminar" onClick={() => setActiveTab('eliminar')}>
            ❌ Eliminar
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="listar">
            <ListarProductos />
          </TabPanel>
          <TabPanel value="agregar">
            <AgregarProducto />
          </TabPanel>
          <TabPanel value="eliminar">
            <EliminarProducto />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
