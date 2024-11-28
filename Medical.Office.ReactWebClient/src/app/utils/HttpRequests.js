const handleRejectedResponse = async (error) => {
    console.error(error);
    let message = error.message || `${error.status}: ${error.statusText}`;

    const processJson = (json) => {
        console.debug("JSON error from API", json);
        if (json.hasOwnProperty('errors')) {
            let message = json.title;
            for (let index in json.errors) {
                message += `\n- ${json.errors[index]}`;
            }
            return message;
        }
        return json.message;
    };

    const processText = (text) => {
        console.debug("Text error from API", text);
        return text;
    };

    if (typeof error.json === "function") {
        let isJSON = error.headers.get('content-type').includes('application/json');
        message = await (isJSON ? error.json().then(processJson) : error.text().then(processText)).catch(async genericError => {
            console.debug("Generic error from API", genericError);
            return `${error.status}: ${error.statusText}`;
        });
    }
    return Promise.reject(message);
};

const getOptions = (method, data = null) => {
    const headers = { "Access-Control-Expose-Headers": "Content-Length", "Content-Type": "application/json" };
    const options = ({ method: method, headers: headers, mode: 'cors' });
    return data == null ? options : { ...options, body: JSON.stringify(data) }
}

const HttpRequest = (function () {
    const httpRequest = async (method, url, data = null) => {
        console.debug(method, url);
        return fetch(url, getOptions(method, data))
            .then(response => {
                console.debug(response);
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then ((json) => json.data)
            .catch (handleRejectedResponse);
    };
    return {
        get: async (url) => httpRequest('GET', url),
        put: async (url, data) => httpRequest('PUT', url, data),
        post: async (url, data) => httpRequest('POST', url, data),
        delete: async (url, data) => httpRequest('DELETE', url, data),
    };
})();

export const MedicalOfficeWebApi = (function (apiUrl){
    //apiUrl = 'http://localhost:8080/'
    apiUrl = 'http://localhost:5038'
    //apiUrl = 'https://localhost:32769'

return{
    //#region Post
    Login : async (usr,psswd)=>
    HttpRequest.post(`${apiUrl}/api/login`,{Usr:usr,Psswd:psswd}),

    registerusers : async (usr,psswd, name, lastname, role,position,specialtie)=>
        HttpRequest.post(`${apiUrl}/api/registerusers`,{Usr:usr,Psswd:psswd, Name:name, Lastname:lastname, Role:role,Position:position,Specialtie:specialtie}),

     // Nueva función para InsertActiveMedications
    insertActiveMedications: async (idPatient, activeMedicationsData) =>
        HttpRequest.post(`${apiUrl}/api/insertactivemedications`, { idPatient, activeMedicationsData }),

    insertFamilyHistory: async (idPatient, diabetes, cardiopathies, hypertension, thyroidDiseases, chronicKidneyDisease, others, othersData) =>
        HttpRequest.post(`${apiUrl}/api/insertfamilyhistory`, { idPatient, diabetes, cardiopathies, hypertension, thyroidDiseases, chronicKidneyDisease, others, othersData }),

    insertMedicalAppointmentCalendar: async (idPatient, idDoctor, appointmentDateTime, reasonForVisit, appointmentStatus, notes, typeOfAppointment) =>
        HttpRequest.post(`${apiUrl}/api/InsertMedicalAppointmentCalendar`, { idPatient, idDoctor, appointmentDateTime, reasonForVisit, appointmentStatus, notes, typeOfAppointment }),

    insertMedicalHistoryNotes: async (idPatient, medicalHistoryNotesData) =>
        HttpRequest.post(`${apiUrl}/api/InsertMedicalHistoryNotes`, { idPatient, medicalHistoryNotesData }),

    insertNonPathologicalHistory: async (idPatient, physicalActivity, smoking, alcoholism, substanceAbuse, substanceAbuseData, recentVaccination, recentVaccinationData, others, othersData) =>
        HttpRequest.post(`${apiUrl}/api/InsertNonPathologicalHistory`, {
            idPatient,
            physicalActivity,
            smoking,
            alcoholism,
            substanceAbuse,
            substanceAbuseData,
            recentVaccination,
            recentVaccinationData,
            others,
            othersData
        }),

    insertOfficeSetup: async (nameOfOffice, address) =>
        HttpRequest.post(`${apiUrl}/api/insertofficesetup`, { nameOfOffice, address }),

    insertPathologicalBackground: async (idPatient, previousHospitalization, previousSurgeries, diabetes, thyroidDiseases, hypertension, cardiopathies, trauma, cancer, tuberculosis, transfusions, respiratoryDiseases, gastrointestinalDiseases, stDs, stDsData, chronicKidneyDisease, others) =>
        HttpRequest.post(`${apiUrl}/api/InsertPathologicalBackground`, {
            idPatient,
            previousHospitalization,
            previousSurgeries,
            diabetes,
            thyroidDiseases,
            hypertension,
            cardiopathies,
            trauma,
            cancer,
            tuberculosis,
            transfusions,
            respiratoryDiseases,
            gastrointestinalDiseases,
            stDs,
            stDsData,
            chronicKidneyDisease,
            others
            }),

    insertPatientAllergies: async (idPatient, allergies) =>
        HttpRequest.post(`${apiUrl}/api/InsertPatientAllergies`, { idPatient, allergies }),

    insertPatientData: async (name, fathersSurname, mothersSurname, dateOfBirth, gender, address, country, city, state, zipCode, outsideNumber, insideNumber, phoneNumber, email, emergencyContactName, emergencyContactPhone, insuranceProvider, policyNumber, bloodType, photo, internalNotes) =>
        HttpRequest.post(`${apiUrl}/api/insertpatient`, {
            name,
            fathersSurname,
            mothersSurname,
            dateOfBirth,
            gender,
            address,
            country,
            city,
            state,
            zipCode,
            outsideNumber,
            insideNumber,
            phoneNumber,
            email,
            emergencyContactName,
            emergencyContactPhone,
            insuranceProvider,
            policyNumber,
            bloodType,
            photo,
            internalNotes
            }),

    insertPositions: async (position) =>
        HttpRequest.post(`${apiUrl}/api/insertposition/${position}`, {}),

    insertPsychiatricHistory: async (
        idPatient,
        familyHistory,
        familyHistoryData,
        affectedAreas,
        pastAndCurrentTreatments,
        familySocialSupport,
        familySocialSupportData,
        workLifeAspects,
        socialLifeAspects,
        authorityRelationship,
        impulseControl,
        frustrationManagement
    ) =>
        HttpRequest.post(`${apiUrl}/api/insertpsychiatricHistory`, {
            idPatient,
            familyHistory,
            familyHistoryData,
            affectedAreas,
            pastAndCurrentTreatments,
            familySocialSupport,
            familySocialSupportData,
            workLifeAspects,
            socialLifeAspects,
            authorityRelationship,
            impulseControl,
            frustrationManagement
        }),

    insertSpecialties: async (specialtie) =>
        HttpRequest.post(`${apiUrl}/api/insertspecialties/${specialtie}`, {}),

    registerUsers: async (usr, psswd, name, lastname, role, position, specialtie) =>
        HttpRequest.post(`${apiUrl}/api/registerusers`, { usr, psswd, name, lastname, role, position, specialtie }),

    //#endregion

    //#region Patch
    updateLaboralDays: async (id, laboral, openingTime, closingTime) =>
        HttpRequest.patch(`${apiUrl}/api/UpdateLaboralDays/${id}`, { laboral, openingTime, closingTime }),

    //#endregion

    //#region Get
    getConfig : async ()=>
        HttpRequest.get(`${apiUrl}/api/getallconfigurations`),

    // Función para obtener los medicamentos activos de un paciente
    getActiveMedications: async (patientId) =>
        HttpRequest.get(`${apiUrl}/api/getactivemedications/${patientId}`),

    // Función para obtener todas las configuraciones
    getAllConfigurations: async () =>
        HttpRequest.get(`${apiUrl}/api/getallconfigurations`),

    // Función para obtener el historial familiar de un paciente
    getFamilyHistory: async (patientID) =>
        HttpRequest.get(`${apiUrl}/api/getfamilyhistory/${patientID}`),
    // Función para obtener las notas del historial médico de un paciente

    getMedicalHistoryNotes: async (patientID) =>
        HttpRequest.get(`${apiUrl}/api/getmedicalhistorynotes/${patientID}`),

    // Función para obtener el historial no patológico de un paciente
    getNonPathologicalHistory: async (patientID) =>
        HttpRequest.get(`${apiUrl}/api/GetNonPathologicalHistory/${patientID}`),

    // Función para obtener el historial patológico de un paciente
    getPathologicalBackground: async (patientID) =>
        HttpRequest.get(`${apiUrl}/api/GetPathologicalBackground/${patientID}`),

    // Función para obtener las alergias de un paciente
    getPatientAllergies: async (patientID) =>
        HttpRequest.get(`${apiUrl}/api/GetPatientAllergies/${patientID}`),

    // Función para obtener los datos del paciente
    getPatientData: async (idPatient) =>
        HttpRequest.get(`${apiUrl}/api/PatientData/${idPatient}`),
    // Función para obtener los datos del paciente y sus antecedentes

    getPatientDataAndAntecedents: async (idPatient) =>
        HttpRequest.get(`${apiUrl}/api/GetPatientDataAndAntecedents/${idPatient}`),

    // Función para obtener el historial psiquiátrico de un paciente
    getPsychiatricHistory: async (patientId) =>
        HttpRequest.get(`${apiUrl}/api/GetPsychiatricHistory/${patientId}`),

        // Función para obtener los datos de los usuarios
    getUsers: async (id = 0, usr = '') =>
        HttpRequest.get(`${apiUrl}/api/UsersData?id=${id}&usr=${usr}`),

    //#endregion
};
})("http://192.168.1.101:8080")