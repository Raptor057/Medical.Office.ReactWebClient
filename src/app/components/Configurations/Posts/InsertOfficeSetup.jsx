import React, { useState } from "react";
import { Button, Input, Card, Typography } from "@material-tailwind/react";

export default function InsertOfficeSetupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nameOfOffice: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Card shadow={true} className="max-w-lg p-6 mx-auto bg-white rounded-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        Configuración de Oficina
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input: Nombre de la Oficina */}
        <div>
          <label htmlFor="nameOfOffice" className="block mb-2 text-sm font-medium text-gray-700">
            Nombre de la Oficina
          </label>
          <Input
            type="text"
            name="nameOfOffice"
            id="nameOfOffice"
            value={formData.nameOfOffice}
            onChange={handleChange}
            placeholder="Ingresa el nombre de la oficina"
            size="md"
            className="text-gray-800"
          />
        </div>

        {/* Input: Dirección */}
        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-700">
            Dirección
          </label>
          <Input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ingresa la dirección de la oficina"
            size="md"
            className="text-gray-800"
          />
        </div>

        {/* Botón Enviar */}
        <div className="flex justify-center">
          <Button
            type="submit"
            color="indigo"
            className="w-full text-lg font-semibold"
          >
            Guardar Configuración
          </Button>
        </div>
      </form>
    </Card>
  );
}
