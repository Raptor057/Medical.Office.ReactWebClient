"use client";

import React, { useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const VentasPorRango = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Formatear fechas en formato correcto para el endpoint
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString().split(".")[0]; // Formato: YYYY-MM-DDTHH:mm:ss
  };

  const buscarVentasPorRango = async () => {
    if (!fechaInicio || !fechaFin) {
      setErrorMessage("Por favor, selecciona ambas fechas.");
      return;
    }

    const fechaInicioFormateada = formatearFecha(fechaInicio);
    const fechaFinFormateada = formatearFecha(fechaFin);

    setErrorMessage("");
    setLoading(true);

    try {
      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicioFormateada,
        fechaFinFormateada
      );

      if (response?.ventas && response.ventas.length > 0) {
        setVentas(response.ventas);
      } else {
        setVentas([]);
        setErrorMessage("No se encontraron ventas en este rango de fechas.");
      }
    } catch (error) {
      console.error("Error al buscar ventas:", error);
      setErrorMessage("Error al buscar ventas. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-blue-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Buscar Ventas por Rango de Fechas</h1>
      </div>
      <div className="mt-6">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Fecha Inicio:</span>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="block w-full mt-1 p-2 border rounded shadow-sm"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Fecha Fin:</span>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="block w-full mt-1 p-2 border rounded shadow-sm"
          />
        </label>
        <button
          onClick={buscarVentasPorRango}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Buscar Ventas
        </button>
      </div>
      {loading ? (
        <div className="text-center mt-6 text-gray-600">Cargando ventas...</div>
      ) : errorMessage ? (
        <div className="mt-6 text-center text-red-500">{errorMessage}</div>
      ) : ventas.length > 0 ? (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white border rounded shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border text-left text-gray-700 font-medium">
                  ID Venta
                </th>
                <th className="px-4 py-2 border text-left text-gray-700 font-medium">
                  Fecha
                </th>
                <th className="px-4 py-2 border text-left text-gray-700 font-medium">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.ventaID} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-gray-700">
                    {venta.ventaID}
                  </td>
                  <td className="px-4 py-2 border text-gray-700">
                    {new Date(venta.fechaHora).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border text-gray-700">
                    ${venta.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default VentasPorRango;
