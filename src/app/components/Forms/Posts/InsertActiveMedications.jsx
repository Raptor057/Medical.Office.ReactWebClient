import React, { useState } from "react";
import { Button, Textarea, Typography } from "@material-tailwind/react";

export default function InsertActiveMedicationsForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    activeMedicationsData: "",
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
      className="p-6 space-y-6 bg-white rounded-lg shadow-md"
    >
      {/* Título */}
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold text-center"
      >
        Registrar Medicamentos Activos
      </Typography>
      <Typography
        color="gray"
        className="text-sm font-normal text-center"
      >
        Ingresa los datos correspondientes a los medicamentos activos del
        paciente.
      </Typography>

      {/* Campo de texto para medicamentos activos */}
      <div>
        <Textarea
          label="Medicamentos Activos"
          name="activeMedicationsData"
          value={formData.activeMedicationsData}
          onChange={handleChange}
          placeholder="Escribe aquí los medicamentos activos"
          required
        />
      </div>

      {/* Botón de envío */}
      {/* <div className="flex justify-end">
        <Button type="submit" color="blue">
          Guardar Medicamentos
        </Button>
      </div> */}
    </form>
  );
}
