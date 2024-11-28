import React, { useState } from 'react';

const InsertPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    fathersSurname: '',
    mothersSurname: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    outsideNumber: '',
    insideNumber: '',
    phoneNumber: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    bloodType: '',
    photo: '',
    internalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Aquí puedes procesar los datos, por ejemplo, enviarlos a una API
  };
  return (
<form onSubmit={handleSubmit} className="max-w-2xl p-6 mx-auto space-y-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700">Registro de Paciente</h2>

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Apellido Paterno */}
      <div>
        <label htmlFor="fathersSurname" className="block text-gray-700">Apellido Paterno</label>
        <input
          type="text"
          id="fathersSurname"
          name="fathersSurname"
          value={formData.fathersSurname}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Apellido Materno */}
      <div>
        <label htmlFor="mothersSurname" className="block text-gray-700">Apellido Materno</label>
        <input
          type="text"
          id="mothersSurname"
          name="mothersSurname"
          value={formData.mothersSurname}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Fecha de Nacimiento */}
      <div>
        <label htmlFor="dateOfBirth" className="block text-gray-700">Fecha de Nacimiento</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Género */}
      <div>
        <label htmlFor="gender" className="block text-gray-700">Género</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Selecciona</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </div>

      {/* Dirección */}
      <div>
        <label htmlFor="address" className="block text-gray-700">Dirección</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* País */}
      <div>
        <label htmlFor="country" className="block text-gray-700">País</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Ciudad */}
      <div>
        <label htmlFor="city" className="block text-gray-700">Ciudad</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Estado */}
      <div>
        <label htmlFor="state" className="block text-gray-700">Estado</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Código Postal */}
      <div>
        <label htmlFor="zipCode" className="block text-gray-700">Código Postal</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Número Exterior */}
      <div>
        <label htmlFor="outsideNumber" className="block text-gray-700">Número Exterior</label>
        <input
          type="text"
          id="outsideNumber"
          name="outsideNumber"
          value={formData.outsideNumber}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Número Interior */}
      <div>
        <label htmlFor="insideNumber" className="block text-gray-700">Número Interior</label>
        <input
          type="text"
          id="insideNumber"
          name="insideNumber"
          value={formData.insideNumber}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="phoneNumber" className="block text-gray-700">Teléfono</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Correo Electrónico */}
      <div>
        <label htmlFor="email" className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      {/* Nombre del Contacto de Emergencia */}
      <div>
        <label htmlFor="emergencyContactName" className="block text-gray-700">Nombre del Contacto de Emergencia</label>
        <input
          type="text"
          id="emergencyContactName"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Teléfono del Contacto de Emergencia */}
      <div>
        <label htmlFor="emergencyContactPhone" className="block text-gray-700">Teléfono del Contacto de Emergencia</label>
        <input
          type="text"
          id="emergencyContactPhone"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Proveedor de Seguro */}
      <div>
        <label htmlFor="insuranceProvider" className="block text-gray-700">Proveedor de Seguro</label>
        <input
          type="text"
          id="insuranceProvider"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Número de Póliza */}
      <div>
        <label htmlFor="policyNumber" className="block text-gray-700">Número de Póliza</label>
        <input
          type="text"
          id="policyNumber"
          name="policyNumber"
          value={formData.policyNumber}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Tipo de Sangre */}
      <div>
        <label htmlFor="bloodType" className="block text-gray-700">Tipo de Sangre</label>
        <input
          type="text"
          id="bloodType"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Foto */}
      <div>
        <label htmlFor="photo" className="block text-gray-700">Foto</label>
        <input
          type="file"
          id="photo"
          name="photo"
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Notas Internas */}
      <div>
        <label htmlFor="internalNotes" className="block text-gray-700">Notas Internas</label>
        <textarea
          id="internalNotes"
          name="internalNotes"
          value={formData.internalNotes}
          onChange={handleChange}
          rows="4"
          className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Botón de Enviar */}
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

// Asegúrate de exportar el componente por defecto
export default InsertPatient;