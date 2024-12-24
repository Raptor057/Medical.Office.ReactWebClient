"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import ActualizarProducto from "./ActualizarProducto";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProductos = async () => {
    try {
      const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
      setProductos(response.productos || []);
      setFilteredProductos(response.productos || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const results = productos.filter((producto) =>
      producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProductos(results);
  }, [searchTerm, productos]);

  const handleEdit = (productoID) => {
    setEditingProductId(productoID);
  };

  const handleUpdateSuccess = () => {
    setEditingProductId(null);
    fetchProductos();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-blue-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Gestión de Productos</h1>
      </div>
      {editingProductId ? (
        <div className="mt-6">
          <ActualizarProducto
            productoId={editingProductId}
            onUpdateSuccess={handleUpdateSuccess}
          />
        </div>
      ) : (
        <>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Buscar producto..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
                {filteredProductos.length > 0 ? (
                  filteredProductos.map((producto) => (
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
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(producto.productoID)}
                        >
                          Editar
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
        </>
      )}
    </div>
  );
};

export default ListarProductos;
