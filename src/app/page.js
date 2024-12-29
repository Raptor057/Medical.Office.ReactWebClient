'use client';

import { useState } from 'react';
import MedicalOfficeWebApi from '@/app/utils/HttpRequests';
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
      // Llamada a la API
      const data = await MedicalOfficeWebApi.login(usr, password);

      // Manejo del token y redirección
      const token = data?.userLoginResponseDto?.token;
      if (token) {
        localStorage.setItem('authToken', token);
        setAlertData({ isSuccess: true, message: data?.userLoginResponseDto.welcomeMessageIsSuccess});
        setTimeout(() => {
          setAlertData(null);
          router.push('/home'); // Redirige al home después del éxito
        }, 2000);
      } else {
        throw new Error('No se pudo obtener el token de autenticación.');
      }
    } catch (error) {
      // Manejo de errores
      setAlertData({
        isSuccess: false,
        message: error || 'Error inesperado al iniciar sesión.',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <h2 className="text-3xl font-bold text-white mb-4">
        Bienvenido de nuevo
      </h2>
      <p className="text-sm text-white mb-8">
        Por favor, ingresa tus credenciales para continuar.
      </p>

      {/* Componente de login */}
      <CryptoLogin
        usr={usr}
        password={password}
        setUsr={setUsr}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />

      {/* Componente de alerta para mensajes de éxito/error */}
      {alertData && (
        <div className="fixed bottom-4 left-4 right-4 flex justify-center">
          <Alert
            isSuccess={alertData.isSuccess}
            message={alertData.message}
            onClose={() => setAlertData(null)}
          />
        </div>
      )}

      <footer className="absolute bottom-4 text-sm text-gray-200">
        &copy; {new Date().getFullYear()} Medical Office. Todos los derechos reservados.
      </footer>
    </div>
  );
}
