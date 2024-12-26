import React, { useState } from "react";
import { Button, Checkbox, Textarea, Typography } from "@material-tailwind/react";

export default function InsertNonPathologicalHistoryForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    physicalActivity: false,
    smoking: false,
    alcoholism: false,
    substanceAbuse: false,
    substanceAbuseData: "",
    recentVaccination: false,
    recentVaccinationData: "",
    others: false,
    othersData: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
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
      className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md"
    >
      {/* Título del formulario */}
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold text-center"
      >
        Historial No Patológico
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Registre información importante sobre hábitos y antecedentes no
        patológicos del paciente.
      </Typography>

      {/* Actividad Física */}
      <div className="flex items-center">
        <Checkbox
          name="physicalActivity"
          checked={formData.physicalActivity}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Actividad Física
        </Typography>
      </div>

      {/* Tabaquismo */}
      <div className="flex items-center">
        <Checkbox
          name="smoking"
          checked={formData.smoking}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Tabaquismo
        </Typography>
      </div>

      {/* Alcoholismo */}
      <div className="flex items-center">
        <Checkbox
          name="alcoholism"
          checked={formData.alcoholism}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Alcoholismo
        </Typography>
      </div>

      {/* Consumo de Sustancias */}
      <div className="flex items-center">
        <Checkbox
          name="substanceAbuse"
          checked={formData.substanceAbuse}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Consumo de Sustancias
        </Typography>
      </div>
      {formData.substanceAbuse && (
        <Textarea
          label="Detalles del Consumo de Sustancias"
          name="substanceAbuseData"
          value={formData.substanceAbuseData}
          onChange={handleChange}
          placeholder="Ingrese detalles del consumo de sustancias"
          className="mt-2"
        />
      )}

      {/* Vacunación Reciente */}
      <div className="flex items-center">
        <Checkbox
          name="recentVaccination"
          checked={formData.recentVaccination}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Vacunación Reciente
        </Typography>
      </div>
      {formData.recentVaccination && (
        <Textarea
          label="Detalles de Vacunación Reciente"
          name="recentVaccinationData"
          value={formData.recentVaccinationData}
          onChange={handleChange}
          placeholder="Ingrese detalles de vacunación reciente"
          className="mt-2"
        />
      )}

      {/* Otros */}
      <div className="flex items-center">
        <Checkbox
          name="others"
          checked={formData.others}
          onChange={handleChange}
          className="mr-2"
        />
        <Typography className="text-sm font-medium text-gray-700">
          Otros
        </Typography>
      </div>
      {formData.others && (
        <Textarea
          label="Detalles Adicionales"
          name="othersData"
          value={formData.othersData}
          onChange={handleChange}
          placeholder="Ingrese otros detalles relevantes"
          className="mt-2"
        />
      )}

      {/* Botón de Envío */}
      {/* <div className="flex justify-end">
        <Button type="submit" color="blue" ripple="light">
          Guardar Historial No Patológico
        </Button>
      </div> */}
    </form>
  );
}
