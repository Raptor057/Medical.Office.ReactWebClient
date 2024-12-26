'use client';

import React, { useState } from 'react';
import MedicalExpressPosWebApi from "@/app/utils/HttpRequestsExpressPos";
import Alerts from '@/app/components/Alerts';

const RegistrarCorte = () => {
  const [fechaHora, setFechaHora] = useState('');
  const [totalVendido, setTotalVendido] = useState('');
  const [totalVentas, setTotalVentas] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!fechaHora || !totalVendido || !totalVentas) {
      setMessage('Todos los campos son obligatorios.');
      setMessageType('error');
      return;
    }

    if (isNaN(totalVendido) || isNaN(totalVentas)) {
      setMessage('Total Vendido y Total Ventas deben ser números válidos.');
      setMessageType('error');
      return;
    }

    const corteData = {
      FechaHora: fechaHora,
      TotalVendido: parseFloat(totalVendido),
      TotalVentas: parseInt(totalVentas, 10),
    };

    setLoading(true);
    setMessage(null);

    try {
      const response = await MedicalExpressPosWebApi.registrarCorte(corteData);
      setMessage('Corte registrado exitosamente.');
      setMessageType('success');
      console.log('Corte registrado:', response);

      // Limpia el formulario tras el éxito
      setFechaHora('');
      setTotalVendido('');
      setTotalVentas('');
    } catch (error) {
      setMessage(`Error al registrar el corte: ${error.message || error}`);
      setMessageType('error');
    } finally {
      setLoading(false);
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
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md ${
            loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-700'
          }`}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar Corte'}
        </button>
      </form>
    </div>
  );
};

export default RegistrarCorte;
