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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const requiredFields = ["name", "fathersSurname", "dateOfBirth", "gender"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`El campo ${field} es obligatorio.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation() && onSubmit) {
      onSubmit(formData);
    }
  };

  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Registro de Paciente
      </h2>

      {/* Datos personales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderInput("Nombre", "name", "text", "Ingresa el nombre del paciente")}
        {renderInput("Apellido Paterno", "fathersSurname", "text", "Ingresa el apellido paterno")}
        {renderInput("Apellido Materno", "mothersSurname", "text", "Ingresa el apellido materno")}
        {renderInput("Fecha de Nacimiento", "dateOfBirth", "date")}
      </div>

      {/* Selección de género */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Género
        </label>
        <Select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
          className="w-full mt-1"
        >
          <Option value="">Selecciona el género</Option>
          <Option value="male">Masculino</Option>
          <Option value="female">Femenino</Option>
          <Option value="other">Otro</Option>
        </Select>
      </div>

      {/* Información de contacto */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {renderInput("Teléfono", "phoneNumber", "tel", "Ingresa el número de teléfono")}
        {renderInput("Correo Electrónico", "email", "email", "Ingresa el correo electrónico")}
        {renderInput("Nombre del Contacto de Emergencia", "emergencyContactName", "text", "Ingresa el nombre del contacto de emergencia")}
        {renderInput("Teléfono del Contacto de Emergencia", "emergencyContactPhone", "tel", "Ingresa el teléfono del contacto de emergencia")}
      </div>

      {/* Dirección */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Dirección</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {renderInput("Calle y Número", "address", "text", "Ingresa la calle y número")}
          {renderInput("Ciudad", "city", "text", "Ingresa la ciudad")}
          {renderInput("Estado", "state", "text", "Ingresa el estado")}
          {renderInput("Código Postal", "zipCode", "text", "Ingresa el código postal")}
          {renderInput("País", "country", "text", "Ingresa el país")}
        </div>
      </div>

      {/* Seguro médico */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Seguro Médico</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {renderInput("Proveedor de Seguro", "insuranceProvider", "text", "Ingresa el proveedor de seguro")}
          {renderInput("Número de Póliza", "policyNumber", "text", "Ingresa el número de póliza")}
        </div>
      </div>

      {/* Notas internas */}
      <div>
        <label htmlFor="internalNotes" className="block text-sm font-medium text-gray-700">
          Notas Internas
        </label>
        <Textarea
          id="internalNotes"
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
          placeholder="Escribe cualquier nota interna"
          rows={4}
          className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botón de envío */}
      <div className="text-center">
        <Button type="submit" color="blue" className="w-full">
          Guardar
        </Button>
      </div>
    </form>
  );
}
