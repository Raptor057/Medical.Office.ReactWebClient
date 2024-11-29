import React, { useState } from "react";
import { Checkbox, Button, Textarea } from "@material-tailwind/react";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Checkbox
        label="Diabetes"
        name="diabetes"
        checked={formData.diabetes}
        onChange={handleChange}
      />
      <Checkbox
        label="Cardiopathies"
        name="cardiopathies"
        checked={formData.cardiopathies}
        onChange={handleChange}
      />
      <Checkbox
        label="Hypertension"
        name="hypertension"
        checked={formData.hypertension}
        onChange={handleChange}
      />
      <Checkbox
        label="Thyroid Diseases"
        name="thyroidDiseases"
        checked={formData.thyroidDiseases}
        onChange={handleChange}
      />
      <Checkbox
        label="Chronic Kidney Disease"
        name="chronicKidneyDisease"
        checked={formData.chronicKidneyDisease}
        onChange={handleChange}
      />
      <Checkbox
        label="Others"
        name="others"
        checked={formData.others}
        onChange={handleChange}
      />
      {formData.others && (
        <Textarea
          label="Other Details"
          name="othersData"
          value={formData.othersData}
          onChange={handleChange}
        />
      )}
      <Button type="submit" color="blue" ripple="light" fullWidth>
        Submit
      </Button>
    </form>
  );
}
