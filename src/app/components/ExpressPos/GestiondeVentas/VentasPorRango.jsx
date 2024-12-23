'use client';

import React, { useState } from 'react';
import ExpressPos from '../../utils/ExpressPos'; // Asegúrate de que la ruta sea correcta
import { toast } from 'react-toastify';

const VentasPorRango = () => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(false);

    const buscarVentasPorRango = async () => {
        if (!fechaInicio || !fechaFin) {
            toast.error("Por favor, selecciona ambas fechas.");
            return;
        }

        setLoading(true);
        try {
            const data = await ExpressPos.getVentasPorRango(fechaInicio, fechaFin);
            setVentas(data);
            if (data.length === 0) {
                toast.info("No se encontraron ventas en este rango de fechas.");
            }
        } catch (error) {
            toast.error("Error al buscar ventas: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Buscar Ventas por Rango de Fechas</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Fecha Inicio:
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </label>
                <label className="block text-sm font-medium mb-2">
                    Fecha Fin:
                    <input
                        type="date"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </label>
                <button
                    onClick={buscarVentasPorRango}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            {loading ? (
                <p>Cargando ventas...</p>
            ) : ventas.length === 0 ? (
                <p>No se encontraron ventas.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID Venta</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.ventaID}>
                                <td className="border border-gray-300 px-4 py-2">{venta.ventaID}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(venta.fechaHora).toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{venta.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VentasPorRango;
