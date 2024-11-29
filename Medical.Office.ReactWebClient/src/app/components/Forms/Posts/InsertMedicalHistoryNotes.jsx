import React, { useState } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";

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
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Medical History Notes</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="medicalHistoryNotesData" className="block text-sm font-medium text-gray-700">Medical History Notes</label>
          <Textarea
            name="medicalHistoryNotesData"
            value={formData.medicalHistoryNotesData}
            onChange={handleChange}
            id="medicalHistoryNotesData"
            placeholder="Enter medical history notes"
            className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit Medical History Notes
        </Button>
      </div>
    </form>
  );
}
