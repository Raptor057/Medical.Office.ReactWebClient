'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Card, Button, CardBody } from '@material-tailwind/react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';

export default function UsersList() {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MedicalOfficeWebApi.getUsers(0); // Llamada al endpoint para obtener todos los usuarios
        setUsers(response.userDtoList.userDtosList || []);
      } catch (err) {
        console.error('Error al obtener usuarios:', err);
        setError('Error al cargar la lista de usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" color="blue-gray" className="font-bold text-center">
        Lista de Usuarios
      </Typography>

      {/* Mensajes de carga o error */}
      {loading && <Typography color="blue-gray">Cargando usuarios...</Typography>}
      {error && <Typography color="red">{error}</Typography>}

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
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
                  <strong>Estado:</strong> {user.status}
                </Typography>
                <Typography color="gray">
                  <strong>Especialidad:</strong> {user.specialtie}
                </Typography>
                <Typography color="gray">
                  <strong>Creacion de usuario:</strong> {formatDate(user.timeSnap)}
                </Typography>
              </CardBody>
            </Card>
          ))
        ) : (
          <Typography color="gray" className="text-center">
            No se encontraron usuarios.
          </Typography>
        )}
      </div>
    </div>
  );
}
