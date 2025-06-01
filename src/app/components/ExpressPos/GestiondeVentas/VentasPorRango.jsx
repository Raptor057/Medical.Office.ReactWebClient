"use client";

import React, { useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const VentasPorRango = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formatearFecha = (fecha, esFechaInicio) => {
    const date = new Date(fecha);
    if (esFechaInicio) {
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)).toISOString();
    } else {
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)).toISOString();
    }
  };

  const buscarVentasPorRango = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (!fechaInicio || !fechaFin) {
        setErrorMessage("Por favor, selecciona ambas fechas.");
        return;
      }

      const fechaInicioFormateada = formatearFecha(fechaInicio, true);
      const fechaFinFormateada = formatearFecha(fechaFin, false);

      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicioFormateada,
        fechaFinFormateada
      );

      if (response?.ventas?.length > 0) {
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
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="px-6 py-4 text-center text-white bg-blue-600 rounded-lg">
          <h1 className="text-2xl font-semibold">Ventas por Rango de Fechas</h1>
        </div>

        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Fecha Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Fecha Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="block w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={buscarVentasPorRango}
            className="inline-block px-6 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Buscar Ventas
          </button>
        </div>

        {loading && <div className="mt-6 text-center text-gray-500">Cargando ventas...</div>}

        {errorMessage && !loading && (
          <div className="mt-6 font-medium text-center text-red-600">
            {errorMessage}
          </div>
        )}

        {!loading && ventas.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold text-left text-gray-700 border-b">ID Venta</th>
                  <th className="px-4 py-2 font-semibold text-left text-gray-700 border-b">Fecha</th>
                  <th className="px-4 py-2 font-semibold text-left text-gray-700 border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.ventaID} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800 border-b">{venta.ventaID}</td>
                    <td className="px-4 py-2 text-gray-800 border-b">{new Date(venta.fechaHora).toLocaleString()}</td>
                    <td className="px-4 py-2 text-gray-800 border-b">${venta.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VentasPorRango;
