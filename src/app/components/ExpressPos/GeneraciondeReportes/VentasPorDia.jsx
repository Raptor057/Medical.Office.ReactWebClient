'use client';

import { useState } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';

export default function VentasPorDia() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState(null);

  const obtenerVentasPorDia = async () => {
    try {
      if (!fechaInicio || !fechaFin) {
        setError('Debes ingresar ambas fechas.');
        return;
      }
      const data = await ExpressPos.obtenerVentasPorDia(fechaInicio, fechaFin);
      setVentas(data);
      setError(null);
    } catch (err) {
      setError(`Error al obtener las ventas por día: ${err}`);
      setVentas([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ventas por Día</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Fecha Inicio</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Fecha Fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <button
        onClick={obtenerVentasPorDia}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Consultar
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-4">
        {ventas.length > 0 ? (
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Total Ventas</th>
                <th className="border px-4 py-2">Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{venta.fecha}</td>
                  <td className="border px-4 py-2">{venta.totalVentas}</td>
                  <td className="border px-4 py-2">{venta.totalVendido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <div className="text-gray-500 mt-4">No hay datos disponibles.</div>
        )}
      </div>
    </div>
  );
}
