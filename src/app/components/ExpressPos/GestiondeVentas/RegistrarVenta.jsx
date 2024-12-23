'use client';

import React, { useState, useEffect } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaHora, setFechaHora] = useState(new Date().toISOString());

  useEffect(() => {
    // Cargar lista de productos disponibles
    const fetchProductos = async () => {
      try {
        const data = await ExpressPos.obtenerTodosLosProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  const handleAgregarProducto = (productoID, cantidad) => {
    const producto = productos.find((p) => p.productoID === productoID);
    if (!producto || cantidad <= 0) return;

    const productoEnLista = productosSeleccionados.find((p) => p.productoID === productoID);

    if (productoEnLista) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.productoID === productoID ? { ...p, cantidad: p.cantidad + cantidad } : p
        )
      );
    } else {
      setProductosSeleccionados((prev) => [...prev, { productoID, cantidad, nombre: producto.nombre, precio: producto.precio }]);
    }

    setTotal((prev) => prev + producto.precio * cantidad);
  };

  const handleEliminarProducto = (productoID) => {
    const producto = productosSeleccionados.find((p) => p.productoID === productoID);
    if (!producto) return;

    setProductosSeleccionados((prev) => prev.filter((p) => p.productoID !== productoID));
    setTotal((prev) => prev - producto.precio * producto.cantidad);
  };

  const handleRegistrarVenta = async () => {
    const productos = productosSeleccionados.map((p) => ({ productoID: p.productoID, cantidad: p.cantidad }));

    try {
      await ExpressPos.registrarVenta({ fechaHora, total, productos });
      alert('Venta registrada exitosamente.');
      setProductosSeleccionados([]);
      setTotal(0);
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Error al registrar la venta.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Registrar Venta</h1>

      <div className="mb-4">
        <label className="block font-medium">Fecha y Hora:</label>
        <input
          type="datetime-local"
          value={new Date(fechaHora).toISOString().slice(0, 16)}
          onChange={(e) => setFechaHora(new Date(e.target.value).toISOString())}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Seleccionar Producto:</label>
        <select className="border p-2 rounded w-full" onChange={(e) => handleAgregarProducto(Number(e.target.value), 1)}>
          <option value="">-- Seleccione un Producto --</option>
          {productos.map((producto) => (
            <option key={producto.productoID} value={producto.productoID}>
              {producto.nombre} - ${producto.precio}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Productos Seleccionados</h2>
      <ul className="border rounded p-4">
        {productosSeleccionados.map((producto) => (
          <li key={producto.productoID} className="flex justify-between items-center mb-2">
            <span>{producto.nombre} - ${producto.precio} x {producto.cantidad}</span>
            <button
              onClick={() => handleEliminarProducto(producto.productoID)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
      </div>

      <button
        onClick={handleRegistrarVenta}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Registrar Venta
      </button>
    </div>
  );
};

export default RegistrarVenta;
