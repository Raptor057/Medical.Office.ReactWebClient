// utils/PatientDataFetcher.js
import { MedicalOfficeWebApi } from "./HttpRequests";

export const fetchAllPatientData = async () => {
    const IDPatient = 1; // El ID del paciente que usaremos en todas las solicitudes

    try {
        // Hacemos las solicitudes a los diferentes endpoints
        const activeMedications = await MedicalOfficeWebApi.getActiveMedications(IDPatient);
        console.log('Active Medications:', activeMedications);

        const medicalHistoryNotes = await MedicalOfficeWebApi.getMedicalHistoryNotes(IDPatient);
        console.log('Medical History Notes:', medicalHistoryNotes);

        const familyHistory = await MedicalOfficeWebApi.getFamilyHistory(IDPatient);
        console.log('Family History:', familyHistory);

        const nonPathologicalHistory = await MedicalOfficeWebApi.getNonPathologicalHistory(IDPatient);
        console.log('Non-Pathological History:', nonPathologicalHistory);

        const pathologicalBackground = await MedicalOfficeWebApi.getPathologicalBackground(IDPatient);
        console.log('Pathological Background:', pathologicalBackground);

        const patientAllergies = await MedicalOfficeWebApi.getPatientAllergies(IDPatient);
        console.log('Patient Allergies:', patientAllergies);

        const patientData = await MedicalOfficeWebApi.getPatientData(IDPatient);
        console.log('Patient Data:', patientData);

        const patientDataAndAntecedents = await MedicalOfficeWebApi.getPatientDataAndAntecedents(IDPatient);
        console.log('Patient Data and Antecedents:', patientDataAndAntecedents);

        const psychiatricHistory = await MedicalOfficeWebApi.getPsychiatricHistory(IDPatient);
        console.log('Psychiatric History:', psychiatricHistory);

        // Puedes devolver o procesar los datos como sea necesario
        return {
            activeMedications,
            medicalHistoryNotes,
            familyHistory,
            nonPathologicalHistory,
            pathologicalBackground,
            patientAllergies,
            patientData,
            patientDataAndAntecedents,
            psychiatricHistory
        };

    } catch (error) {
        console.error('Error fetching patient data:', error);
        alert('Error al obtener los datos del paciente: ' + error.message);
    }
};
