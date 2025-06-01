'use client';

import React, { useState } from 'react';
import { Typography, Button, Tab, TabPanel, Tabs, TabsHeader, TabsBody } from '@material-tailwind/react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import RegistrarVenta from '@/app/components/ExpressPos/GestiondeVentas/RegistrarVenta';
import EliminarVenta from '@/app/components/ExpressPos/GestiondeVentas/EliminarVenta';
import VentasPorRango from '@/app/components/ExpressPos/GestiondeVentas/VentasPorRango';
import DetalleDeVenta from '@/app/components/ExpressPos/GestiondeVentas/DetalleDeVenta';

export default function GestionarVentasPage() {
  const [activeTab, setActiveTab] = useState('registrar');
  const router = useRouter();

  return (
    <div className="w-full min-h-screen p-6 space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Gestión de Ventas
        </Typography>
        <Button onClick={() => router.push('/home')} className="flex items-center gap-2">
          <HomeIcon className="w-5 h-5" /> Inicio
        </Button>
      </div>

      <Tabs value={activeTab} className="bg-white rounded-lg shadow-lg">
        <TabsHeader>
          <Tab value="registrar" onClick={() => setActiveTab('registrar')}>
            📝 Registrar Venta
          </Tab>
          <Tab value="eliminar" onClick={() => setActiveTab('eliminar')}>
            🗑️ Eliminar Venta
          </Tab>
          <Tab value="rango" onClick={() => setActiveTab('rango')}>
            📆 Ventas por Rango
          </Tab>
          <Tab value="detalle" onClick={() => setActiveTab('detalle')}>
            📋 Detalle de Venta
          </Tab>
        </TabsHeader>

        <TabsBody>
          <TabPanel value="registrar">
            <RegistrarVenta />
          </TabPanel>
          <TabPanel value="eliminar">
            <EliminarVenta />
          </TabPanel>
          <TabPanel value="rango">
            <VentasPorRango />
          </TabPanel>
          <TabPanel value="detalle">
            <DetalleDeVenta />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
