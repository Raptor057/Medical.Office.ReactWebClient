'use client';

import { useState } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';

export default function DetalleVentas() {
  const [ventaID, setVentaID] = useState('');
  const [detalle, setDetalle] = useState([]);
  const [error, setError] = useState(null);

  const obtenerDetalleDeVentas = async () => {
    try {
      if (!ventaID) {
        setError('Debes ingresar un ID de venta.');
        return;
      }
      const data = await ExpressPos.obtenerDetalleDeVentas(ventaID);
      setDetalle(data);
      setError(null);
    } catch (err) {
      setError(`Error al obtener el detalle de la venta: ${err}`);
      setDetalle([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle de Ventas</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-2">ID de la Venta</label>
        <input
          type="text"
          value={ventaID}
          onChange={(e) => setVentaID(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <button
        onClick={obtenerDetalleDeVentas}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Consultar
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-4">
        {detalle.length > 0 ? (
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Producto</th>
                <th className="border px-4 py-2">Cantidad</th>
                <th className="border px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalle.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.producto}</td>
                  <td className="border px-4 py-2">{item.cantidad}</td>
                  <td className="border px-4 py-2">{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !error && <div className="text-gray-500 mt-4">No hay detalles disponibles.</div>
        )}
      </div>
    </div>
  );
}
