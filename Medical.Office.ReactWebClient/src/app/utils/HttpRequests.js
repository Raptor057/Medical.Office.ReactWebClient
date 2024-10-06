import getConfig from "next/config";

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
    apiUrl = 'http://localhost:5038'

return{
    //#region Post
    Login : async (usr,psswd)=>
    HttpRequest.post(`${apiUrl}/api/login`,{Usr:usr,Psswd:psswd}),

    registerusers : async (usr,psswd, name, lastname, role,position,specialtie)=>
        HttpRequest.post(`${apiUrl}/api/registerusers`,{Usr:usr,Psswd:psswd, Name:name, Lastname:lastname, Role:role,Position:position,Specialtie:specialtie}),
    //#endregion

    //#region Get
    getConfig : async ()=>
        HttpRequest.get(`${apiUrl}/api/getallconfigurations`),
    //#endregion
};
})("http://mxsrvapps.gt.local/gtt/services/bomsnapshot")

// export const EtiMovementsApi = (function (apiUrl) {
//     //apiUrl = 'http://localhost:5183';
//     //apiUrl = 'http://localhost:5072';
//     return {
//         useEti: (lineCode, etiNo) =>
//             HttpRequest.put(`${apiUrl}/api/lines/${lineCode}/etis`, { EtiInput: etiNo }),

//         returnEti: (lineCode, etiNo) =>
//             HttpRequest.delete(`${apiUrl}/api/lines/${lineCode}/etis`, { EtiInput: etiNo, IsReturn: true }),
//     };
// })("http://mxsrvapps.gt.local/gtt/services/etimovements");

// export const MaterialLoadingApi = (function (apiUrl) {
//     //apiUrl = 'http://localhost:5183';
//     return {
//         getLine: (lineCode) =>
//             HttpRequest.get(`${apiUrl}/api/lines/${lineCode}`),
//         /**
//          * Poka Yoke implemented to block the lines requested as a corrective action for 8D ACIN-2223-005.
//         2 endpoints were added in the Packaging api
//         1) set a line lock and unlock when the assembly UI scans for something wrong.
//         2) supervisor password validation.
//         */
//         getEtiPointsOfUse: async (etiNo,lineCode,partNo ) =>
//         HttpRequest.get(`${apiUrl}/api/etis/${etiNo}/pointsofuse?lineCode=${lineCode}&partNo=${partNo}`),

//         CreateSubAssemblyEti:(lineCode)=>
//         HttpRequest.post(`${apiUrl}/api/lines/${lineCode}/subassemblies`)

//     };
// })("http://mxsrvapps.gt.local/gtt/services/materialloading");

// export const CommonApi = (function (apiUrl) {
//     //apiUrl = 'http://localhost:5183';
//     return {
//         getCurrentHourProduction: async (lineCode) =>
//             HttpRequest.get(`${apiUrl}/api/lines/${lineCode}/production/hours/current`),
//     };
// })("http://mxsrvapps/gtt/services/common");

// export const ProcessHistoryApi = (function (apiUrl) {
//     //apiUrl = 'http://localhost:5183';
//     return {
//         recordProcess: async (lineCode, processNo, unitID) =>
//             HttpRequest.post(`${apiUrl}/api/units/${unitID}/lines/${lineCode}/processes/${processNo}`),
//     };
// })("http://mxsrvapps/gtt/services/processhistory");

// /**
//  * Poka Yoke implemented to block the lines requested as a corrective action for 8D ACIN-2223-005.
// 2 endpoints were added in the Packaging api
// 1) set a line lock and unlock when the assembly UI scans for something wrong.
// 2) supervisor password validation.
//  */
// export const PackagingApi = (function (apiUrl) {
//     //apiUrl = 'http://localhost:5183';
//     return {
//         getAuthorizedUserPassword : async (AuthorizedUserPassword) =>
//         HttpRequest.get(`${apiUrl}/api/Auth/${AuthorizedUserPassword}`),

//         SetStationBlocked : async (is_blocked,lineName) =>
//         HttpRequest.put(`${apiUrl}/api/StationBlocked/${is_blocked}/${lineName}`),
//         };
// })("http://mxsrvapps.gt.local/gtt/services/packaging");
// //--------------------------------------------------------------------------------
// export const EventsHistory = (function (apiUrl) {
//     //apiUrl = 'http://localhost:1117';

//     return {
//         recordHistory: async (clientmessage, lineCode) =>
//             HttpRequest.post(`${apiUrl}/api/message/${clientmessage}/lines/${lineCode}`),
//     };
// })("http://mxsrvapps/gtt/services/eventshistory");

// export const BomSnapShot = (function (apiUrl){
//     //apiUrl = 'http://localhost:5184'

// return{
//     SnapShot: async (lineCode, etiNo) =>
//     HttpRequest.put(`${apiUrl}/api/SaveSnapshot/${etiNo}/${lineCode}`),

//     GetSnapShotIDByLineCodeandPartNo: async (lineCode, partNo)=>
//     HttpRequest.get(`${apiUrl}/api/lines/getseqsnapshotid/${lineCode}/${partNo}`),
// };
// })("http://mxsrvapps.gt.local/gtt/services/bomsnapshot")
