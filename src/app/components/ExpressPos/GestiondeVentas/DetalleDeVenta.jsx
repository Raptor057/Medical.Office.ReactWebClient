'use client';

import React, { useState } from 'react';
import ExpressPos from '../../utils/ExpressPos'; // Asegúrate de que la ruta sea correcta
import { toast } from 'react-toastify';

const DetalleDeVenta = () => {
    const [ventaID, setVentaID] = useState('');
    const [detalleVenta, setDetalleVenta] = useState(null);
    const [loading, setLoading] = useState(false);

    const buscarDetalleVenta = async () => {
        if (!ventaID) {
            toast.error("Por favor, ingresa un ID de venta.");
            return;
        }

        setLoading(true);
        try {
            const data = await ExpressPos.getVentaPorId(ventaID);
            setDetalleVenta(data);
            if (!data) {
                toast.info("No se encontró el detalle de la venta.");
            }
        } catch (error) {
            toast.error("Error al buscar el detalle de la venta: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Detalle de Venta</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    ID de Venta:
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={ventaID}
                        onChange={(e) => setVentaID(e.target.value)}
                    />
                </label>
                <button
                    onClick={buscarDetalleVenta}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            {loading ? (
                <p>Cargando detalle de la venta...</p>
            ) : detalleVenta ? (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Información de la Venta</h3>
                    <p><strong>ID:</strong> {detalleVenta.ventaID}</p>
                    <p><strong>Fecha:</strong> {new Date(detalleVenta.fechaHora).toLocaleString()}</p>
                    <p><strong>Total:</strong> {detalleVenta.total}</p>
                    <h3 className="text-lg font-semibold mt-4">Productos</h3>
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Producto</th>
                                <th className="border border-gray-300 px-4 py-2">Cantidad</th>
                                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleVenta.productos.map((producto, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
                                    <td className="border border-gray-300 px-4 py-2">{producto.cantidad}</td>
                                    <td className="border border-gray-300 px-4 py-2">{producto.subtotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No hay información para mostrar.</p>
            )}
        </div>
    );
};

export default DetalleDeVenta;
