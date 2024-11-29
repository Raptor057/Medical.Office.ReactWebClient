import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";

export default function InsertOfficeSetupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nameOfOffice: "",
    address: "",
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
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Office Setup</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="nameOfOffice" className="block text-sm font-medium text-gray-700">Name of Office</label>
          <Input
            name="nameOfOffice"
            value={formData.nameOfOffice}
            onChange={handleChange}
            id="nameOfOffice"
            placeholder="Enter the name of the office"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            id="address"
            placeholder="Enter the address of the office"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit Office Setup
        </Button>
      </div>
    </form>
  );
}
