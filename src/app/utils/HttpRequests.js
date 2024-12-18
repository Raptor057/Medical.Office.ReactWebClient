'use client';

const handleRejectedResponse = async (error) => {
    console.error("HTTP Error:", error);
  
    let message = error.message || `${error.status}: ${error.statusText}`;
  
    if (error.status === 401) {
      message = "Sesión expirada. Por favor, inicia sesión nuevamente.";
      localStorage.removeItem('authToken'); // Limpia el token si es inválido
      window.location.href = '/'; // Redirige al login
    }
  
    const processJson = (json) => {
      if (json?.errors) {
        let message = json.title;
        for (let index in json.errors) {
          message += `\n- ${json.errors[index]}`;
        }
        return message;
      }
      return json.message || "Error desconocido en la respuesta de la API";
    };
  
    const processText = (text) => text || "Error desconocido en la respuesta de la API";
  
    if (typeof error.json === "function") {
      const isJSON = error.headers.get('content-type')?.includes('application/json');
      message = await (isJSON
        ? error.json().then(processJson)
        : error.text().then(processText)
      ).catch(() => `${error.status}: ${error.statusText}`);
    }
  
    return Promise.reject(message);
  };

const handleResponse = async (response) => {
    if (!response.ok) {
        throw response;
    }

    const json = await response.json();

    if (json.isSuccess) {
        return json.data; // Retorna los datos si la respuesta fue exitosa
    } else {
        throw new Error(json.message || "Error desconocido en la API");
    }
};

const getOptions = (method, data = null) => {
    const token = localStorage.getItem('authToken'); // Obtén el token del localStorage
    const headers = {
      "Access-Control-Expose-Headers": "Content-Length",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Agrega el token si existe
    };
  
    const options = { method, headers, mode: 'cors' };
    return data ? { ...options, body: JSON.stringify(data) } : options;
  };

const HttpRequest = (() => {
    const httpRequest = async (method, url, data = null) => {
        console.debug(`${method} Request to URL: ${url}`);
        return fetch(url, getOptions(method, data))
            .then(handleResponse)
            .catch(handleRejectedResponse);
    };

    return {
        get: async (url) => httpRequest('GET', url),
        post: async (url, data) => httpRequest('POST', url, data),
        put: async (url, data) => httpRequest('PUT', url, data),
        delete: async (url, data) => httpRequest('DELETE', url, data),
        patch: async (url, data) => httpRequest('PATCH', url, data),
    };
})();

const MedicalOfficeWebApi = (() => {
    //const apiUrl = "http://localhost:5038";
    const apiUrl = "http://192.168.1.101:8080";

    return {
        //#region Authentication
        login: async (usr, psswd) =>
            HttpRequest.post(`${apiUrl}/api/login`, { Usr: usr, Psswd: psswd }),
        //#endregion

        //#region Patient Data
        getPatientData: async (idPatient) =>
            HttpRequest.get(`${apiUrl}/api/PatientData/${idPatient}`),

        getPatientDataAndAntecedents: async (idPatient) =>
            HttpRequest.get(`${apiUrl}/api/GetPatientDataAndAntecedents/${idPatient}`),
        //#endregion

        //#region Insert Operations
        insertPatientData: async (patientData) =>
            HttpRequest.post(`${apiUrl}/api/insertpatient`, patientData),

        insertFamilyHistory: async (familyHistoryData) =>
            HttpRequest.post(`${apiUrl}/api/insertfamilyhistory`, familyHistoryData),

        insertMedicalAppointmentCalendar: async (appointmentData) =>
            HttpRequest.post(`${apiUrl}/api/InsertMedicalAppointmentCalendar`, appointmentData),
        //#endregion

        //#region Update Operations
        updateLaboralDays: async (id, laboralDaysData) =>
            HttpRequest.patch(`${apiUrl}/api/UpdateLaboralDays/${id}`, laboralDaysData),
        //#endregion

        //#region Get Operations
        getAllConfigurations: async () =>
            HttpRequest.get(`${apiUrl}/api/getallconfigurations`),

        getActiveMedications: async (patientId) =>
            HttpRequest.get(`${apiUrl}/api/getactivemedications/${patientId}`),

        getFamilyHistory: async (patientID) =>
            HttpRequest.get(`${apiUrl}/api/getfamilyhistory/${patientID}`),

        getMedicalHistoryNotes: async (patientID) =>
            HttpRequest.get(`${apiUrl}/api/getmedicalhistorynotes/${patientID}`),

        getNonPathologicalHistory: async (patientID) =>
            HttpRequest.get(`${apiUrl}/api/GetNonPathologicalHistory/${patientID}`),

        getPathologicalBackground: async (patientID) =>
            HttpRequest.get(`${apiUrl}/api/GetPathologicalBackground/${patientID}`),

        getPatientAllergies: async (patientID) =>
            HttpRequest.get(`${apiUrl}/api/GetPatientAllergies/${patientID}`),

        getPsychiatricHistory: async (patientId) =>
            HttpRequest.get(`${apiUrl}/api/GetPsychiatricHistory/${patientId}`),

        getUsers: async (id = 0, usr = "") =>
            HttpRequest.get(`${apiUrl}/api/UsersData?id=${id}&usr=${usr}`),
        //#endregion
    };
})();

export default MedicalOfficeWebApi;
