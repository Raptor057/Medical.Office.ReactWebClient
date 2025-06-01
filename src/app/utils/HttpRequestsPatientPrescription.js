'use client';

import axios from 'axios';
import { urlToUrlWithoutFlightMarker } from 'next/dist/client/components/app-router';

// Obtener la baseURL desde las variables de entorno
//const baseURL = process.env.NEXT_PUBLIC_API_URL;

const baseURL = typeof window !== 'undefined'
? window.NEXT_PUBLIC_API_URL
: process.env.NEXT_PUBLIC_API_URL;

//const baseURL = 'http://localhost:8080';

// Crear una instancia de Axios con configuración predeterminada
const axiosInstance = axios.create({
    baseURL, 
    headers: {
        "Access-Control-Expose-Headers": "Content-Length",
        "Content-Type": "application/json",
    },
});

// Interceptor para incluir el token en cada solicitud
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const isValidJWT = token.split('.').length === 3;
        if (isValidJWT) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const isExpired = payload.exp && Date.now() / 1000 > payload.exp;
            if (isExpired) {
                console.warn("El token ha expirado.");
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } else {
            console.warn("Token no válido detectado, eliminando.");
            localStorage.removeItem('authToken');
            window.location.href = '/';
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor para manejar respuestas y errores
axiosInstance.interceptors.response.use(
    (response) => {
        const result = response.data;

        // Validar si sigue la estructura de GenericViewModel<T>
        if (result && typeof result.isSuccess !== 'undefined') {
            if (result.isSuccess) {
                return result.data;
            } else {
                return Promise.reject(result.message || "Operación fallida en el servidor");
            }
        }

        return result;
    },
    async (error) => {
        const { response } = error;

        if (response) {
            const { status, data } = response;
            let message = data?.message || "Error desconocido";

            if (status === 401) {
                message = "Sesión expirada. Por favor, inicia sesión nuevamente.";
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    try {
                        const { data } = await axios.post('/auth/refresh', { refreshToken });
                        localStorage.setItem('authToken', data.newAuthToken);
                        error.config.headers.Authorization = `Bearer ${data.newAuthToken}`;
                        return axiosInstance(error.config);
                    } catch (refreshError) {
                        console.error("No se pudo refrescar el token.", refreshError);
                    }
                }
                localStorage.removeItem('authToken');
                if (!window.location.href.includes('/login')) {
                    window.location.href = '/';
                }
            } else if (status === 403) {
                message = "Acceso denegado. No tienes permisos para realizar esta acción.";
            } else if (status >= 500) {
                message = `Error en el servidor: ${message}.`;
            }

            return Promise.reject(message);
        }

        return Promise.reject(error.message || "Error de red");
    }
);

// Clase para gestionar la API
const MedicalPatientPrescription = (() => {
    //const apiUrl = '/api'; // Base para las rutas específicas
    const apiUrl = ''; // Base para las rutas específicas

    return {
        //#region PatientConsultationCharges
obtenerCargosPorConsulta: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientConsultationCharges/GetPatientConsultation/${idPatient}/${idAppointment}`),

insertarCargosPorConsulta: async (payload) =>
    axiosInstance.post(`/api/PatientConsultationCharges/InsertPatientConsultation`, payload),

actualizarCargosPorConsulta: async (payload) =>
    axiosInstance.put(`/api/PatientConsultationCharges/UpdatePatientConsultation`, payload),
//#endregion

//#region PatientDiagnostics
obtenerDiagnosticos: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientDiagnostics/GetPatientDiagnostics/${idPatient}/${idAppointment}`),

insertarDiagnostico: async (payload) =>
    axiosInstance.post(`/api/PatientDiagnostics/InsertPatientDiagnostics`, payload),

actualizarDiagnostico: async (payload) =>
    axiosInstance.put(`/api/PatientDiagnostics/UpdatePatientDiagnostics`, payload),
//#endregion

//#region PatientLaboratoryAndImagingRequests
obtenerSolicitudesLaboratorioEImagen: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientLaboratoryAndImagingRequests/GetPatientLaboratoryAndImagingRequests/${idPatient}/${idAppointment}`),

insertarSolicitudLaboratorioEImagen: async (payload) =>
    axiosInstance.post(`/api/PatientLaboratoryAndImagingRequests/InsertPatientLaboratoryAndImagingRequests`, payload),

actualizarSolicitudLaboratorioEImagen: async (payload) =>
    axiosInstance.put(`/api/PatientLaboratoryAndImagingRequests/UpdatePatientLaboratoryAndImagingRequests`, payload),
//#endregion

//#region PatientMedicalInstructions
obtenerIndicacionesMedicas: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientMedicalInstructions/GetPatientMedicalInstructions/${idPatient}/${idAppointment}`),

insertarIndicacionesMedicas: async (payload) =>
    axiosInstance.post(`/api/PatientMedicalInstructions/InsertPatientMedicalInstructions`, payload),

actualizarIndicacionesMedicas: async (payload) =>
    axiosInstance.put(`/api/PatientMedicalInstructions/UpdatePatientMedicalInstructions`, payload),
//#endregion

//#region PatientMedicalProcedures
obtenerProcedimientosMedicos: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientMedicalProcedures/GetPatientMedicalProcedures/${idPatient}/${idAppointment}`),

insertarProcedimientosMedicos: async (payload) =>
    axiosInstance.post(`/api/PatientMedicalProcedures/InsertPatientMedicalProcedures`, payload),

actualizarProcedimientosMedicos: async (payload) =>
    axiosInstance.put(`/api/PatientMedicalProcedures/UpdatePatientMedicalProcedures`, payload),
//#endregion

//#region PatientPrescription
obtenerPrescripcion: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientPrescription/GetPatientPrescription/${idPatient}/${idAppointment}`),

insertarPrescripcion: async (payload) =>
    axiosInstance.post(`/api/PatientPrescription/InsertPatientPrescription`, payload),

actualizarPrescripcion: async (payload) =>
    axiosInstance.put(`/api/PatientPrescription/UpdatePatientPrescription`, payload),
//#endregion

//#region PatientPrescriptionOfMedications
obtenerMedicamentosPrescritos: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientPrescriptionOfMedications/GetPatientPrescriptionOfMedications/${idPatient}/${idAppointment}`),

insertarMedicamentosPrescritos: async (payload) =>
    axiosInstance.post(`/api/PatientPrescriptionOfMedications/InsertPatientPrescriptionOfMedications`, payload),

actualizarMedicamentosPrescritos: async (payload) =>
    axiosInstance.put(`/api/PatientPrescriptionOfMedications/UpdatePatientPrescriptionOfMedications`, payload),
//#endregion

//#region PatientTreatmentPlan
obtenerPlanTratamiento: async (idPatient, idAppointment) =>
    axiosInstance.get(`/api/PatientTreatmentPlan/GetPatientTreatmentPlan/${idPatient}/${idAppointment}`),

insertarPlanTratamiento: async (payload) =>
    axiosInstance.post(`/api/PatientTreatmentPlan/InsertPatientTreatmentPlan`, payload),

actualizarPlanTratamiento: async (payload) =>
    axiosInstance.put(`/api/PatientTreatmentPlan/UpdatePatientTreatmentPlan`, payload),
//#endregion
    };
})();

export default MedicalPatientPrescription;