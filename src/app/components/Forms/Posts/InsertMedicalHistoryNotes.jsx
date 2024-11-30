import React, { useState } from "react";
import { Button, Textarea, Typography } from "@material-tailwind/react";

export default function InsertMedicalHistoryNotesForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    medicalHistoryNotesData: "",
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
      {/* Título del formulario */}
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold text-center"
      >
        Notas del Historial Médico
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Proporcione detalles importantes sobre el historial médico del paciente.
      </Typography>

      {/* Campo de texto para las notas */}
      <div>
        <Textarea
          label="Notas del Historial Médico"
          name="medicalHistoryNotesData"
          value={formData.medicalHistoryNotesData}
          onChange={handleChange}
          id="medicalHistoryNotesData"
          placeholder="Ingrese las notas del historial médico aquí..."
          rows={5}
          className="mt-4"
        />
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" ripple="light">
          Guardar Notas
        </Button>
      </div>
    </form>
  );
}
