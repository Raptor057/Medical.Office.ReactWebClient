// Login
'use client';

import { useState } from 'react';
import { MedicalOfficeWebApi } from "./utils/HttpRequests";
import { useRouter } from 'next/navigation';
import CryptoLogin from "./components/login";

export default function Page() {
  const router = useRouter();
  const [usr, setUsr] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState({
    userLoginResponseDto: {
      user: {
        usr: "",
        name: "",
        lastname: "",
        role: "",
        position: "",
        specialtie: ""
      },
      role: "",
      token: ""
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    MedicalOfficeWebApi.Login(usr, password)
      .then((data) => {
        setLoginResponse(data); // Actualiza el estado con la respuesta de login
        alert(`Bienvenido ${data.userLoginResponseDto.user.name}`);
        router.push('/home'); // Redirige a la página de inicio
      })
      .catch((error) => {
        alert("Error en el inicio de sesión: " + error.message);
      });
  };

  const handleSubmitNewUser = (event) => {
    event.preventDefault();
    router.push('/signup'); // Redirige a la página de registro de nuevos usuarios
  };

  return (
    <div>
      <CryptoLogin
        usr={usr}
        password={password}
        setUsr={setUsr}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        handleSubmitNewUser={handleSubmitNewUser}
      />
      {/* Asegúrate de que `loginResponse` tiene los datos antes de intentar renderizar el nombre */}
      {loginResponse.userLoginResponseDto && loginResponse.userLoginResponseDto.user && loginResponse.userLoginResponseDto.user.name && (
        <div>
          <h2>Bienvenido, {loginResponse.userLoginResponseDto.user.name}</h2>
        </div>
      )}
    </div>
  );
}
