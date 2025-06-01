'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AgregarProducto from '@/app/components/ExpressPos/GestiondeProductos/AgregarProducto';
import ActualizarProducto from '@/app/components/ExpressPos/GestiondeProductos/ActualizarProducto';
import EliminarProducto from '@/app/components/ExpressPos/GestiondeProductos/EliminarProducto';
import ListarProductos from '@/app/components/ExpressPos/GestiondeProductos/ListarProductos';

const tabs = [
  { key: 'listar', label: '📋 Listar' },
  { key: 'agregar', label: '➕ Agregar' },
  // { key: 'actualizar', label: '🔄 Actualizar' },
  { key: 'eliminar', label: '❌ Eliminar' },
];

const GestionDeProductosPage = () => {
  const [activeTab, setActiveTab] = useState('listar');
  const router = useRouter();

  const renderTab = () => {
    switch (activeTab) {
      case 'agregar':
        return <AgregarProducto />;
      case 'actualizar':
        return <ActualizarProducto />;
      case 'eliminar':
        return <EliminarProducto />;
      default:
        return <ListarProductos />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex items-center justify-between w-full mx-auto mb-8 max-w-7xl">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm sm:text-base rounded-full transition font-semibold shadow-md ${
                activeTab === tab.key
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push('/home')}
          className="px-4 py-2 text-white bg-gray-800 rounded-full shadow-md hover:bg-gray-900"
        >
          ⬅ Volver al Home
        </button>
      </div>

      <div className="flex-1 w-full p-6 mx-auto overflow-auto bg-white shadow-lg max-w-7xl rounded-2xl">
        {renderTab()}
      </div>
    </div>
  );
};

export default GestionDeProductosPage;
