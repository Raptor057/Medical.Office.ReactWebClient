'use client';

import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertPositionsForm() {
  const [position, setPosition] = useState(""); // Estado para la posición
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado de éxito

  // Manejo de cambios en el input
  const handleChange = (e) => {
    setPosition(e.target.value);
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint
      await MedicalOfficeWebApi.insertPosition(position);
      setSuccess(true); // Mostrar mensaje de éxito
      setPosition(""); // Limpiar formulario
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Posición
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa el campo para agregar una nueva posición.
      </Typography>

      {/* Campo del formulario */}
      <Input
        label="Posición"
        value={position}
        onChange={handleChange}
        required
        placeholder="Ejemplo: Médico General"
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Posición"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && (
        <Typography color="green" className="mt-2">
          ¡Posición registrada con éxito!
        </Typography>
      )}
      {error && (
        <Typography color="red" className="mt-2">
          {error}
        </Typography>
      )}
    </form>
  );
}
