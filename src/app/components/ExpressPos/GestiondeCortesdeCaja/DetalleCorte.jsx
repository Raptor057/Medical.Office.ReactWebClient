'use client';

import { useState } from 'react';
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

export default function DetalleCorte() {
  const [corteID, setCorteID] = useState('');
  const [detalleCorte, setDetalleCorte] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarDetalleCorte = async () => {
    if (!corteID || isNaN(corteID)) {
      setError('Debes ingresar un ID de corte válido.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const detalle = await MedicalExpressPosWebApi.obtenerCortePorId(corteID);
      if (detalle) {
        setDetalleCorte(detalle);
      } else {
        setError('No se encontró información para el ID proporcionado.');
        setDetalleCorte(null);
      }
    } catch (err) {
      setError(`Error al buscar el detalle del corte: ${err.message}`);
      setDetalleCorte(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle de Corte</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">ID del Corte</label>
        <input
          type="number"
          value={corteID}
          onChange={(e) => setCorteID(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Ingrese el ID del corte"
        />
      </div>
      <button
        onClick={buscarDetalleCorte}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-6">
        {detalleCorte ? (
          <div className="border border-gray-300 rounded p-4">
            <h2 className="text-lg font-bold mb-4">Información del Corte</h2>
            <p>
              <span className="font-semibold">ID:</span> {detalleCorte.corteID}
            </p>
            <p>
              <span className="font-semibold">Fecha:</span>{' '}
              {new Date(detalleCorte.fechaHora).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Total Vendido:</span>{' '}
              ${detalleCorte.totalVendido?.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Total Ventas:</span>{' '}
              {detalleCorte.totalVentas}
            </p>
          </div>
        ) : (
          !loading && !error && (
            <div className="text-gray-500">No se encontró información para el ID proporcionado.</div>
          )
        )}
      </div>
    </div>
  );
}
