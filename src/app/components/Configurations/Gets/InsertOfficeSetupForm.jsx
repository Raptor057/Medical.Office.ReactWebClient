'use client';

import React, { useState } from "react";
import { Typography, Card, CardBody, Input, Button } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertOfficeSetupForm() {
  const [formData, setFormData] = useState({
    nameOfOffice: "",
    address: "",
  });

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint
      const response = await MedicalOfficeWebApi.insertOfficeSetup(formData);
      console.log("Respuesta de la API:", response);
      setSuccess(true); // Mostrar mensaje de éxito
      setFormData({
        nameOfOffice: "",
        address: "",
      }); // Limpiar formulario
    } catch (err) {
      console.error("Error al enviar los datos:", err);
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="font-bold text-center">
          Configuración de Oficina
        </Typography>
        <Typography color="gray" className="text-sm font-normal text-center">
          Ingresa los detalles de la oficina a registrar.
        </Typography>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nombre de la Oficina"
            name="nameOfOffice"
            value={formData.nameOfOffice}
            onChange={handleChange}
            required
          />
          <Input
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* Botón de envío */}
          <div className="flex justify-end">
            <Button type="submit" color="blue" disabled={loading}>
              {loading ? "Enviando..." : "Registrar Oficina"}
            </Button>
          </div>
        </form>

        {/* Mensajes de éxito o error */}
        {success && (
          <Typography color="green" className="mt-2">
            ¡Oficina registrada con éxito!
          </Typography>
        )}
        {error && (
          <Typography color="red" className="mt-2">
            {typeof error === "string" ? error : "Error al registrar la oficina."}
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}
