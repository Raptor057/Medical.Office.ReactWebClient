import React, { useState } from 'react';
import { Button, Input, Select, Option, Card, Typography } from '@material-tailwind/react';

const RegisterUsersForm = () => {
  // Estados para los campos del formulario
  const [usr, setUsr] = useState('');
  const [psswd, setPsswd] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [role, setRole] = useState('');
  const [position, setPosition] = useState('');
  const [specialtie, setSpecialtie] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      usr,
      psswd,
      name,
      lastname,
      role,
      position,
      specialtie,
    };

    try {
      const response = await fetch('/api/registerusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Usuario registrado con éxito:', result);
      } else {
        console.error('Error al registrar el usuario:', response.status);
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <Card shadow={true} className="max-w-lg p-6 mx-auto bg-white rounded-lg">
      <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
        Registro de Usuarios
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input: Nombre de Usuario */}
        <Input
          label="Nombre de Usuario"
          value={usr}
          onChange={(e) => setUsr(e.target.value)}
          className="mt-2"
        />

        {/* Input: Contraseña */}
        <Input
          label="Contraseña"
          type="password"
          value={psswd}
          onChange={(e) => setPsswd(e.target.value)}
          className="mt-2"
        />

        {/* Input: Nombre */}
        <Input
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2"
        />

        {/* Input: Apellido */}
        <Input
          label="Apellido"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="mt-2"
        />

        {/* Select: Rol */}
        <Select
          label="Rol"
          value={role}
          onChange={(e) => setRole(e)}
          className="mt-2"
        >
          <Option value="Doctor">Doctor</Option>
          <Option value="Programmer">Programador</Option>
        </Select>

        {/* Input: Puesto */}
        <Input
          label="Puesto"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-2"
        />

        {/* Input: Especialidad */}
        <Input
          label="Especialidad"
          value={specialtie}
          onChange={(e) => setSpecialtie(e.target.value)}
          className="mt-2"
        />

        {/* Botón de Registro */}
        <Button type="submit" color="indigo" className="w-full text-lg font-semibold">
          Registrar Usuario
        </Button>
      </form>
    </Card>
  );
};

export default RegisterUsersForm;
