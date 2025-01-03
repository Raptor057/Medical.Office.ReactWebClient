'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Textarea, Typography, Select, Option } from "@material-tailwind/react";
import Link from "next/link";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertPatientDataForm() {
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

  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito
  const [genders, setGenders] = useState([]); // Lista de géneros

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await MedicalOfficeWebApi.getAllConfigurations();
        const gendersData = response?.allConfigurations?.genders || [];
        setGenders(gendersData);
      } catch (err) {
        console.error("Error al obtener los géneros:", err);
      }
    };
    fetchGenders();
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo de cambios en el archivo de imagen
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 25 * 1024 * 1024) { // Máximo 25 MB
        setError("El tamaño máximo permitido para la imagen es de 25 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result.split(",")[1] }));
        setError(null); // Limpia cualquier error previo
      };
      reader.onerror = () => {
        setError("Error al leer el archivo. Intente nuevamente.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint
      await MedicalOfficeWebApi.insertPatientData(formData);
      setSuccess(true); // Mostrar mensaje de éxito
      setFormData({
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
      }); // Limpiar el formulario
    } catch (err) {
      setError(err.message || "Error al registrar el paciente. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Nuevo Paciente
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa la información del paciente para registrarlo.
      </Typography>

      {/* Campos del formulario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
        <Input
          label="Apellido Paterno"
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
          required
        />
        <Input
          label="Apellido Materno"
          name="mothersSurname"
          value={formData.mothersSurname}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          label="Fecha de Nacimiento"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <div>
          <Typography variant="small" className="mb-2">
            Género
          </Typography>
          <Select
            value={formData.gender}
            onChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
            required
          >
            {genders.map((gender, index) => (
              <Option key={index} value={gender.gender.trim()}>
                {gender.gender.trim()}
              </Option>
            ))}
          </Select>
        </div>
        <Input label="Dirección" name="address" value={formData.address} onChange={handleChange} />
        <Input label="País" name="country" value={formData.country} onChange={handleChange} />
        <Input label="Ciudad" name="city" value={formData.city} onChange={handleChange} />
        <Input label="Estado" name="state" value={formData.state} onChange={handleChange} />
        <Input label="Código Postal" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        <Input
          label="Número Exterior"
          name="outsideNumber"
          value={formData.outsideNumber}
          onChange={handleChange}
        />
        <Input
          label="Número Interior"
          name="insideNumber"
          value={formData.insideNumber}
          onChange={handleChange}
        />
        <Input
          label="Teléfono"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          label="Nombre del Contacto de Emergencia"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
        />
        <Input
          label="Teléfono del Contacto de Emergencia"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
        />
        <Input
          label="Proveedor de Seguro"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleChange}
        />
        <Input
          label="Número de Póliza"
          name="policyNumber"
          value={formData.policyNumber}
          onChange={handleChange}
        />
        <Input
          label="Tipo de Sangre"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        />
        <Textarea
          label="Notas Internas"
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
          placeholder="Escribe aquí las notas internas..."
        />
        <div>
          <Typography variant="small" className="mb-2">
            Foto del Paciente (Máximo 25 MB)
          </Typography>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Guardar Paciente"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && <Typography color="green" className="mt-2">¡Paciente registrado con éxito!</Typography>}
      {error && <Typography color="red" className="mt-2">{error}</Typography>}
    </form>
  );
}
