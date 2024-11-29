import React, { useState, useEffect } from "react";

const PatientDataView = ({ idPatient }) => {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/PatientData/${idPatient}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPatientData(data.data.getPatientsDtoList.getPatientsDtolist || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [idPatient]);

  if (loading) return <div className="text-center">Cargando datos...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-blue-500">Detalles del Paciente</h2>
      {patientData.map((patient) => (
        <div key={patient.id} className="py-4 border-b">
          <h3 className="text-xl font-semibold text-gray-800">
            {patient.name} {patient.fathersSurname} {patient.mothersSurname}
          </h3>
          <ul className="text-gray-600">
            <li>
              <strong>ID:</strong> {patient.id}
            </li>
            <li>
              <strong>Fecha de Nacimiento:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}
            </li>
            <li>
              <strong>Género:</strong> {patient.gender}
            </li>
            <li>
              <strong>Dirección:</strong> {patient.address || "No disponible"}
            </li>
            <li>
              <strong>Ciudad:</strong> {patient.city || "No disponible"}
            </li>
            <li>
              <strong>Estado:</strong> {patient.state || "No disponible"}
            </li>
            <li>
              <strong>Teléfono:</strong> {patient.phoneNumber || "No disponible"}
            </li>
            <li>
              <strong>Email:</strong> {patient.email || "No disponible"}
            </li>
            <li>
              <strong>Contacto de Emergencia:</strong> {patient.emergencyContactName || "No disponible"}
            </li>
            <li>
              <strong>Teléfono de Emergencia:</strong> {patient.emergencyContactPhone || "No disponible"}
            </li>
            <li>
              <strong>Proveedor de Seguro:</strong> {patient.insuranceProvider || "No disponible"}
            </li>
            <li>
              <strong>Número de Póliza:</strong> {patient.policyNumber || "No disponible"}
            </li>
            <li>
              <strong>Tipo de Sangre:</strong> {patient.bloodType || "No disponible"}
            </li>
            <li>
              <strong>Notas Internas:</strong> {patient.internalNotes || "No disponible"}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientDataView;
