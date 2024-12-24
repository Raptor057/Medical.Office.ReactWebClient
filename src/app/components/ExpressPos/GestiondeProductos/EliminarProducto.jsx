"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [message, setMessage] = useState("");

  const fetchProductos = async () => {
    try {
      const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
      setProductos(response.productos || []);
    } catch (error) {
      setMessage(`Error al cargar productos: ${error}`);
    }
  };

  const eliminarProducto = async (productoID) => {
    try {
      await MedicalExpressPosWebApi.eliminarProducto(productoID);
      setMessage("Producto eliminado correctamente.");
      setProductos((prev) =>
        prev.filter((producto) => producto.productoID !== productoID)
      );
    } catch (error) {
      setMessage(`Error al eliminar producto: ${error}`);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-red-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Eliminar Producto</h1>
      </div>
      {message && (
        <div className="bg-blue-100 text-blue-700 text-center py-2 mt-4 rounded">
          <p>{message}</p>
        </div>
      )}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Nombre
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Precio
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr
                  key={producto.productoID}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {producto.productoID}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {producto.nombre}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {producto.precio?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {producto.stock}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => eliminarProducto(producto.productoID)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-2 text-center text-sm text-gray-700"
                >
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EliminarProducto;
