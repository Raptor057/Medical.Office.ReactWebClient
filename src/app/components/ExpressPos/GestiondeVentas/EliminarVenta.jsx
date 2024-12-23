'use client';

import React, { useEffect, useState } from 'react';
import ExpressPos from '../../utils/ExpressPos'; // Asegúrate de que la ruta sea correcta
import { toast } from 'react-toastify';

const EliminarVenta = () => {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarVentas();
    }, []);

    const cargarVentas = async () => {
        setLoading(true);
        try {
            const data = await ExpressPos.getVentas();
            setVentas(data);
        } catch (error) {
            toast.error("Error al cargar las ventas: " + error);
        } finally {
            setLoading(false);
        }
    };

    const eliminarVenta = async (ventaID) => {
        if (!window.confirm("¿Estás seguro de eliminar esta venta?")) return;

        try {
            await ExpressPos.deleteVenta(ventaID);
            toast.success("Venta eliminada correctamente.");
            setVentas((prev) => prev.filter((venta) => venta.ventaID !== ventaID));
        } catch (error) {
            toast.error("Error al eliminar la venta: " + error);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Eliminar Ventas</h2>
            {loading ? (
                <p>Cargando ventas...</p>
            ) : ventas.length === 0 ? (
                <p>No hay ventas disponibles.</p>
            ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID Venta</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                            <th className="border border-gray-300 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.ventaID}>
                                <td className="border border-gray-300 px-4 py-2">{venta.ventaID}</td>
                                <td className="border border-gray-300 px-4 py-2">{new Date(venta.fechaHora).toLocaleString()}</td>
                                <td className="border border-gray-300 px-4 py-2">{venta.total}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => eliminarVenta(venta.ventaID)}
                                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EliminarVenta;
