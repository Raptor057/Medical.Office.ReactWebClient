import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";

export default function InsertPatientAllergiesForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    allergies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md"
    >
      {/* Título */}
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Alergias del Paciente
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Ingrese información sobre alergias conocidas del paciente.
      </Typography>

      {/* Campo de Alergias */}
      <div className="space-y-4">
        <Input
          label="Información de Alergias"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          placeholder="Ingrese información sobre alergias"
          className="w-full"
        />
      </div>

      {/* Botón de Envío */}
      {/* <div className="flex justify-end">
        <Button type="submit" color="blue" ripple="light">
          Guardar Alergias
        </Button>
      </div> */}
    </form>
  );
}
