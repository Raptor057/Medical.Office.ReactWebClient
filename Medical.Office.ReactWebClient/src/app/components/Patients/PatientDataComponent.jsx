// // src/app/components/Patients/PatientDataComponent.jsx

// import React, { useEffect } from 'react';
// import { fetchAllPatientData } from '../../utils/PatientDataFetcher'; // Ajusta la ruta según tu estructura de carpetas

// const PatientDataComponent = () => {
//     useEffect(() => {
//         fetchAllPatientData()
//             .then((data) => {
//                 console.log("All patient data:", data);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     }, []);

//     return <div>Fetching patient data...</div>;
// };

// export default PatientDataComponent;
// src/app/components/Patients/PatientDataComponent.jsx

import React, { useEffect, useState } from 'react';
import { fetchAllPatientData } from '../../utils/PatientDataFetcher'; // Ajusta la ruta según tu estructura de carpetas

const PatientDataComponent = () => {
    // Estado para almacenar los datos
    const [patientData, setPatientData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Llamada a la API
        fetchAllPatientData()
            .then((data) => {
                setPatientData(data); // Guarda los datos en el estado
            })
            .catch((err) => {
                setError('Error fetching patient data: ' + err.message); // Manejo de errores
            });
    }, []);

    if (error) {
        return <div>{error}</div>; // Mostrar el error si ocurre
    }

    if (!patientData) {
        return <div>Loading patient data...</div>; // Mostrar mensaje mientras los datos están siendo cargados
    }

    return (
        <div>
            <h1>Patient Data</h1>
            <pre>{JSON.stringify(patientData, null, 2)}</pre> {/* Mostrar los datos como JSON */}
        </div>
    );
};

export default PatientDataComponent;
