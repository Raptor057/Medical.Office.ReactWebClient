'use client';

import { useState } from 'react';
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";

export default function EliminarCorte() {
  const [corteID, setCorteID] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const eliminarCorte = async () => {
    if (!corteID || isNaN(corteID)) {
      setError('Debes ingresar un ID de corte válido.');
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje('');
    try {
      await MedicalExpressPosWebApi.eliminarCorte(corteID);
      setMensaje(`El corte con ID ${corteID} se eliminó correctamente.`);
      setCorteID('');
    } catch (err) {
      setError(`Error al eliminar el corte: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Eliminar Corte</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">ID del Corte</label>
        <input
          type="number"
          value={corteID}
          onChange={(e) => setCorteID(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Ingrese el ID del corte a eliminar"
        />
      </div>
      <button
        onClick={eliminarCorte}
        className={`bg-red-500 text-white px-4 py-2 rounded ${
          loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Eliminando...' : 'Eliminar'}
      </button>
      {mensaje && <div className="text-green-500 mt-4">{mensaje}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
