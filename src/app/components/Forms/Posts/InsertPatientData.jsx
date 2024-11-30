import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";
import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function InsertPatientDataForm({ onSuccess }) {
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
    photo: "", // Aquí se almacenará la imagen en formato Base64
    internalNotes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar la carga de archivos e incluir Base64 en el estado
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: reader.result.split(",")[1], // Guardamos solo la parte Base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await MedicalOfficeWebApi.insertPatientData(formData);
      if (onSuccess) {
        onSuccess();
      }
      alert("Paciente registrado exitosamente.");
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
      });
    } catch (err) {
      setError(err.message || "Error al registrar el paciente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl p-6 mx-auto space-y-8 bg-white rounded-lg shadow-lg"
    >
      <Typography
        variant="h4"
        color="blue-gray"
        className="font-bold text-center"
      >
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
          required
        />
        <Input
          label="Apellido Paterno"
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
          placeholder="Ingresa el apellido paterno"
          required
        />
        <Input
          label="Apellido Materno"
          name="mothersSurname"
          value={formData.mothersSurname}
          onChange={handleChange}
          placeholder="Ingresa el apellido materno"
          required
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
      <Select
        label="Género"
        name="gender"
        value={formData.gender}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, gender: value }))
        }
        required
      >
        <Option value="">Selecciona el género</Option>
        <Option value="Masculino">Masculino</Option>
        <Option value="Femenino">Femenino</Option>
      </Select>

      {/* Dirección */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Ingresa la dirección"
          required
        />
        <Input
          label="Número Exterior"
          name="outsideNumber"
          value={formData.outsideNumber}
          onChange={handleChange}
          placeholder="Ingresa el número exterior"
        />
        <Input
          label="Número Interior"
          name="insideNumber"
          value={formData.insideNumber}
          onChange={handleChange}
          placeholder="Ingresa el número interior (opcional)"
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
          required
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
          required
        />
        <Input
          label="Correo Electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Ingresa el correo electrónico"
          required
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
        type="file"
        label="Foto"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
        placeholder="Sube una imagen"
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
      <Button
        type="submit"
        fullWidth
        color="blue"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar Paciente"}
      </Button>

      {error && (
        <Typography color="red" className="mt-4 text-center">
          {error}
        </Typography>
      )}
    </form>
  );
}
