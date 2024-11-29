import React, { useState } from "react";
import { Button, Input, Select, Option, Textarea } from "@material-tailwind/react";

export default function InsertPatientDataForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    fathersSurname: "",
    mothersSurname: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    outsideNumber: "",
    insideNumber: "",
    phoneNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceProvider: "",
    policyNumber: "",
    bloodType: "",
    photo: "",
    internalNotes: "",
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
      <h2 className="mb-4 text-2xl font-semibold text-center text-gray-800">Patient Data</h2>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          id="name"
          placeholder="Enter patient's full name"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Father's Surname */}
      <div>
        <label htmlFor="fathersSurname" className="block text-sm font-medium text-gray-700">Father's Surname</label>
        <Input
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
          id="fathersSurname"
          placeholder="Enter father's surname"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Mother's Surname */}
      <div>
        <label htmlFor="mothersSurname" className="block text-sm font-medium text-gray-700">Mother's Surname</label>
        <Input
          name="mothersSurname"
          value={formData.mothersSurname}
          onChange={handleChange}
          id="mothersSurname"
          placeholder="Enter mother's surname"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <Input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          id="dateOfBirth"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          id="gender"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          id="address"
          placeholder="Enter patient's address"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
        <Input
          name="country"
          value={formData.country}
          onChange={handleChange}
          id="country"
          placeholder="Enter country"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <Input
          name="city"
          value={formData.city}
          onChange={handleChange}
          id="city"
          placeholder="Enter city"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* State */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <Input
          name="state"
          value={formData.state}
          onChange={handleChange}
          id="state"
          placeholder="Enter state"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Zip Code */}
      <div>
        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
        <Input
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          id="zipCode"
          placeholder="Enter zip code"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Outside Number */}
      <div>
        <label htmlFor="outsideNumber" className="block text-sm font-medium text-gray-700">Outside Number</label>
        <Input
          name="outsideNumber"
          value={formData.outsideNumber}
          onChange={handleChange}
          id="outsideNumber"
          placeholder="Enter outside number"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Inside Number */}
      <div>
        <label htmlFor="insideNumber" className="block text-sm font-medium text-gray-700">Inside Number</label>
        <Input
          name="insideNumber"
          value={formData.insideNumber}
          onChange={handleChange}
          id="insideNumber"
          placeholder="Enter inside number"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <Input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          id="phoneNumber"
          placeholder="Enter phone number"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter email"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Emergency Contact Name */}
      <div>
        <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
        <Input
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          id="emergencyContactName"
          placeholder="Enter emergency contact name"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Emergency Contact Phone */}
      <div>
        <label htmlFor="emergencyContactPhone" className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
        <Input
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          id="emergencyContactPhone"
          placeholder="Enter emergency contact phone"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Insurance Provider */}
      <div>
        <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700">Insurance Provider</label>
        <Input
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleChange}
          id="insuranceProvider"
          placeholder="Enter insurance provider"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Policy Number */}
      <div>
        <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-700">Policy Number</label>
        <Input
          name="policyNumber"
          value={formData.policyNumber}
          onChange={handleChange}
          id="policyNumber"
          placeholder="Enter policy number"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Blood Type */}
      <div>
        <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
        <Input
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          id="bloodType"
          placeholder="Enter blood type"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Photo */}
      <div>
        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo URL</label>
        <Input
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          id="photo"
          placeholder="Enter URL for photo"
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Internal Notes */}
      <div>
        <label htmlFor="internalNotes" className="block text-sm font-medium text-gray-700">Internal Notes</label>
        <Textarea
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
          id="internalNotes"
          placeholder="Enter any internal notes"
          rows={4}
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-4 text-center">
        <Button type="submit" color="blue">Submit</Button>
      </div>
    </form>
  );
}
