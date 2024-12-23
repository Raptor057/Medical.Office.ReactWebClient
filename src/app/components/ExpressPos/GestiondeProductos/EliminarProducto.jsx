'use client';

import React, { useEffect, useState } from 'react';
import ExpressPosApi from '@/app/utils/HttpRequestsExpressPos';

const EliminarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const fetchProductos = async () => {
    try {
      const data = await ExpressPosApi.obtenerTodosLosProductos();
      setProductos(data);
    } catch (error) {
      setAlert({ type: 'error', message: `Error al cargar productos: ${error}` });
    }
  };

  const eliminarProducto = async (productoId) => {
    try {
      await ExpressPosApi.eliminarProducto(productoId);
      setAlert({ type: 'success', message: 'Producto eliminado correctamente.' });
      setProductos((prev) => prev.filter((producto) => producto.productoID !== productoId));
    } catch (error) {
      setAlert({ type: 'error', message: `Error al eliminar producto: ${error}` });
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Eliminar Producto</h1>
      {alert.message && <Alerts type={alert.type} message={alert.message} />}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Stock</th>
            <th className="border border-gray-300 px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.productoID}>
              <td className="border border-gray-300 px-4 py-2">{producto.productoID}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">${producto.precio.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">{producto.stock}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => eliminarProducto(producto.productoID)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EliminarProducto;
