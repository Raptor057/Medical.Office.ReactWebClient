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

    const fechaInicio = obtenerFechaHoyUTC(true); // Inicio del día en UTC
    const fechaFin = obtenerFechaHoyUTC(false); // Fin del día en UTC

    try {
      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicio,
        fechaFin
      );

      if (response && response.ventas) {
        setVentas(response.ventas); // Accedemos directamente a la propiedad `ventas`
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
    <div className="container mx-auto px-4 py-6">
      <div className="bg-blue-500 text-white text-center py-3 rounded">
        <h1 className="text-xl font-bold">Detalle de Ventas</h1>
      </div>
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">Cargando ventas...</p>
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-100 text-red-700 text-center py-2 rounded">
          <p>{error}</p>
        </div>
      )}
      {!loading && ventas.length > 0 && (
        <div className="mt-6 bg-white p-4 shadow-md rounded border border-gray-200">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && ventas.length === 0 && !error && (
        <div className="mt-4 text-center">
          <p className="text-gray-700">No hay ventas disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default DetalleDeVenta;
