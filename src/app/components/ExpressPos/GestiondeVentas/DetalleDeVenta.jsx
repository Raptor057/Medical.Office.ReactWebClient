"use client";

import React, { useState, useEffect } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

const DetalleDeVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const obtenerFechaHoyUTC = (inicioDelDia = true) => {
    const now = new Date();
    if (inicioDelDia) {
      return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)).toISOString();
    }
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59)).toISOString();
  };

  const cargarVentas = async () => {
    setLoading(true);
    setError("");

    const fechaInicio = obtenerFechaHoyUTC(true);
    const fechaFin = obtenerFechaHoyUTC(false);

    try {
      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(fechaInicio, fechaFin);

      if (response && response.ventas) {
        setVentas(response.ventas);
      } else {
        setError("No se encontraron ventas.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al cargar las ventas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="py-4 text-center text-white bg-blue-600 shadow-md rounded-t-md">
          <h1 className="text-2xl font-bold">Detalle de Ventas</h1>
        </div>

        {loading && (
          <div className="mt-6 text-lg font-medium text-center text-gray-700">
            Cargando ventas...
          </div>
        )}

        {error && (
          <div className="px-4 py-3 mt-6 text-center text-red-700 bg-red-100 border border-red-400 rounded shadow-sm">
            {error}
          </div>
        )}

        {!loading && ventas.length > 0 && (
          <div className="mt-6 overflow-x-auto bg-white border border-gray-200 shadow-lg rounded-b-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    ID Venta
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ventas.map((venta) => (
                  <tr key={venta.ventaID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{venta.ventaID}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {new Date(venta.fechaHora).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      ${venta.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && ventas.length === 0 && !error && (
          <div className="mt-6 text-lg font-medium text-center text-gray-700">
            No hay ventas disponibles.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleDeVenta;
