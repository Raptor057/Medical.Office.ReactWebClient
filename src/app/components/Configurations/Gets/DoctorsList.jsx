'use client';

import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardBody,
  Input,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MedicalOfficeWebApi from "@/app/utils/HttpRequests"; // Ruta correcta para la API

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]); // Lista de doctores
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Doctor seleccionado para actualizar
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    phoneNumber: "",
    email: "",
  }); // Datos del formulario de actualización
  const [specialties, setSpecialties] = useState([]); // Especialidades
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores
  const [success, setSuccess] = useState(false); // Estado de éxito
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Obtener la lista de doctores y especialidades
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const doctorsData = await MedicalOfficeWebApi.getDoctors(0); // Obtener doctores
        setDoctors(doctorsData?.doctors || []);

        const configData = await MedicalOfficeWebApi.getAllConfigurations(); // Obtener especialidades
        const specialtiesData = configData.allConfigurations?.specialties || [];
        setSpecialties(specialtiesData);
      } catch (err) {
        setError(err?.message || "Error desconocido al cargar los datos."); // Capturar mensaje legible
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar campo de teléfono
    if (name === "phoneNumber") {
      const phoneRegex = /^[0-9+]*$/; // Solo números y símbolo '+'
      if (!phoneRegex.test(value)) return; // Ignorar entrada no válida
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSpecialtyChange = (value) => {
    setFormData({
      ...formData,
      specialty: value,
    });
  };

  // Manejo de la selección de un doctor para actualizar
  const handleUpdateClick = (doctor) => {
    setSelectedDoctor(doctor.id); // Guardar el ID del doctor seleccionado
    setFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      specialty: doctor.specialty,
      phoneNumber: doctor.phoneNumber,
      email: doctor.email,
    }); // Prellenar el formulario
    setSuccess(false);
    setError(null);
    setIsModalOpen(true); // Abrir el modal
  };

  // Manejo del envío del formulario de actualización
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateDoctor(selectedDoctor, formData); // Actualizar doctor
      setSuccess(true);

      // Actualizar la lista localmente
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor.id === selectedDoctor ? { ...doctor, ...formData } : doctor
        )
      );

      setIsModalOpen(false); // Cerrar el modal
    } catch (err) {
      setError(err?.message || "Error desconocido al actualizar el doctor."); // Capturar mensaje legible
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Lista de Doctores
      </Typography>

      {/* Mensajes de carga o error */}
      {loading && <Typography color="blue-gray">Cargando doctores...</Typography>}
      {error && (
        <Typography color="red">
          {typeof error === "string" ? error : "Ocurrió un error inesperado."}
        </Typography>
      )}

      {/* Lista de doctores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="shadow-md">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="font-bold break-words">
                {doctor.firstName} {doctor.lastName}
              </Typography>
              <Typography color="gray" className="break-words">
                <strong>Especialidad:</strong> {doctor.specialty}
              </Typography>
              <Typography color="gray" className="break-words">
                <strong>Teléfono:</strong> {doctor.phoneNumber}
              </Typography>
              <Typography color="gray" className="break-words">
                <strong>Email:</strong> {doctor.email}
              </Typography>
              <Button
                color="blue"
                onClick={() => handleUpdateClick(doctor)}
                className="mt-4"
              >
                Actualizar
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal de actualización */}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            Actualizar Doctor
          </Typography>
        </DialogHeader>
        <DialogBody>
          <form className="space-y-4">
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
              onChange={handleChange}
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
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => setIsModalOpen(false)}
            className="mr-2"
          >
            Cancelar
          </Button>
          <Button
            color="green"
            onClick={handleUpdateSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
