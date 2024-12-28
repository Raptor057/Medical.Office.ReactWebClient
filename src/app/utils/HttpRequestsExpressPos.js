'use client';

import axios from 'axios';

// Obtener la baseURL desde las variables de entorno
const baseURL = process.env.NEXT_PUBLIC_API_URL;

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

const MedicalExpressPosWebApi = (() => {
    const apiUrl = '/api'; // Base para las rutas específicas
    return {
        //#region Gestión de Productos
        agregarProducto: async (productoData) =>
            HttpRequest.post(`${apiUrl}/api/AgregarProducto`, productoData),

        actualizarProducto: async (productoID, productoData) =>
            HttpRequest.put(`${apiUrl}/api/ActualizarProducto/${productoID}`, productoData),

        actualizarStock: async (productoID, stockData) =>
            HttpRequest.patch(`${apiUrl}/api/ActualizarStock/${productoID}`, stockData),

        eliminarProducto: async (productoID) =>
            HttpRequest.delete(`${apiUrl}/api/EliminarProducto/${productoID}`),

        obtenerProductoPorId: async (productoID) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerProductoPorId/${productoID}`),

        obtenerTodosLosProductos: async () =>
            HttpRequest.get(`${apiUrl}/api/ObtenerTodosLosProductos`),

        obtenerProductosConBajoStock: async (limiteStock) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerProductosConBajoStock?LimiteStock=${limiteStock}`),
        //#endregion

        //#region Gestión de Ventas
        registrarVenta: async (ventaData) =>
            HttpRequest.post(`${apiUrl}/api/RegistrarVenta`, ventaData),
    
        eliminarVenta: async (ventaID) =>
            HttpRequest.delete(`${apiUrl}/api/EliminarVenta/${ventaID}`),
    
        obtenerVentaPorId: async (ventaID) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerVentaPorId/${ventaID}`),
    
        obtenerVentasPorRango: async (fechaInicio, fechaFin) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerVentasPorRango?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
    
        listarTodasLasVentas: async () =>
            HttpRequest.get(`${apiUrl}/api/ListarTodasLasVentas`),
    
        obtenerVentasPorDia: async (fechaInicio, fechaFin) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerVentasPorDia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`),
    
        actualizarVenta: async (ventaID, ventaData) =>
            HttpRequest.put(`${apiUrl}/api/ActualizarVenta/${ventaID}`, ventaData),
        //#endregion

        //#region Gestión de Cortes de Caja
        registrarCorte: async (corteData) =>
            HttpRequest.post(`${apiUrl}/api/RegistrarCorte`, corteData),

        eliminarCorte: async (corteID) =>
            HttpRequest.delete(`${apiUrl}/api/EliminarCorte/${corteID}`),

        obtenerCortePorId: async (corteID) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerCortePorId/${corteID}`),

        obtenerTodosLosCortes: async () =>
            HttpRequest.get(`${apiUrl}/api/ObtenerTodosLosCortes`),

        obtenerCortesPorRango: async (fechaInicio, fechaFin) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerCortesPorRango?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
        //#endregion

        //#region Generación de Reportes
        obtenerVentasPorDia: async (fechaInicio, fechaFin) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerVentasPorDia?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),

        obtenerDetalleDeVentas: async (ventaID) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerDetalleDeVentas/${ventaID}`),

        obtenerResumenDeCortesPorDia: async (fechaInicio, fechaFin) =>
            HttpRequest.get(`${apiUrl}/api/ObtenerResumenDeCortesPorDia?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
        //#endregion
    };
})();


export default MedicalExpressPosWebApi;
