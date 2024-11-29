import React from "react";

export function CryptoLogin({
  usr,
  password,
  setUsr,
  setPassword,
  handleSubmit,
  handleSubmitNewUser,
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-sm text-gray-600">Ingresa tus credenciales para acceder</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-16 h-16 mt-4 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Usuario
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 mt-1 mb-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario"
              value={usr}
              onChange={(e) => setUsr(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block pb-1 text-sm font-semibold text-gray-600">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 mt-1 mb-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit" // Cambiado para que el botón dispare el evento onSubmit del formulario
            className="w-full py-2 text-sm font-semibold text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handleSubmitNewUser}
            className="text-sm text-blue-500 hover:underline focus:outline-none"
          >
            Crear nueva cuenta
          </button>
          <button
            type="button"
            className="text-sm text-gray-500 hover:underline focus:outline-none"
          >
            Recuperar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default CryptoLogin;
