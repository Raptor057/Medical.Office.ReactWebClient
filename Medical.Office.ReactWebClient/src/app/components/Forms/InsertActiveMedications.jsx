// src/app/components/Forms/InsertActiveMedications.jsx

import React, { useState } from 'react';

const InsertActiveMedications = () => {
  const [formData, setFormData] = useState({
    idPatient: 0,
    activeMedicationsData: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Hacer una solicitud POST a tu API
    try {

    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="idPatient" className="block text-gray-700">ID del Paciente</label>
        <input
          type="number"
          id="idPatient"
          name="idPatient"
          value={formData.idPatient}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="activeMedicationsData" className="block text-gray-700">Datos de Medicamentos Activos</label>
        <textarea
          id="activeMedicationsData"
          name="activeMedicationsData"
          value={formData.activeMedicationsData}
          onChange={handleChange}
          rows="4"
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default InsertActiveMedications;
