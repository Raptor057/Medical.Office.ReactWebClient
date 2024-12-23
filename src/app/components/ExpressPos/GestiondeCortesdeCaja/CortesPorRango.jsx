'use client';

import { useState } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';
import DatePicker from 'react-datepicker'; // Necesita instalación: npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

export default function CortesPorRango() {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [cortes, setCortes] = useState([]);
  const [error, setError] = useState(null);

  const buscarCortes = async () => {
    try {
      if (!fechaInicio || !fechaFin) {
        setError('Debes seleccionar un rango de fechas válido.');
        return;
      }
      const cortesEncontrados = await ExpressPos.obtenerCortesPorRango(fechaInicio.toISOString(), fechaFin.toISOString());
      setCortes(cortesEncontrados);
      setError(null);
    } catch (err) {
      setError(`Error al buscar los cortes: ${err}`);
      setCortes([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Cortes por Rango</h1>
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block font-semibold mb-2">Fecha Inicio</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Fecha Fin</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            dateFormat="yyyy-MM-dd"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <button
          onClick={buscarCortes}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mt-6">
        {cortes.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Total Vendido</th>
                <th className="border border-gray-300 px-4 py-2">Total Ventas</th>
              </tr>
            </thead>
            <tbody>
              {cortes.map((corte) => (
                <tr key={corte.corteID}>
                  <td className="border border-gray-300 px-4 py-2">{corte.corteID}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(corte.fechaHora).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">${corte.totalVendido.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{corte.totalVentas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No se encontraron cortes en el rango seleccionado.</div>
        )}
      </div>
    </div>
  );
}
