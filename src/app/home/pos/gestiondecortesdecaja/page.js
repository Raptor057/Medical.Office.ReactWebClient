'use client';

import RegistrarCorte from '@/app/components/ExpressPos/GestiondeCortesdeCaja/verificarCorteDelDia';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
          Gestión de Cortes
        </h1>
        <RegistrarCorte />
      </div>
    </div>
  );
}
