"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchProductos = async () => {
    try {
      const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
      setProductos(response.productos || []);
    } catch (error) {
      setMessage({ type: "error", text: `Error al cargar productos: ${error}` });
    }
  };

  const eliminarProducto = async (productoID) => {
    try {
      await MedicalExpressPosWebApi.eliminarProducto(productoID);
      setMessage({ type: "success", text: "✅ Producto eliminado correctamente." });
      setProductos((prev) => prev.filter((p) => p.productoID !== productoID));
    } catch (error) {
      setMessage({ type: "error", text: `Error al eliminar producto: ${error}` });
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="py-4 text-center text-white bg-red-600 shadow-lg rounded-t-xl">
          <Typography variant="h5">Eliminar Producto</Typography>
        </div>

        {message.text && (
          <div
            className={`text-center py-2 rounded-b-xl mb-4 shadow-md font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="p-4 overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="font-semibold text-gray-700 bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr
                    key={producto.productoID}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{producto.productoID}</td>
                    <td className="px-4 py-2">{producto.nombre}</td>
                    <td className="px-4 py-2">
                      ${parseFloat(producto.precio).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">{producto.stock}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => eliminarProducto(producto.productoID)}
                        className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-600">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EliminarProducto;
