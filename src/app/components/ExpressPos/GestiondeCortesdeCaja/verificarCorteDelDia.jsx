"use client";

import React, { useState, useEffect } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

export default function AutoCorteCaja() {
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

      console.log("Verificando corte con fechas (UTC):", { fechaInicio, fechaFin });

      const response = await MedicalExpressPosWebApi.obtenerCortesPorRango(
        fechaInicio,
        fechaFin
      );

      if (response.isSuccess && response.data && response.data.length > 0) {
        setCorteExistente(true);
      } else {
        obtenerVentasDelDia();
      }
    } catch (error) {
      console.error("Error al verificar el corte del día:", error);
      setMensaje("Error al verificar el corte del día.");
    } finally {
      setLoading(false);
    }
  };

  const obtenerVentasDelDia = async () => {
    setLoading(true);
    try {
      const fechaInicio = obtenerFechaHoyUTC(true);
      const fechaFin = obtenerFechaHoyUTC(false);

      console.log("Buscando ventas con fechas (UTC):", { fechaInicio, fechaFin });

      const response = await MedicalExpressPosWebApi.obtenerVentasPorRango(
        fechaInicio,
        fechaFin
      );

      console.log("Respuesta de ventas:", response);

      if (response.isSuccess && response.ventas) {
        const ventas = response.ventas;

        if (ventas.length === 0) {
          console.log("No se encontraron ventas.");
        }

        // Cálculo del total vendido y total de ventas
        const total = ventas.reduce((acumulado, venta) => acumulado + venta.total, 0);

        setVentasDia(ventas);
        setTotalVendido(total);
        setTotalVentas(ventas.length);

        console.log("Ventas procesadas:", { total, ventas });
      } else {
        setVentasDia([]);
        setTotalVendido(0);
        setTotalVentas(0);
        setMensaje("No se encontraron ventas para el día.");
      }
    } catch (error) {
      console.error("Error al obtener las ventas del día:", error);
      setMensaje("Error al obtener las ventas del día.");
    } finally {
      setLoading(false);
    }
  };

  const generarCorte = async () => {
    try {
      const fechaHoraActual = new Date().toISOString(); // Fecha actual en UTC
      const corteData = {
        FechaHora: fechaHoraActual,
        TotalVendido: totalVendido,
        TotalVentas: totalVentas,
      };

      console.log("Datos del corte a enviar:", corteData);

      const response = await MedicalExpressPosWebApi.registrarCorte(corteData);
      if (response.isSuccess) {
        setMensaje("Corte generado exitosamente.");
        setCorteExistente(true);
      } else {
        setMensaje("Error al generar el corte: " + response.message);
      }
    } catch (error) {
      console.error("Error al generar el corte:", error);
      setMensaje("Error al generar el corte. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Generar Corte Automático</h1>
      {loading && <p>Cargando datos...</p>}
      {corteExistente ? (
        <p className="text-red-500">Ya existe un corte registrado para el día de hoy.</p>
      ) : (
        <div>
          <p className="mb-4">
            Total Vendido: <strong>${totalVendido.toFixed(2)}</strong>
          </p>
          <p className="mb-4">
            Total de Ventas: <strong>{totalVentas}</strong>
          </p>
          <button
            onClick={generarCorte}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Generar Corte
          </button>
        </div>
      )}
      {mensaje && <p className="mt-4 text-green-500">{mensaje}</p>}
    </div>
  );
}
