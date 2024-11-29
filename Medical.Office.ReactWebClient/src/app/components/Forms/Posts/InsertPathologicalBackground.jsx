import React, { useState } from "react";
import { Button, Checkbox, Input } from "@material-tailwind/react";

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
    <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Pathological Background</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Checkbox
            name="previousHospitalization"
            checked={formData.previousHospitalization}
            onChange={handleChange}
            label="Previous Hospitalization"
          />
          <Checkbox
            name="previousSurgeries"
            checked={formData.previousSurgeries}
            onChange={handleChange}
            label="Previous Surgeries"
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
            label="Thyroid Diseases"
          />
          <Checkbox
            name="hypertension"
            checked={formData.hypertension}
            onChange={handleChange}
            label="Hypertension"
          />
          <Checkbox
            name="cardiopathies"
            checked={formData.cardiopathies}
            onChange={handleChange}
            label="Cardiopathies"
          />
          <Checkbox
            name="trauma"
            checked={formData.trauma}
            onChange={handleChange}
            label="Trauma"
          />
          <Checkbox
            name="cancer"
            checked={formData.cancer}
            onChange={handleChange}
            label="Cancer"
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
            label="Transfusions"
          />
          <Checkbox
            name="respiratoryDiseases"
            checked={formData.respiratoryDiseases}
            onChange={handleChange}
            label="Respiratory Diseases"
          />
          <Checkbox
            name="gastrointestinalDiseases"
            checked={formData.gastrointestinalDiseases}
            onChange={handleChange}
            label="Gastrointestinal Diseases"
          />
          <Checkbox
            name="stDs"
            checked={formData.stDs}
            onChange={handleChange}
            label="Sexually Transmitted Diseases (STDs)"
          />
        </div>

        <div>
          <label htmlFor="stDsData" className="block text-sm font-medium text-gray-700">STDs Details</label>
          <Input
            name="stDsData"
            value={formData.stDsData}
            onChange={handleChange}
            id="stDsData"
            placeholder="Details about STDs (if applicable)"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="chronicKidneyDisease" className="block text-sm font-medium text-gray-700">Chronic Kidney Disease</label>
          <Checkbox
            name="chronicKidneyDisease"
            checked={formData.chronicKidneyDisease}
            onChange={handleChange}
            label="Chronic Kidney Disease"
          />
        </div>

        <div>
          <label htmlFor="others" className="block text-sm font-medium text-gray-700">Other Pathological Background</label>
          <Input
            name="others"
            value={formData.others}
            onChange={handleChange}
            id="others"
            placeholder="Other medical conditions"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit Pathological Background
        </Button>
      </div>
    </form>
  );
}
