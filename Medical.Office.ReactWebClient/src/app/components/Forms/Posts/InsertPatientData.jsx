import React, { useState } from "react";
import { Button, Input, Select, Option, Textarea, Typography } from "@material-tailwind/react";

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
    phoneNumber: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceProvider: "",
    policyNumber: "",
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
        alert(`El campo "${field}" es obligatorio.`);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 bg-white rounded-lg shadow-lg"
    >
      {/* Título */}
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registro de Paciente
      </Typography>
      <Typography color="gray" className="text-center">
        Complete los campos obligatorios para registrar un nuevo paciente.
      </Typography>

      {/* Datos personales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Ingresa el nombre del paciente"
        />
        <Input
          label="Apellido Paterno"
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
          required
          placeholder="Ingresa el apellido paterno"
        />
        <Input
          label="Apellido Materno"
          name="mothersSurname"
          value={formData.mothersSurname}
          onChange={handleChange}
          placeholder="Ingresa el apellido materno"
        />
        <Input
          label="Fecha de Nacimiento"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </div>

      {/* Selección de género */}
      <div>
        <Select
          label="Género"
          name="gender"
          value={formData.gender}
          onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
          required
        >
          <Option value="">Selecciona el género</Option>
          <Option value="male">Masculino</Option>
          <Option value="female">Femenino</Option>
          <Option value="other">Otro</Option>
        </Select>
      </div>

      {/* Información de contacto */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Teléfono"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Ingresa el número de teléfono"
        />
        <Input
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa el correo electrónico"
        />
        <Input
          label="Contacto de Emergencia"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          placeholder="Nombre del contacto de emergencia"
        />
        <Input
          label="Teléfono del Contacto de Emergencia"
          name="emergencyContactPhone"
          type="tel"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          placeholder="Teléfono del contacto de emergencia"
        />
      </div>

      {/* Dirección */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Calle y número"
        />
        <Input
          label="Ciudad"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ingresa la ciudad"
        />
        <Input
          label="Estado"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Ingresa el estado"
        />
        <Input
          label="Código Postal"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          placeholder="Ingresa el código postal"
        />
        <Input
          label="País"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Ingresa el país"
        />
      </div>

      {/* Seguro médico */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Proveedor de Seguro"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleChange}
          placeholder="Ingresa el proveedor de seguro"
        />
        <Input
          label="Número de Póliza"
          name="policyNumber"
          value={formData.policyNumber}
          onChange={handleChange}
          placeholder="Ingresa el número de póliza"
        />
      </div>

      {/* Notas internas */}
      <Textarea
        label="Notas Internas"
        name="internalNotes"
        value={formData.internalNotes}
        onChange={handleChange}
        placeholder="Escribe cualquier nota interna"
        rows={4}
      />

      {/* Botón de envío */}
      <Button type="submit" fullWidth color="blue">
        Guardar Paciente
      </Button>
    </form>
  );
}
