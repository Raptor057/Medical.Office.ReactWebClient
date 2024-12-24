"use client";

import React, { useState } from "react";
import AgregarProducto from "@/app/components/ExpressPos/GestiondeProductos/AgregarProducto";
import ActualizarProducto from "@/app/components/ExpressPos/GestiondeProductos/ActualizarProducto";
import EliminarProducto from "@/app/components/ExpressPos/GestiondeProductos/EliminarProducto";
import ListarProductos from "@/app/components/ExpressPos/GestiondeProductos/ListarProductos";
import { useRouter } from "next/navigation"; // Importa el hook para redirigir

const GestionDeProductosPage = () => {
  const [activeComponent, setActiveComponent] = useState("listar");
  const router = useRouter(); // Usa el hook para navegación

  const renderComponent = () => {
    switch (activeComponent) {
      case "agregar":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveComponent("listar")}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <AgregarProducto />
          </div>
        );
      case "actualizar":
        return (
          <div className="relative p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <button
              onClick={() => setActiveComponent("listar")}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
            <ActualizarProducto />
          </div>
        );
      case "eliminar":
        return (
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <EliminarProducto />
          </div>
        );
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <ListarProductos />
          </div>
        );
    }
  };

  return (
    <div className="p-4 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveComponent("listar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "listar"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Listar Productos
          </button>
          <button
            onClick={() => setActiveComponent("agregar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "agregar"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Agregar Producto
          </button>
          <button
            onClick={() => setActiveComponent("actualizar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "actualizar"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            Actualizar Producto
          </button>
          <button
            onClick={() => setActiveComponent("eliminar")}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              activeComponent === "eliminar"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Eliminar Producto
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

export default GestionDeProductosPage;
