"use client";

import React, { useState } from "react";
import RegistrarVenta from "@/app/components/ExpressPos/GestiondeVentas/RegistrarVenta";
import EliminarVenta from "@/app/components/ExpressPos/GestiondeVentas/EliminarVenta";
import VentasPorRango from "@/app/components/ExpressPos/GestiondeVentas/VentasPorRango";
import DetalleDeVenta from "@/app/components/ExpressPos/GestiondeVentas/DetalleDeVenta";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "registrar", label: "📝 Registrar Venta", color: "blue" },
  { key: "eliminar", label: "🗑️ Eliminar Venta", color: "red" },
  { key: "rango", label: "📆 Ventas por Rango", color: "green" },
  { key: "detalle", label: "📋 Detalle de Venta", color: "yellow" },
];

const GestionarVentasPage = () => {
  const [activeTab, setActiveTab] = useState("registrar");
  const router = useRouter();

  const renderComponent = () => {
    switch (activeTab) {
      case "registrar":
        return <RegistrarVenta />;
      case "eliminar":
        return <EliminarVenta />;
      case "rango":
        return <VentasPorRango />;
      case "detalle":
        return <DetalleDeVenta />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="flex flex-wrap items-center justify-between w-full gap-4 mx-auto mb-8 max-w-7xl">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-white font-semibold transition ${
                activeTab === tab.key
                  ? `bg-${tab.color}-700`
                  : `bg-${tab.color}-500 hover:bg-${tab.color}-600`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push("/home")}
          className="px-4 py-2 font-medium text-white bg-gray-800 rounded-full hover:bg-gray-900"
        >
          ⬅ Volver al Home
        </button>
      </div>

      <div className="w-full p-6 mx-auto bg-white shadow-lg max-w-7xl rounded-2xl">
        {renderComponent()}
      </div>
    </div>
  );
};

export default GestionarVentasPage;
