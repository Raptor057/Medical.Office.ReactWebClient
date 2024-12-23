"use client";

import React, { useState } from "react";
import AgregarProducto from "@/app/components/ExpressPos/GestiondeProductos/AgregarProducto";
import ActualizarProducto from "@/app/components/ExpressPos/GestiondeProductos/ActualizarProducto";
import EliminarProducto from "@/app/components/ExpressPos/GestiondeProductos/EliminarProducto";
import ListarProductos from "@/app/components/ExpressPos/GestiondeProductos/ListarProductos";

const GestionDeProductosPage = () => {
  const [activeComponent, setActiveComponent] = useState("listar");

  const renderComponent = () => {
    switch (activeComponent) {
      case "agregar":
        return <AgregarProducto />;
      case "actualizar":
        return <ActualizarProducto />;
      case "eliminar":
        return <EliminarProducto />;
      default:
        return <ListarProductos />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveComponent("listar")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Listar Productos
        </button>
        <button
          onClick={() => setActiveComponent("agregar")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Agregar Producto
        </button>
        <button
          onClick={() => setActiveComponent("actualizar")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          Actualizar Producto
        </button>
        <button
          onClick={() => setActiveComponent("eliminar")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Eliminar Producto
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default GestionDeProductosPage;
