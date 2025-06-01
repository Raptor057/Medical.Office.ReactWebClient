'use client';
import React, { useState, useEffect } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests";

export default function InsertDoctorsForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    phoneNumber: "",
    email: "",
  });

  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.insertDoctor(formData);
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", specialty: "", phoneNumber: "", email: "" });
    } catch (err) {
      setError("Error al registrar al doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-6 space-y-6 bg-white border border-gray-200 shadow-md rounded-xl"
    >
      <div className="text-center">
        <Typography variant="h4" color="blue-gray" className="font-bold">
          Registrar Doctor
        </Typography>
        <Typography color="gray" className="mt-1 text-sm">
          Completa la información para registrar a un nuevo doctor.
        </Typography>
      </div>

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

      {/* Select personalizado con Chevron */}
      <div>
        <label htmlFor="specialty" className="block mb-1 text-sm font-medium text-gray-900">
          Especialidad
        </label>
        <div className="relative">
          <select
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            className="block w-full py-2 pl-3 pr-10 text-base text-gray-900 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Selecciona una especialidad</option>
            {specialties.map((s, index) => (
              <option key={index} value={s.specialty}>
                {s.specialty}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-1/2"
            aria-hidden="true"
          />
        </div>
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

      <div className="flex justify-end">
        <Button type="submit" color="blue" disabled={loading}>
          {loading ? "Enviando..." : "Registrar Doctor"}
        </Button>
      </div>

      {/* Mensajes */}
      {success && (
        <Typography color="green" className="text-center">
          ¡Doctor registrado con éxito!
        </Typography>
      )}
      {error && (
        <Typography color="red" className="text-center">
          {error}
        </Typography>
      )}
    </form>
  );
}
