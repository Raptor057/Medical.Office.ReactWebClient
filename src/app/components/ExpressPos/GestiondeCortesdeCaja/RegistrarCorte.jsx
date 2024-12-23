'use client';

import React, { useState } from 'react';
import ExpressPos from '@/app/utils/ExpressPos';
import Alerts from '@/app/components/Alerts';

const RegistrarCorte = () => {
    const [fechaHora, setFechaHora] = useState('');
    const [totalVendido, setTotalVendido] = useState('');
    const [totalVentas, setTotalVentas] = useState('');
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const corteData = {
            FechaHora: fechaHora,
            TotalVendido: parseFloat(totalVendido),
            TotalVentas: parseInt(totalVentas, 10),
        };

        try {
            const response = await ExpressPos.registrarCorte(corteData);
            setMessage('Corte registrado exitosamente.');
            setMessageType('success');
            console.log('Corte registrado:', response);
        } catch (error) {
            setMessage(`Error al registrar el corte: ${error}`);
            setMessageType('error');
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Registrar Corte</h1>

            {message && <Alerts message={message} type={messageType} />}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="fechaHora" className="block font-medium text-gray-700">
                        Fecha y Hora
                    </label>
                    <input
                        type="datetime-local"
                        id="fechaHora"
                        value={fechaHora}
                        onChange={(e) => setFechaHora(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="totalVendido" className="block font-medium text-gray-700">
                        Total Vendido
                    </label>
                    <input
                        type="number"
                        id="totalVendido"
                        value={totalVendido}
                        onChange={(e) => setTotalVendido(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        step="0.01"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="totalVentas" className="block font-medium text-gray-700">
                        Total de Ventas
                    </label>
                    <input
                        type="number"
                        id="totalVentas"
                        value={totalVentas}
                        onChange={(e) => setTotalVentas(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Registrar Corte
                </button>
            </form>
        </div>
    );
};

export default RegistrarCorte;
