import React, { useState } from "react";
import { Checkbox, Button, Textarea, Typography } from "@material-tailwind/react";

export default function InsertFamilyHistoryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    diabetes: false,
    cardiopathies: false,
    hypertension: false,
    thyroidDiseases: false,
    chronicKidneyDisease: false,
    others: false,
    othersData: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
        Historial Familiar
      </Typography>
      <Typography
        color="gray"
        className="text-sm font-normal text-center"
      >
        Selecciona las condiciones médicas familiares conocidas.
      </Typography>

      {/* Opciones de historial familiar */}
      <div className="space-y-4">
        <Checkbox
          label="Diabetes"
          name="diabetes"
          checked={formData.diabetes}
          onChange={handleChange}
        />
        <Checkbox
          label="Cardiopatías"
          name="cardiopathies"
          checked={formData.cardiopathies}
          onChange={handleChange}
        />
        <Checkbox
          label="Hipertensión"
          name="hypertension"
          checked={formData.hypertension}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedades de Tiroides"
          name="thyroidDiseases"
          checked={formData.thyroidDiseases}
          onChange={handleChange}
        />
        <Checkbox
          label="Enfermedad Renal Crónica"
          name="chronicKidneyDisease"
          checked={formData.chronicKidneyDisease}
          onChange={handleChange}
        />
        <Checkbox
          label="Otras"
          name="others"
          checked={formData.others}
          onChange={handleChange}
        />
        {/* Campo de texto para "Otras" */}
        {formData.others && (
          <Textarea
            label="Detalles adicionales"
            name="othersData"
            value={formData.othersData}
            onChange={handleChange}
            placeholder="Escribe aquí otros antecedentes familiares..."
          />
        )}
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue">
          Guardar Historial
        </Button>
      </div>
    </form>
  );
}
