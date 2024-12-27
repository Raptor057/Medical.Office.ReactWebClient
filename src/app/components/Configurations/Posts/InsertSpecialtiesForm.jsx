'use client';

import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertSpecialtiesForm() {
  const [specialty, setSpecialty] = useState(""); // Estado para la especialidad
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado de éxito

  // Manejo de cambios en el input
  const handleChange = (e) => {
    setSpecialty(e.target.value);
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.insertSpecialties(specialty);
      setSuccess(true); // Mostrar mensaje de éxito
      setSpecialty(""); // Limpiar formulario
    } catch (err) {
      setError(err); // Capturar mensaje legible
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Especialidad
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa el campo para agregar una nueva especialidad.
      </Typography>

      {/* Campo del formulario */}
      <Input
        label="Especialidad"
        value={specialty}
        onChange={handleChange}
        required
        placeholder="Ejemplo: Cardiología"
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Especialidad"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && (
        <Typography color="green" className="mt-2">
          ¡Especialidad registrada con éxito!
        </Typography>
      )}
      {error && (
        <Typography color="red" className="mt-2">
          {typeof error === "string" ? error : "Ocurrió un error inesperado."}
        </Typography>
      )}
    </form>
  );
}
