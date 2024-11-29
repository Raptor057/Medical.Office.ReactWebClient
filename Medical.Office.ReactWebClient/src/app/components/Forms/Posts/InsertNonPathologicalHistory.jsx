import React, { useState } from "react";
import { Button, Checkbox, Input, Textarea } from "@material-tailwind/react";

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
    <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Non-Pathological History</h2>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <Checkbox
            name="physicalActivity"
            checked={formData.physicalActivity}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Physical Activity</label>
        </div>

        <div className="flex items-center">
          <Checkbox
            name="smoking"
            checked={formData.smoking}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Smoking</label>
        </div>

        <div className="flex items-center">
          <Checkbox
            name="alcoholism"
            checked={formData.alcoholism}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Alcoholism</label>
        </div>

        <div className="flex items-center">
          <Checkbox
            name="substanceAbuse"
            checked={formData.substanceAbuse}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Substance Abuse</label>
        </div>

        {formData.substanceAbuse && (
          <div>
            <label htmlFor="substanceAbuseData" className="block text-sm font-medium text-gray-700">Details of Substance Abuse</label>
            <Textarea
              name="substanceAbuseData"
              value={formData.substanceAbuseData}
              onChange={handleChange}
              id="substanceAbuseData"
              placeholder="Enter substance abuse details"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="flex items-center">
          <Checkbox
            name="recentVaccination"
            checked={formData.recentVaccination}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Recent Vaccination</label>
        </div>

        {formData.recentVaccination && (
          <div>
            <label htmlFor="recentVaccinationData" className="block text-sm font-medium text-gray-700">Details of Recent Vaccination</label>
            <Textarea
              name="recentVaccinationData"
              value={formData.recentVaccinationData}
              onChange={handleChange}
              id="recentVaccinationData"
              placeholder="Enter recent vaccination details"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="flex items-center">
          <Checkbox
            name="others"
            checked={formData.others}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Others</label>
        </div>

        {formData.others && (
          <div>
            <label htmlFor="othersData" className="block text-sm font-medium text-gray-700">Other Details</label>
            <Textarea
              name="othersData"
              value={formData.othersData}
              onChange={handleChange}
              id="othersData"
              placeholder="Enter other non-pathological history details"
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit Non-Pathological History
        </Button>
      </div>
    </form>
  );
}
