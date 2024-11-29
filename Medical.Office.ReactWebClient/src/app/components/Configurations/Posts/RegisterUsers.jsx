import React, { useState } from 'react';
import { Button, Input, Select, Option } from '@material-tailwind/react';

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
        console.log('User registered successfully:', result);
      } else {
        console.error('Error registering user:', response.status);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Register Users</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          value={usr}
          onChange={(e) => setUsr(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Password"
          type="password"
          value={psswd}
          onChange={(e) => setPsswd(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="mt-2"
        />
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e)}
          className="mt-2"
        >
          <Option value="Doctor">Doctor</Option>
          <Option value="Programmer">Programmer</Option>
        </Select>
        <Input
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-2"
        />
        <Input
          label="Specialtie"
          value={specialtie}
          onChange={(e) => setSpecialtie(e.target.value)}
          className="mt-2"
        />

        <Button type="submit" className="w-full mt-4" color="teal">
          Register User
        </Button>
      </form>
    </div>
  );
};

export default RegisterUsersForm;
