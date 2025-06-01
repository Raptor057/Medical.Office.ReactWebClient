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
  Spinner,
  Alert
} from '@material-tailwind/react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [positions, setPositions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    psswd: '',
    name: '',
    lastname: '',
    role: '',
    position: '',
    specialtie: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsersAndConfigurations = async () => {
      try {
        const usersResponse = await MedicalOfficeWebApi.getUsers(0);
        setUsers(usersResponse.userDtoList.userDtosList || []);

        const configResponse = await MedicalOfficeWebApi.getAllConfigurations();
        const configurations = configResponse?.allConfigurations || {};
        setStatuses(configurations.userStatues || []);
        setRoles(configurations.roles || []);
        setPositions(configurations.positions || []);
        setSpecialties(configurations.specialties || []);
      } catch (err) {
        console.error('Error al obtener usuarios o configuraciones:', err);
        setError('No se pudieron cargar los datos.');
      } finally {
        setLoadingData(false);
      }
    };

    fetchUsersAndConfigurations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await MedicalOfficeWebApi.updateUser(selectedUser.id, formData);
      setSuccess(true);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      setIsModalOpen(false);
    } catch (err) {
      setError('Error al actualizar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {loadingData ? (
        <div className="flex justify-center py-10">
          <Spinner color="blue" />
        </div>
      ) : (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow"
            >
              <div className="flex flex-col flex-1 p-6">
                <img
                  className="flex-shrink-0 w-24 h-24 mx-auto bg-gray-100 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${user.name}+${user.lastname}`}
                  alt="avatar"
                />
                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {user.name} {user.lastname}
                </h3>
                <dl className="flex-grow mt-1">
                  <dd className="text-sm text-gray-500">{user.position}</dd>
                  <dd className="text-sm text-gray-500">Especialidad: {user.specialtie}</dd>
                  <dd className="text-sm text-gray-500">Rol: {user.role}</dd>
                  <dd className="text-sm text-gray-500">Estado: {user.status}</dd>
                </dl>
              </div>
              <div>
                <div className="flex -mt-px divide-x divide-gray-200">
                  <div className="flex flex-1 w-0">
                    <Button
                      onClick={() => handleUpdateClick(user)}
                      className="w-full text-sm rounded-none rounded-bl-lg"
                      color="blue"
                    >
                      Editar Usuario
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={isModalOpen} handler={setIsModalOpen} size="lg">
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            Actualizar Usuario
          </Typography>
        </DialogHeader>
        <DialogBody>
          <form className="space-y-4">
            <Input label="Nombre" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Apellido" name="lastname" value={formData.lastname} onChange={handleChange} required />
            <Input label="Contraseña" name="psswd" type="password" value={formData.psswd} onChange={handleChange} />
            <Select label="Estado" value={formData.status} onChange={(value) => setFormData((prev) => ({ ...prev, status: value }))} required>
              {statuses.map((status, index) => (
                <Option key={index} value={status.typeUserStatuses}>{status.typeUserStatuses}</Option>
              ))}
            </Select>
            <Select label="Rol" value={formData.role} onChange={(value) => setFormData((prev) => ({ ...prev, role: value }))} required>
              {roles.map((role, index) => (
                <Option key={index} value={role.rolesName}>{role.rolesName}</Option>
              ))}
            </Select>
            <Select label="Puesto" value={formData.position} onChange={(value) => setFormData((prev) => ({ ...prev, position: value }))} required>
              {positions.map((position, index) => (
                <Option key={index} value={position.positionName}>{position.positionName}</Option>
              ))}
            </Select>
            <Select label="Especialidad" value={formData.specialtie} onChange={(value) => setFormData((prev) => ({ ...prev, specialtie: value }))} required>
              {specialties.map((specialty, index) => (
                <Option key={index} value={specialty.specialty}>{specialty.specialty}</Option>
              ))}
            </Select>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button color="red" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
          <Button color="blue" onClick={handleUpdateUser} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </Dialog>

      {success && <Alert color="green">¡Usuario actualizado con éxito!</Alert>}
      {error && <Alert color="red">{error}</Alert>}
    </div>
  );
}
