'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, Input, Select, Option } from '@material-tailwind/react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    usr: '',
    psswd: '',
    name: '',
    lastname: '',
    role: '',
    position: '',
    specialtie: '',
  }); // Datos del formulario de registro
  const [roles, setRoles] = useState([]); // Lista de roles
  const [positions, setPositions] = useState([]); // Lista de puestos
  const [specialties, setSpecialties] = useState([]); // Lista de especialidades
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(false); // Estado de éxito

  // Obtener configuraciones al cargar el componente
  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const response = await MedicalOfficeWebApi.getAllConfigurations();
        const configurations = response?.allConfigurations || {};
  
        console.log("Configuraciones obtenidas:", configurations);
  
        setRoles(configurations.roles?.filter((role) => role.rolesName !== 'Programador') || []);
        setPositions(configurations.positions || []);
        setSpecialties(configurations.specialties || []);
      } catch (err) {
        console.error("Error al obtener las configuraciones:", err);
        setError("No se pudieron cargar las configuraciones.");
      }
    };
  
    fetchConfigurations();
  }, []);
  
  

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejo del registro de usuarios
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.registerUser(formData); // Llamada al API
      setSuccess(true);
      setFormData({
        usr: '',
        psswd: '',
        name: '',
        lastname: '',
        role: '',
        position: '',
        specialtie: '',
      }); // Limpia el formulario
    } catch (err) {
      setError(err?.message || 'Error al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Registrar Usuario
      </Typography>

      <Card className="p-4">
        <form onSubmit={handleRegisterUser} className="space-y-4">
          <Input label="Usuario" name="usr" value={formData.usr} onChange={handleChange} required />
          <Input
            label="Contraseña"
            name="psswd"
            type="password"
            value={formData.psswd}
            onChange={handleChange}
            required
          />
          <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
          <Input
            label="Apellido"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <div>
            <Typography variant="small" className="mb-2">
              Rol
            </Typography>
            <Select
              value={formData.role}
              onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              required
            >
{roles.length > 0 ? (
  roles.map((role, index) => (
    <Option key={index} value={role.rolesName}>
      {role.rolesName}
    </Option>
  ))
) : (
  <Typography variant="small" color="blue-gray">
    Cargando roles...
  </Typography>
)}
            </Select>
          </div>
          <div>
            <Typography variant="small" className="mb-2">
              Puesto
            </Typography>
            <Select
              value={formData.position}
              onChange={(value) => setFormData((prev) => ({ ...prev, position: value }))}
              required
            >
              {positions.map((position, index) => (
                <Option key={index} value={position.positionName}>
                  {position.positionName}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography variant="small" className="mb-2">
              Especialidad
            </Typography>
            <Select
              value={formData.specialtie}
              onChange={(value) => setFormData((prev) => ({ ...prev, specialtie: value }))}
              required
            >
              {specialties.map((specialty, index) => (
                <Option key={index} value={specialty.specialty}>
                  {specialty.specialty}
                </Option>
              ))}
            </Select>
          </div>
          <Button type="submit" color="blue" disabled={loading}>
            {loading ? 'Guardando...' : 'Registrar Usuario'}
          </Button>
        </form>
        {success && <Typography color="green">¡Usuario registrado con éxito!</Typography>}
        {error && <Typography color="red">{error}</Typography>}
      </Card>
    </div>
  );
}
  