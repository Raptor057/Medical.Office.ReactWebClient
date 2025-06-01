'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Button,
  Input,
  Select,
  Option,
  Spinner,
  Alert
} from '@material-tailwind/react';
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
  });
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const response = await MedicalOfficeWebApi.getAllConfigurations();
        const configurations = response?.allConfigurations || {};

        setRoles(configurations.roles?.filter((role) => role.rolesName !== 'Programador') || []);
        setPositions(configurations.positions || []);
        setSpecialties(configurations.specialties || []);
      } catch (err) {
        console.error('Error al obtener las configuraciones:', err);
        setError('No se pudieron cargar las configuraciones.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchConfigurations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.registerUser(formData);
      setSuccess(true);
      setFormData({
        usr: '',
        psswd: '',
        name: '',
        lastname: '',
        role: '',
        position: '',
        specialtie: '',
      });
    } catch (err) {
      setError('Error al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
  <form onSubmit={handleRegisterUser} className="space-y-4">
        {/* <Typography variant="h4" color="blue-gray" className="mb-6 font-bold text-center">
          Registrar Usuario
        </Typography> */}

        <Card className="p-6 shadow-md">
          {loadingData ? (
            <div className="flex justify-center py-10">
              <Spinner color="blue" />
            </div>
          ) : (
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
              <Select
                label="Rol"
                value={formData.role}
                onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                required
              >
                {roles.map((role, index) => (
                  <Option key={index} value={role.rolesName}>
                    {role.rolesName}
                  </Option>
                ))}
              </Select>
              <Select
                label="Puesto"
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
              <Select
                label="Especialidad"
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
              <Button type="submit" color="blue" disabled={loading} fullWidth>
                {loading ? 'Guardando...' : 'Registrar Usuario'}
              </Button>
            </form>
          )}
          {success && <Alert color="green" className="mt-4">¡Usuario registrado con éxito!</Alert>}
          {error && <Alert color="red" className="mt-4">{error}</Alert>}
        </Card>
      </form>
    </div>
  );
}