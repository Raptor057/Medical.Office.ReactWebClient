"use client";

import React, { useState } from "react";
import RegistrarVenta from "@/app/components/ExpressPos/GestiondeVentas/RegistrarVenta";
import EliminarVenta from "@/app/components/ExpressPos/GestiondeVentas/EliminarVenta";
import VentasPorRango from "@/app/components/ExpressPos/GestiondeVentas/VentasPorRango";
import DetalleDeVenta from "@/app/components/ExpressPos/GestiondeVentas/DetalleDeVenta";
import { useRouter } from "next/navigation"; // Importa el hook para navegación

const GestionarVentasPage = () => {
  const [activeComponent, setActiveComponent] = useState("registrar");
  const router = useRouter(); // Usa el hook para redirigir

  const renderComponent = () => {
    switch (activeComponent) {
      case "registrar":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <RegistrarVenta />
          </div>
        );
      case "eliminar":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <EliminarVenta />
          </div>
        );
      case "rango":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <VentasPorRango />
          </div>
        );
      case "detalle":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <DetalleDeVenta />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveComponent("registrar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "registrar"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Registrar Venta
          </button>
          <button
            onClick={() => setActiveComponent("eliminar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "eliminar"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Eliminar Venta
          </button>
          <button
            onClick={() => setActiveComponent("rango")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "rango"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Ventas por Rango
          </button>
          <button
            onClick={() => setActiveComponent("detalle")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "detalle"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            Detalle de Venta
          </button>
        </div>
        <button
          onClick={() => router.push("/home")} // Redirige al home
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Volver a Home
        </button>
      </div>
      <div className="max-w-4xl mx-auto">{renderComponent()}</div>
    </div>
  );
};

export default GestionarVentasPage;
