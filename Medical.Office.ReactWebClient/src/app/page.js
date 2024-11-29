'use client';

import { useState } from 'react';
import { MedicalOfficeWebApi } from "./utils/HttpRequests";
import { useRouter } from 'next/navigation';
import CryptoLogin from '@/app/components/login';
import Alert from '@/app/components/Alerts'; // Asegúrate de importar el componente Alert

export default function LoginPage() {
  const router = useRouter();
  const [usr, setUsr] = useState('');
  const [password, setPassword] = useState('');
  const [alertData, setAlertData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await MedicalOfficeWebApi.Login(usr, password);
      setAlertData({ isSuccess: true, message: "" });
      setTimeout(() => setAlertData(null), 3000);
      router.push('/home');
    } catch (error) {
      setAlertData({ isSuccess: false, message: error.message || "Error inesperado al iniciar sesión." });
    }
  };

  const handleSubmitNewUser = () => {
    router.push('/signup'); // Redirige a la página de registro de nuevos usuarios
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <CryptoLogin
          usr={usr}
          password={password}
          setUsr={setUsr}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          handleSubmitNewUser={handleSubmitNewUser}
        />
      </div>

      {/* Componente de alerta para mensajes de éxito/error */}
      {alertData && (
    <Alert
      isSuccess={alertData.isSuccess}
      message={alertData.message}
      onClose={() => setAlertData(null)}
    />
  )}
    </div>
  );
}
