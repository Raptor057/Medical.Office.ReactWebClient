"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const EliminarVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Formatear fechas para enviar a la API
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString().split(".")[0]; // Formato: YYYY-MM-DDTHH:mm:ss
  };

  // Fechas de ejemplo para obtener el rango
  const fechaInicio = formatearFecha(new Date("2023-01-01"));
  const fechaFin = formatearFecha(new Date());

  // Cargar ventas al iniciar
  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicio,
        fechaFin
      );
      if (response?.ventas && response.ventas.length > 0) {
        setVentas(response.ventas); // Asegúrate de que el objeto tiene la propiedad `ventas`
      } else {
        setMessage("No hay ventas disponibles.");
      }
    } catch (error) {
      console.error("Error al cargar las ventas:", error);
      setMessage("Error al cargar las ventas.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarVenta = async (ventaID) => {
    if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;

    try {
      await MedicalExpressPosWebApi.eliminarVenta(ventaID);
      setVentas((prev) => prev.filter((venta) => venta.ventaID !== ventaID));
      setMessage("Venta eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      setMessage("Error al eliminar la venta.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-red-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Eliminar Ventas</h1>
      </div>
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Cargando ventas...</p>
        </div>
      )}
      {message && (
        <div
          className={`mt-4 text-center py-2 rounded ${
            message.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          <p>{message}</p>
        </div>
      )}
      {!loading && ventas.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  ID Venta
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Fecha
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr
                  key={venta.ventaID}
                  className="border-b hover:bg-gray-50 text-gray-700"
                >
                  <td className="px-4 py-2">{venta.ventaID}</td>
                  <td className="px-4 py-2">
                    {new Date(venta.fechaHora).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">${venta.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => eliminarVenta(venta.ventaID)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && ventas.length === 0 && !message && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">No hay ventas disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default EliminarVenta;
