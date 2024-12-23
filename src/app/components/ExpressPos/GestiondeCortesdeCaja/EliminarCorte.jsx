'use client';

import { useState } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';

export default function EliminarCorte() {
  const [corteID, setCorteID] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(null);

  const eliminarCorte = async () => {
    try {
      if (!corteID) {
        setError('Debes ingresar un ID de corte válido.');
        return;
      }
      await ExpressPos.eliminarCorte(corteID);
      setMensaje(`El corte con ID ${corteID} se eliminó correctamente.`);
      setError(null);
      setCorteID('');
    } catch (err) {
      setError(`Error al eliminar el corte: ${err}`);
      setMensaje('');
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
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
      {mensaje && <div className="text-green-500 mt-4">{mensaje}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
}
