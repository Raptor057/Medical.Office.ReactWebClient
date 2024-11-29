import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

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
    <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Patient Allergies</h2>

      <div>
        <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
          Allergies Information
        </label>
        <Input
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          id="allergies"
          placeholder="Enter allergies information"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit Allergies
        </Button>
      </div>
    </form>
  );
}
