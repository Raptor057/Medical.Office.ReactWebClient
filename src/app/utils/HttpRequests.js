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
const MedicalOfficeWebApi = (() => {
    //const apiUrl = '/api'; // Base para las rutas específicas
    const apiUrl = ''; // Base para las rutas específicas

    return {
        //#region Authentication
        login: async (usr, psswd) =>
            axiosInstance.post(`/api/login`, { Usr: usr, Psswd: psswd }),
        //#endregion

        //#region Patient Data
        getPatientData: async (idPatient) =>
            axiosInstance.get(`/api/PatientData/${idPatient}`),

        getPatientDataAndAntecedents: async (idPatient) =>
            axiosInstance.get(`/api/GetPatientDataAndAntecedents/${idPatient}`),
        //#endregion

        getMedicalAppointmentCalendar: async (id, idDoctor) =>
            axiosInstance.get(`/api/GetMedicalAppointmentCalendar/${id}/${idDoctor}`),

        //#region Insert Operations

        scheduleAppointment: async (appointmentData) =>
            axiosInstance.post(`/api/InsertMedicalAppointmentCalendar`, appointmentData),

        insertPatientData: async (patientData) =>
            axiosInstance.post(`/api/insertpatient`, patientData),

        insertFamilyHistory: async (familyHistoryData) =>
            axiosInstance.post(`/api/insertfamilyhistory`, familyHistoryData),

        insertMedicalHistoryNotes: async (medicalHistoryNotesData) =>
            axiosInstance.post(`/api/InsertMedicalHistoryNotes`, medicalHistoryNotesData),

        insertActiveMedications: async (activeMedicationsData) =>
            axiosInstance.post(`/api/insertactivemedications`, activeMedicationsData),

        insertNonPathologicalHistory: async (nonPathologicalData) =>
            axiosInstance.post(`/api/InsertNonPathologicalHistory`, nonPathologicalData),

        insertPathologicalBackground: async (pathologicalData) =>
            axiosInstance.post(`/api/InsertPathologicalBackground`, pathologicalData),

        insertPatientAllergies: async (allergiesData) =>
            axiosInstance.post(`/api/InsertPatientAllergies`, allergiesData),

        insertPsychiatricHistory: async (psychiatricData) =>
            axiosInstance.post(`/api/insertpsychiatricHistory`, psychiatricData),

        uploadPatientFile: async (fileData) =>
            axiosInstance.post(`/api/UploadPatientFile`, fileData),

        insertOfficeSetup: async (officeSetupData) =>
            axiosInstance.post(`/api/insertofficesetup`, officeSetupData),

        insertMedicalAppointmentCalendar: async (appointmentData) =>
            axiosInstance.post(`/api/InsertMedicalAppointmentCalendar`, appointmentData),

        insertPosition: async (position) =>
            axiosInstance.post(`/api/insertposition/${position}`),

        insertSpecialties: async (specialty) =>
            axiosInstance.post(`/api/insertspecialties/${specialty}`),

        registerUser: async (userData) =>
            axiosInstance.post(`/api/registerusers`, userData),

        insertDoctor: async (doctorData) => // Nuevo faltante
            axiosInstance.post(`/api/InsertDoctor`, doctorData),
        //#endregion

        //#region Update Operations
        updateUser: async (id, userData) =>
            axiosInstance.patch(`/api/updateusers/${id}`, userData),

        updateActiveMedications: async (idPatient, medicationsData) =>
            axiosInstance.patch(`/api/UpdateActiveMedications/${idPatient}`, medicationsData),

        updateFamilyHistory: async (idPatient, familyHistoryData) =>
            axiosInstance.patch(`/api/UpdateFamilyHistory/${idPatient}`, familyHistoryData),

        updateMedicalHistoryNotes: async (idPatient, notesData) =>
            axiosInstance.patch(`/api/UpdateMedicalHistoryNotes/${idPatient}`, notesData),

        updateNonPathologicalHistory: async (idPatient, nonPathologicalData) =>
            axiosInstance.patch(`/api/UpdateNonPathologicalHistory/${idPatient}`, nonPathologicalData),

        updatePathologicalBackground: async (idPatient, pathologicalData) =>
            axiosInstance.patch(`/api/UpdatePathologicalBackground/${idPatient}`, pathologicalData),

        updatePatientAllergies: async (idPatient, allergiesData) =>
            axiosInstance.patch(`/api/UpdatePatientAllergies/${idPatient}`, allergiesData),

        updatePsychiatricHistory: async (idPatient, psychiatricData) =>
            axiosInstance.patch(`/api/UpdatePsychiatricHistory/${idPatient}`, psychiatricData),

        updateOfficeSetup: async (officeSetupData) =>
            axiosInstance.patch(`/api/UpdateOfficeSetup`, officeSetupData),

        updateLaboralDays: async (id, laboralDaysData) =>
            axiosInstance.patch(`/api/UpdateLaboralDays/${id}`, laboralDaysData),

        updateDoctor: async (id, doctorData) =>
            axiosInstance.patch(`/api/updateDoctor/${id}`, doctorData),
        //#endregion

        //#region Get Operations
        getPatientFiles: async (patientId,idfile) =>
            axiosInstance.get(`/api/GetPatientFile/${patientId}/${idfile}`),

        deletePatientFile: async (patientId, idFile) =>
            axiosInstance.delete(`/api/DeletePatientFile/${patientId}/${idFile}`),

        getAllConfigurations: async () =>
            axiosInstance.get(`/api/getallconfigurations`),

        getDoctors: async (id = 0) =>
            axiosInstance.get(`/api/GetDoctors/${id}`),

        getActiveMedications: async (patientId) =>
            axiosInstance.get(`/api/getactivemedications/${patientId}`),

        getFamilyHistory: async (patientID) =>
            axiosInstance.get(`/api/getfamilyhistory/${patientID}`),

        getMedicalHistoryNotes: async (patientID) =>
            axiosInstance.get(`/api/getmedicalhistorynotes/${patientID}`),

        getNonPathologicalHistory: async (patientID) =>
            axiosInstance.get(`/api/GetNonPathologicalHistory/${patientID}`),

        getPathologicalBackground: async (patientID) =>
            axiosInstance.get(`/api/GetPathologicalBackground/${patientID}`),

        getPatientAllergies: async (patientID) =>
            axiosInstance.get(`/api/GetPatientAllergies/${patientID}`),

        getPsychiatricHistory: async (patientId) =>
            axiosInstance.get(`/api/GetPsychiatricHistory/${patientId}`),

        getUsers: async (id = 0, usr = "") =>
            axiosInstance.get(`/api/UsersData`, { params: { id, usr } }),
        //#endregion

        getPatientAdvancementByIDPatient: async (idPatient)=>
            axiosInstance.get(`/api/GetPatientAdvancement/${idPatient}`),

        insertPatientAdvancement: async (patientAdvancement)=>
            axiosInstance.post(`/api/InsertPatientAdvancement`, patientAdvancement),

        updatePatientAdvancement: async (Id,patientAdvancement)=>
            axiosInstance.patch(`/api/UpdatePatientAdvancement/${Id}`,patientAdvancement)
    };
})();

export default MedicalOfficeWebApi;