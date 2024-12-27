'use client';
import React, { useState, useEffect } from "react"; // Asegúrate de incluir useEffect aquí
import { Button, Input, Typography, Select, Option } from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function InsertDoctorsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    phoneNumber: "",
    email: "",
  });

  const [specialties, setSpecialties] = useState([]); // Lista de especialidades
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado para éxito

  // Obtener las especialidades desde el endpoint
  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await MedicalOfficeWebApi.getAllConfigurations();
        const specialtiesData = data.allConfigurations?.specialties || [];
        setSpecialties(specialtiesData);
      } catch (err) {
        setError("Error al cargar las especialidades");
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Formatear y validar el teléfono
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;

    // Permitir solo números, el símbolo "+" y espacios
    const formattedValue = value.replace(/[^\d+]/g, "");

    setFormData({
      ...formData,
      phoneNumber: formattedValue,
    });
  };

  // Manejo de cambios en el combobox
  const handleSpecialtyChange = (value) => {
    setFormData({
      ...formData,
      specialty: value,
    });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Llamada al endpoint
      await MedicalOfficeWebApi.insertDoctor(formData);
      setSuccess(true); // Mostrar mensaje de éxito
      setFormData({
        firstName: "",
        lastName: "",
        specialty: "",
        phoneNumber: "",
        email: "",
      }); // Limpiar formulario
    } catch (err) {
      setError(err); // Mostrar el error capturado
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white rounded-lg shadow-md">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Doctor
      </Typography>
      <Typography color="gray" className="text-sm font-normal text-center">
        Completa la información del doctor para registrarlo.
      </Typography>

      {/* Campos del formulario */}
      <Input
        label="Nombre"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <Input
        label="Apellido"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      {/* Combobox de especialidades */}
      <div>
        <Typography variant="small" className="mb-2">
          Especialidad
        </Typography>
        <Select
          value={formData.specialty}
          onChange={(value) => handleSpecialtyChange(value)}
          required
        >
          {specialties.map((specialty, index) => (
            <Option key={index} value={specialty.specialty}>
              {specialty.specialty}
            </Option>
          ))}
        </Select>
      </div>
      <Input
        label="Teléfono"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="+1234567890"
        required
      />
      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Botón de envío */}
      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Doctor"}
        </Button>
      </div>

      {/* Mensajes de éxito o error */}
      {success && (
        <Typography color="green" className="mt-2">
          ¡Doctor registrado con éxito!
        </Typography>
      )}
      {error && (
        <Typography color="red" className="mt-2">
          {error}
        </Typography>
      )}
    </form>
  );
}
