'use client';

import RegistrarCorte from '@/app/components/ExpressPos/GestiondeCortesdeCaja/verificarCorteDelDia';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Gestión de Cortes
        </h1>
        <RegistrarCorte />
      </div>
    </div>
  );
}
