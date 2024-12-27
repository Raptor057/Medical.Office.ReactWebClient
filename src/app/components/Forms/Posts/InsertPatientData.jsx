import React, { useState } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
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

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      await MedicalOfficeWebApi.insertPatientData(formData);
      setSuccess(true); // Mostrar mensaje de éxito
    } catch (err) {
      setError(err); // Mostrar el error capturado
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
        <Input label="Género" name="gender" value={formData.gender} onChange={handleChange} required />
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
        <Textarea
          label="Foto (Base64)"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="Agrega la foto en formato Base64..."
        />
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
