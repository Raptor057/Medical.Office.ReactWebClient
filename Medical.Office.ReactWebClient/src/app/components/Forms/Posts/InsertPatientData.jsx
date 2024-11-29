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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 bg-white rounded-lg shadow-lg"
    >
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
          placeholder="Ingresa el nombre del paciente"
        />
        <Input
          label="Apellido Paterno"
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
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
        />
      </div>

      {/* Selección de género */}
      <Select
        label="Género"
        name="gender"
        value={formData.gender}
        onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
      >
        <Option value="">Selecciona el género</Option>
        <Option value="male">Masculino</Option>
        <Option value="female">Femenino</Option>
        <Option value="other">Otro</Option>
      </Select>

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
          label="Número Exterior"
          name="outsideNumber"
          value={formData.outsideNumber}
          onChange={handleChange}
          placeholder="Número exterior"
        />
        <Input
          label="Número Interior"
          name="insideNumber"
          value={formData.insideNumber}
          onChange={handleChange}
          placeholder="Número interior (opcional)"
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

      {/* Información de contacto */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Teléfono"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Ingresa el número de teléfono"
        />
        <Input
          label="Correo Electrónico"
          name="email"
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
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          placeholder="Teléfono del contacto de emergencia"
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

      {/* Información adicional */}
      <Input
        label="Tipo de Sangre"
        name="bloodType"
        value={formData.bloodType}
        onChange={handleChange}
        placeholder="Ingresa el tipo de sangre"
      />
      <Input
        label="Foto (URL)"
        name="photo"
        value={formData.photo}
        onChange={handleChange}
        placeholder="URL de la foto (opcional)"
      />
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
