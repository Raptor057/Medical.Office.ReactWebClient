'use client';

import axios from 'axios';

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


const MedicalExpressPosWebApi = (() => {
    //const apiUrl = '/api'; // Base para las rutas específicas

    return {
        //#region Gestión de Productos
        agregarProducto: async (productoData) =>
            axiosInstance.post(`/api/AgregarProducto`, productoData),

        actualizarProducto: async (productoID, productoData) =>
            axiosInstance.put(`/api/ActualizarProducto/${productoID}`, productoData),

        actualizarStock: async (productoID, stockData) =>
            axiosInstance.patch(`/api/ActualizarStock/${productoID}`, stockData),

        eliminarProducto: async (productoID) =>
            axiosInstance.delete(`/api/EliminarProducto/${productoID}`),

        obtenerProductoPorId: async (productoID) =>
            axiosInstance.get(`/api/ObtenerProductoPorId/${productoID}`),

        obtenerTodosLosProductos: async () =>
            axiosInstance.get(`/api/ObtenerTodosLosProductos`),

        obtenerProductosConBajoStock: async (limiteStock) =>
            axiosInstance.get(`/api/ObtenerProductosConBajoStock?LimiteStock=${limiteStock}`),
        //#endregion

        //#region Gestión de Ventas
        registrarVenta: async (ventaData) =>
            axiosInstance.post(`/api/RegistrarVenta`, ventaData),
    
        eliminarVenta: async (ventaID) =>
            axiosInstance.delete(`/api/EliminarVenta/${ventaID}`),
    
        obtenerVentaPorId: async (ventaID) =>
            axiosInstance.get(`/api/ObtenerVentaPorId/${ventaID}`),
    
        obtenerVentasPorRango: async (fechaInicio, fechaFin) =>
            axiosInstance.get(`/api/ObtenerVentasPorRango?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
    
        listarTodasLasVentas: async () =>
            axiosInstance.get(`/api/ListarTodasLasVentas`),
    
        obtenerVentasPorDia: async (fechaInicio, fechaFin) =>
            axiosInstance.get(`/api/ObtenerVentasPorDia?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`),
    
        actualizarVenta: async (ventaID, ventaData) =>
            axiosInstance.put(`/api/ActualizarVenta/${ventaID}`, ventaData),
        //#endregion

        //#region Gestión de Cortes de Caja
        registrarCorte: async (corteData) =>
            axiosInstance.post(`/api/RegistrarCorte`, corteData),

        eliminarCorte: async (corteID) =>
            axiosInstance.delete(`/api/EliminarCorte/${corteID}`),

        obtenerCortePorId: async (corteID) =>
            axiosInstance.get(`/api/ObtenerCortePorId/${corteID}`),

        obtenerTodosLosCortes: async () =>
            axiosInstance.get(`/api/ObtenerTodosLosCortes`),

        obtenerCortesPorRango: async (fechaInicio, fechaFin) =>
            axiosInstance.get(`/api/ObtenerCortesPorRango?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
        //#endregion

        //#region Generación de Reportes
        obtenerVentasPorDia: async (fechaInicio, fechaFin) =>
            axiosInstance.get(`/api/ObtenerVentasPorDia?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),

        obtenerDetalleDeVentas: async (ventaID) =>
            axiosInstance.get(`/api/ObtenerDetalleDeVentas/${ventaID}`),

        obtenerResumenDeCortesPorDia: async (fechaInicio, fechaFin) =>
            axiosInstance.get(`/api/ObtenerResumenDeCortesPorDia?FechaInicio=${fechaInicio}&FechaFin=${fechaFin}`),
        //#endregion
    };
})();


export default MedicalExpressPosWebApi;
