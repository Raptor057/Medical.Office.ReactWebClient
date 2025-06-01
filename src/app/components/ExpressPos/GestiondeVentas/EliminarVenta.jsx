"use client";

import React, { useEffect, useState } from "react";
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const EliminarVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, ventaID: null });
  const [message, setMessage] = useState("");

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toISOString().split(".")[0];
  };

  const fechaInicio = formatearFecha(new Date("2023-01-01"));
  const fechaFin = formatearFecha(new Date());

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
        setVentas(response.ventas);
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

  const eliminarVenta = async () => {
    try {
      await MedicalExpressPosWebApi.eliminarVenta(modal.ventaID);
      setVentas((prev) => prev.filter((venta) => venta.ventaID !== modal.ventaID));
      setMessage("Venta eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      setMessage("Error al eliminar la venta.");
    } finally {
      setModal({ open: false, ventaID: null });
    }
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="py-3 text-center text-white bg-red-500 rounded">
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
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-sm font-semibold text-left text-gray-700">ID Venta</th>
                <th className="px-4 py-2 text-sm font-semibold text-left text-gray-700">Fecha</th>
                <th className="px-4 py-2 text-sm font-semibold text-left text-gray-700">Total</th>
                <th className="px-4 py-2 text-sm font-semibold text-left text-gray-700">Acción</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.ventaID} className="text-gray-700 border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{venta.ventaID}</td>
                  <td className="px-4 py-2">{new Date(venta.fechaHora).toLocaleString()}</td>
                  <td className="px-4 py-2">${venta.total.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setModal({ open: true, ventaID: venta.ventaID })}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
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

      <Dialog open={modal.open} onClose={() => setModal({ open: false, ventaID: null })} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity bg-gray-500/75 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center mx-auto bg-red-100 rounded-full size-12 shrink-0 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="text-red-600 size-6" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    ¿Eliminar esta venta?
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Esta acción no se puede deshacer. Se eliminarán permanentemente los datos de la venta.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={eliminarVenta}
                  className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  onClick={() => setModal({ open: false, ventaID: null })}
                  className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EliminarVenta;