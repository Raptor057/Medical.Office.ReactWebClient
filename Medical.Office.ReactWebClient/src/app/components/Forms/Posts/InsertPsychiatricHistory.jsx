import React, { useState } from "react";
import { Button, Input, Switch, Textarea, Typography } from "@material-tailwind/react";

const InsertPsychiatricHistoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    familyHistory: false,
    familyHistoryData: "",
    affectedAreas: "",
    pastAndCurrentTreatments: "",
    familySocialSupport: false,
    familySocialSupportData: "",
    workLifeAspects: "",
    socialLifeAspects: "",
    authorityRelationship: "",
    impulseControl: "",
    frustrationManagement: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSwitch = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <Typography variant="h4" className="mb-4 text-center" color="blue-gray">
        Historial Psiquiátrico
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Antecedentes Familiares */}
        <div>
          <Switch
            label="Antecedentes Familiares"
            checked={formData.familyHistory}
            onChange={() => toggleSwitch("familyHistory")}
            color="teal"
          />
          {formData.familyHistory && (
            <Textarea
              label="Detalles de Antecedentes Familiares"
              name="familyHistoryData"
              value={formData.familyHistoryData}
              onChange={handleChange}
              placeholder="Describe los antecedentes familiares"
              className="mt-2"
            />
          )}
        </div>

        {/* Áreas Afectadas */}
        <Input
          label="Áreas Afectadas"
          name="affectedAreas"
          value={formData.affectedAreas}
          onChange={handleChange}
          placeholder="Describe las áreas afectadas"
        />

        {/* Tratamientos Pasados y Actuales */}
        <Textarea
          label="Tratamientos Pasados y Actuales"
          name="pastAndCurrentTreatments"
          value={formData.pastAndCurrentTreatments}
          onChange={handleChange}
          placeholder="Especifica los tratamientos recibidos"
        />

        {/* Soporte Social Familiar */}
        <div>
          <Switch
            label="Soporte Social Familiar"
            checked={formData.familySocialSupport}
            onChange={() => toggleSwitch("familySocialSupport")}
            color="teal"
          />
          {formData.familySocialSupport && (
            <Textarea
              label="Detalles de Soporte Social Familiar"
              name="familySocialSupportData"
              value={formData.familySocialSupportData}
              onChange={handleChange}
              placeholder="Describe el soporte social familiar"
              className="mt-2"
            />
          )}
        </div>

        {/* Aspectos de Vida Laboral */}
        <Input
          label="Aspectos de Vida Laboral"
          name="workLifeAspects"
          value={formData.workLifeAspects}
          onChange={handleChange}
          placeholder="Describe los aspectos laborales relevantes"
        />

        {/* Aspectos de Vida Social */}
        <Input
          label="Aspectos de Vida Social"
          name="socialLifeAspects"
          value={formData.socialLifeAspects}
          onChange={handleChange}
          placeholder="Describe los aspectos sociales relevantes"
        />

        {/* Relación con Autoridad */}
        <Input
          label="Relación con la Autoridad"
          name="authorityRelationship"
          value={formData.authorityRelationship}
          onChange={handleChange}
          placeholder="Describe cómo maneja la relación con autoridad"
        />

        {/* Control de Impulsos */}
        <Input
          label="Control de Impulsos"
          name="impulseControl"
          value={formData.impulseControl}
          onChange={handleChange}
          placeholder="Describe el control de impulsos del paciente"
        />

        {/* Manejo de Frustración */}
        <Input
          label="Manejo de Frustración"
          name="frustrationManagement"
          value={formData.frustrationManagement}
          onChange={handleChange}
          placeholder="Describe cómo maneja la frustración"
        />

        {/* Botón de Envío */}
        <Button type="submit" color="teal" fullWidth>
          Guardar Historial Psiquiátrico
        </Button>
      </form>
    </div>
  );
};

export default InsertPsychiatricHistoryForm;
