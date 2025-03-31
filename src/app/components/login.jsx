import React from 'react';
import { motion } from 'framer-motion';

export function CryptoLogin({ usr, password, setUsr, setPassword, handleSubmit }) {
  return (
    <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-900 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-16 h-16 mx-auto text-indigo-500"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </motion.svg>
        <h2 className="mt-10 text-2xl font-bold text-center text-white">Inicia sesión en tu cuenta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">Usuario</label>
            <div className="mt-2">
              <input
                type="text"
                required
                className="block w-full px-3 py-2 text-white placeholder-gray-500 rounded-md bg-white/5 focus:outline-indigo-500 sm:text-sm"
                placeholder="Ingresa tu usuario"
                value={usr}
                onChange={(e) => setUsr(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-white">Contraseña</label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                required
                className="block w-full px-3 py-2 text-white placeholder-gray-500 rounded-md bg-white/5 focus:outline-indigo-500 sm:text-sm"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-400 focus:outline-indigo-500"
            >
              Iniciar Sesión
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CryptoLogin;
