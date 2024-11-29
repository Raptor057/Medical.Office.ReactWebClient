import React, { useState } from "react";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";

export default function InsertPathologicalBackgroundForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    previousHospitalization: false,
    previousSurgeries: false,
    diabetes: false,
    thyroidDiseases: false,
    hypertension: false,
    cardiopathies: false,
    trauma: false,
    cancer: false,
    tuberculosis: false,
    transfusions: false,
    respiratoryDiseases: false,
    gastrointestinalDiseases: false,
    stDs: false,
    stDsData: "",
    chronicKidneyDisease: false,
    others: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
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
      {/* Título */}
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Antecedentes Patológicos
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Complete la información sobre antecedentes patológicos del paciente.
      </Typography>

      {/* Checkboxes */}
      <div className="space-y-4">
        <Checkbox
          name="previousHospitalization"
          checked={formData.previousHospitalization}
          onChange={handleChange}
          label="Hospitalización previa"
        />
        <Checkbox
          name="previousSurgeries"
          checked={formData.previousSurgeries}
          onChange={handleChange}
          label="Cirugías previas"
        />
        <Checkbox
          name="diabetes"
          checked={formData.diabetes}
          onChange={handleChange}
          label="Diabetes"
        />
        <Checkbox
          name="thyroidDiseases"
          checked={formData.thyroidDiseases}
          onChange={handleChange}
          label="Enfermedades de la tiroides"
        />
        <Checkbox
          name="hypertension"
          checked={formData.hypertension}
          onChange={handleChange}
          label="Hipertensión"
        />
        <Checkbox
          name="cardiopathies"
          checked={formData.cardiopathies}
          onChange={handleChange}
          label="Cardiopatías"
        />
        <Checkbox
          name="trauma"
          checked={formData.trauma}
          onChange={handleChange}
          label="Traumas"
        />
        <Checkbox
          name="cancer"
          checked={formData.cancer}
          onChange={handleChange}
          label="Cáncer"
        />
        <Checkbox
          name="tuberculosis"
          checked={formData.tuberculosis}
          onChange={handleChange}
          label="Tuberculosis"
        />
        <Checkbox
          name="transfusions"
          checked={formData.transfusions}
          onChange={handleChange}
          label="Transfusiones"
        />
        <Checkbox
          name="respiratoryDiseases"
          checked={formData.respiratoryDiseases}
          onChange={handleChange}
          label="Enfermedades respiratorias"
        />
        <Checkbox
          name="gastrointestinalDiseases"
          checked={formData.gastrointestinalDiseases}
          onChange={handleChange}
          label="Enfermedades gastrointestinales"
        />
        <Checkbox
          name="stDs"
          checked={formData.stDs}
          onChange={handleChange}
          label="Enfermedades de transmisión sexual (ETS)"
        />
      </div>

      {/* Detalles adicionales para ETS */}
      {formData.stDs && (
        <Input
          label="Detalles de ETS"
          name="stDsData"
          value={formData.stDsData}
          onChange={handleChange}
          placeholder="Ingrese detalles sobre ETS"
          className="mt-4"
        />
      )}

      {/* Enfermedad renal crónica */}
      <Checkbox
        name="chronicKidneyDisease"
        checked={formData.chronicKidneyDisease}
        onChange={handleChange}
        label="Enfermedad renal crónica"
      />

      {/* Otros */}
      <Input
        label="Otros antecedentes patológicos"
        name="others"
        value={formData.others}
        onChange={handleChange}
        placeholder="Ingrese otros antecedentes médicos"
        className="mt-4"
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" ripple="light">
          Guardar Antecedentes Patológicos
        </Button>
      </div>
    </form>
  );
}
