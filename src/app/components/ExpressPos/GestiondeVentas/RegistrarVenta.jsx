"use client";

import React, { useState, useEffect } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const RegistrarVenta = () => {
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [fechaHora, setFechaHora] = useState(null); // Inicialmente null para evitar errores de hidratación

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await MedicalExpressPosWebApi.obtenerTodosLosProductos();
        setProductos(response.productos || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();

    // Configurar la fecha/hora actual al montar el componente en UTC
    const ahoraUTC = new Date();
    setFechaHora(
      new Date(Date.UTC(
        ahoraUTC.getUTCFullYear(),
        ahoraUTC.getUTCMonth(),
        ahoraUTC.getUTCDate(),
        ahoraUTC.getUTCHours(),
        ahoraUTC.getUTCMinutes(),
        ahoraUTC.getUTCSeconds()
      ))
    );
  }, []);

  const handleAgregarProducto = (productoID, cantidad) => {
    const producto = productos.find((p) => p.productoID === productoID);
    if (!producto || cantidad <= 0) return;

    const productoEnLista = productosSeleccionados.find(
      (p) => p.productoID === productoID
    );

    if (productoEnLista) {
      setProductosSeleccionados((prev) =>
        prev.map((p) =>
          p.productoID === productoID
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      );
    } else {
      setProductosSeleccionados((prev) => [
        ...prev,
        {
          productoID,
          cantidad,
          nombre: producto.nombre,
          precio: producto.precio,
        },
      ]);
    }

    setTotal((prev) => prev + producto.precio * cantidad);
  };

  const handleEliminarProducto = (productoID) => {
    const producto = productosSeleccionados.find(
      (p) => p.productoID === productoID
    );
    if (!producto) return;

    setProductosSeleccionados((prev) =>
      prev.filter((p) => p.productoID !== productoID)
    );
    setTotal((prev) => prev - producto.precio * producto.cantidad);
  };

  const handleRegistrarVenta = async () => {
    const productos = productosSeleccionados.map((p) => ({
      productoID: p.productoID,
      cantidad: p.cantidad,
    }));

    try {
      await MedicalExpressPosWebApi.registrarVenta({
        fechaHora: fechaHora.toISOString(), // Enviar la fecha en formato ISO UTC
        total,
        productos,
      });
      alert("Venta registrada exitosamente.");
      setProductosSeleccionados([]);
      setTotal(0);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-blue-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Registrar Venta</h1>
      </div>
      <div className="mt-4">
        <label className="block font-medium mb-2">
          Fecha y Hora:
          {fechaHora ? ( // Renderiza la fecha solo después de que esté disponible
            <span className="block w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700">
              {fechaHora.toUTCString()} {/* Mostrar la fecha en formato UTC */}
            </span>
          ) : (
            <span className="block w-full mt-1 p-2 border rounded bg-gray-100 text-gray-700">
              Cargando...
            </span>
          )}
        </label>
      </div>
      <div className="mt-4">
        <label className="block font-medium mb-2">
          Seleccionar Producto:
          <select
            className="block w-full mt-1 p-2 border rounded"
            onChange={(e) =>
              handleAgregarProducto(Number(e.target.value), 1)
            }
          >
            <option value="">-- Seleccione un Producto --</option>
            {productos.map((producto) => (
              <option key={producto.productoID} value={producto.productoID}>
                {producto.nombre} - ${producto.precio}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Productos Seleccionados</h2>
        <ul className="bg-white border rounded shadow-md p-4">
          {productosSeleccionados.map((producto) => (
            <li
              key={producto.productoID}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {producto.nombre} - ${producto.precio} x {producto.cantidad}
              </span>
              <button
                onClick={() => handleEliminarProducto(producto.productoID)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Total: ${total.toFixed(2)}</h3>
      </div>
      <button
        onClick={handleRegistrarVenta}
        className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Registrar Venta
      </button>
    </div>
  );
};

export default RegistrarVenta;
