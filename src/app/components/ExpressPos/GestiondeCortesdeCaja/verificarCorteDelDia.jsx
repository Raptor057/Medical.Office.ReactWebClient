"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ← Importa useRouter
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

export default function AutoCorteCaja() {
  const router = useRouter(); // ← Inicializa router

  const [ventasDia, setVentasDia] = useState([]);
  const [totalVendido, setTotalVendido] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [corteExistente, setCorteExistente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    verificarCorteDelDia();
  }, []);

  const obtenerFechaHoyUTC = (inicioDelDia = true) => {
    const now = new Date();
    if (inicioDelDia) {
      return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0)).toISOString();
    }
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59)).toISOString();
  };

  const verificarCorteDelDia = async () => {
    setLoading(true);
    try {
      const fechaInicio = obtenerFechaHoyUTC(true);
      const fechaFin = obtenerFechaHoyUTC(false);

      const response = await MedicalExpressPosWebApi.obtenerCortesPorRango(
        fechaInicio,
        fechaFin
      );

      if (response?.isSuccess && response.data?.length > 0) {
        setCorteExistente(true);
      } else {
        await obtenerVentasDelDia();
      }
    } catch (error) {
      console.error("Error al verificar el corte del día:", error);
      setMensaje("Error al verificar el corte del día.");
    } finally {
      setLoading(false);
    }
  };

  const obtenerVentasDelDia = async () => {
    try {
      const fechaInicio = obtenerFechaHoyUTC(true);
      const fechaFin = obtenerFechaHoyUTC(false);

      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicio,
        fechaFin
      );

      if (response?.ventas?.length > 0) {
        const total = response.ventas.reduce((acc, venta) => acc + venta.total, 0);
        setVentasDia(response.ventas);
        setTotalVendido(total);
        setTotalVentas(response.ventas.length);
      } else {
        setVentasDia([]);
        setTotalVendido(0);
        setTotalVentas(0);
        setMensaje("No se encontraron ventas para el día.");
      }
    } catch (error) {
      console.error("Error al obtener las ventas del día:", error);
      setMensaje("Error al obtener las ventas del día.");
    }
  };

  const generarCorte = async () => {
    try {
      const fechaHoraActual = new Date().toISOString();
      const corteData = {
        FechaHora: fechaHoraActual,
        TotalVendido: totalVendido,
        TotalVentas: totalVentas,
      };

      const response = await MedicalExpressPosWebApi.registrarCorte(corteData);
      if (response?.isSuccess === true) {
        setMensaje("Corte generado exitosamente.");
        setCorteExistente(true);
      } else {
        const msg = response?.message ?? JSON.stringify(response?.data ?? "Respuesta inesperada del servidor.");
        setMensaje("Error al generar el corte: " + msg);
      }
    } catch (error) {
      console.error("Error al generar el corte:", error);
      setMensaje("Error al generar el corte. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      {/* Botón de regreso */}
      <div className="mb-4">
        <button
          onClick={() => router.push("/home")}
          className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Volver al Home
        </button>
      </div>

      <div className="py-3 text-center text-white bg-blue-500 rounded">
        <h1 className="text-xl font-bold">Generar Corte Automático</h1>
      </div>

      {loading && <p className="mt-4 text-center text-gray-600">Cargando datos...</p>}

      {corteExistente ? (
        <p className="mt-4 text-center text-red-600">Ya existe un corte registrado para el día de hoy.</p>
      ) : (
        <div className="p-4 mt-6 bg-white border rounded shadow-md">
          <p className="mb-2 text-gray-700">
            Total Vendido: <strong>${totalVendido.toFixed(2)}</strong>
          </p>
          <p className="mb-4 text-gray-700">
            Total de Ventas: <strong>{totalVentas}</strong>
          </p>
          <button
            onClick={generarCorte}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Generar Corte
          </button>
        </div>
      )}

      {mensaje && (
        <div className="py-2 mt-4 text-sm text-center text-blue-700 bg-blue-100 rounded">
          {mensaje}
        </div>
      )}
    </div>
  );
}
