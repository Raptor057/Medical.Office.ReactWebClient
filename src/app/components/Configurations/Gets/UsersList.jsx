'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  CardBody,
  Button,
  Input,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';

export default function UsersList() {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [statuses, setStatuses] = useState([]); // Lista de estados
  const [roles, setRoles] = useState([]); // Lista de roles
  const [positions, setPositions] = useState([]); // Lista de puestos
  const [specialties, setSpecialties] = useState([]); // Lista de especialidades
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado
  const [formData, setFormData] = useState({
    psswd: '',
    name: '',
    lastname: '',
    role: '',
    position: '',
    specialtie: '',
    status: '',
  });
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [success, setSuccess] = useState(false); // Estado de éxito
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Obtener la lista de usuarios, estados, roles, puestos y especialidades
  useEffect(() => {
    const fetchUsersAndConfigurations = async () => {
      try {
        const usersResponse = await MedicalOfficeWebApi.getUsers(0); // Obtener usuarios
        setUsers(usersResponse.userDtoList.userDtosList || []);

        const configResponse = await MedicalOfficeWebApi.getAllConfigurations(); // Obtener configuraciones
        const configurations = configResponse?.allConfigurations || {};
        setStatuses(configurations.userStatues || []);
        setRoles(configurations.roles || []);
        setPositions(configurations.positions || []);
        setSpecialties(configurations.specialties || []);
      } catch (err) {
        console.error('Error al obtener usuarios o configuraciones:', err);
      }
    };

    fetchUsersAndConfigurations();
  }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo de la selección de un usuario para editar
  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setFormData({
      psswd: '',
      name: user.name,
      lastname: user.lastname,
      role: user.role,
      position: user.position,
      specialtie: user.specialtie,
      status: user.status,
    });
    setError(null);
    setSuccess(false);
    setIsModalOpen(true);
  };

  // Manejo del envío del formulario de actualización
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateUser(selectedUser.id, formData); // Llamada al API
      setSuccess(true);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Lista de Usuarios
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="shadow-md">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="font-bold">
                {user.name} {user.lastname}
              </Typography>
              <Typography color="gray">
                <strong>Usuario:</strong> {user.usr}
              </Typography>
              <Typography color="gray">
                <strong>Rol:</strong> {user.role}
              </Typography>
              <Typography color="gray">
                <strong>Puesto:</strong> {user.position}
              </Typography>
              <Typography color="gray">
                <strong>Especialidad:</strong> {user.specialtie}
              </Typography>
              <Typography color="gray">
                <strong>Estado:</strong> {user.status}
              </Typography>
              <Button
                color="blue"
                onClick={() => handleUpdateClick(user)}
                className="mt-4"
              >
                Editar Usuario
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal de actualización */}
      <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            Actualizar Usuario
          </Typography>
        </DialogHeader>
        <DialogBody>
          <form className="space-y-4">
            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              name="psswd"
              type="password"
              value={formData.psswd}
              onChange={handleChange}
            />
            <div>
              <Typography variant="small" className="mb-2">
                Estado
              </Typography>
              <Select
                value={formData.status}
                onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                required
              >
                {statuses.map((status, index) => (
                  <Option key={index} value={status.typeUserStatuses}>
                    {status.typeUserStatuses}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Typography variant="small" className="mb-2">
                Rol
              </Typography>
              <Select
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
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button color="blue" onClick={handleUpdateUser} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </Dialog>

      {success && <Typography color="green">¡Usuario actualizado con éxito!</Typography>}
      {error && <Typography color="red">{error}</Typography>}
    </div>
  );
}
