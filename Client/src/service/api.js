import axios from 'axios'; // Importa la librería Axios para hacer solicitudes HTTP.

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config'; 
// Importa constantes desde un archivo de configuración, que probablemente contienen mensajes de notificación y URLs de servicios.

import { getAccessToken, getRefreshToken, setAccessToken, getType } from '../util/common-utils'; 
// Importa funciones auxiliares para manejar tokens de autenticación y otros aspectos comunes de las solicitudes.

const API_URL = 'http://localhost:8000'; 
// Define la URL base para las solicitudes a la API.

const axiosInstance = axios.create({
    baseURL: API_URL, // Configura la URL base para todas las solicitudes.
    timeout: 10000,   // Establece un tiempo de espera de 10 segundos para las solicitudes.
    headers: {
        "content-type": "application/json" // Configura el tipo de contenido predeterminado como JSON.
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params; // Si TYPE tiene parámetros, los añade a la solicitud.
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query; // Si TYPE tiene una query, la añade a la URL.
        }
        return config; // Devuelve la configuración de la solicitud modificada.
    },
    function(error) {
        return Promise.reject(error); // Rechaza la solicitud si ocurre un error antes de enviarla.
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Aquí se detendría un cargador global, si estuviera presente.
        return processResponse(response); // Procesa la respuesta usando la función `processResponse`.
    },
    function(error) {
        // Aquí se detendría un cargador global, si estuviera presente.
        return Promise.reject(ProcessError(error)); // Procesa el error usando la función `ProcessError`.
    }
);

///////////////////////////////
// Función para procesar la respuesta HTTP
// Si tiene éxito -> retorna { isSuccess: true, data: object }
// Si falla -> retorna { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }; // Si la respuesta es 200 (éxito), devuelve los datos.
    } else {
        return {
            isFailure: true, // Si no, marca la respuesta como fallo.
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
};

///////////////////////////////
// Función para manejar errores de la solicitud
// Si tiene éxito -> retorna { isSuccess: true, data: object }
// Si falla -> retorna { isError: true, status: string, msg: string, code: int }
//////////////////////////////
const ProcessError = async (error) => {
    if (error.response) {
        // Si el servidor respondió con un código de error (fuera del rango 2xx).
        if (error.response?.status === 403) {
            // Si el código de estado es 403 (prohibido), podría intentar refrescar el token.
            sessionStorage.clear(); // Limpia la sesión (probablemente para forzar al usuario a reautenticarse).
            // El código comentado aquí probablemente trataría de obtener un nuevo token y reintentar la solicitud.
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON()); // Loguea el error.
            return {
                isError: true,
                msg: API_NOTIFICATION_MESSAGES.responseFailure, // Devuelve un mensaje de fallo genérico.
                code: error.response.status
            };
        }
    } else if (error.request) { 
        // Si la solicitud se hizo pero no se recibió respuesta.
        console.log("ERROR IN RESPONSE: ", error.toJSON()); // Loguea el error.
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure, // Devuelve un mensaje de fallo de solicitud.
            code: ""
        };
    } else { 
        // Si ocurrió un error al configurar la solicitud.
        console.log("ERROR IN RESPONSE: ", error.toJSON()); // Loguea el error.
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError, // Devuelve un mensaje de error de red.
            code: ""
        };
    }
}

const API = {}; 
// Se crea un objeto vacío que contendrá métodos para cada endpoint de la API.

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method, // Configura el método HTTP (GET, POST, etc.) de acuerdo al servicio.
            url: value.url, // Configura la URL del servicio.
            data: value.method === 'DELETE' ? '' : body, // Añade el cuerpo de la solicitud, excepto en DELETE.
            responseType: value.responseType, // Establece el tipo de respuesta (JSON, blob, etc.).
            headers: {
                authorization: getAccessToken(), // Añade el token de acceso a los encabezados.
            },
            TYPE: getType(value, body), // Configura el tipo de solicitud (parámetros o query).
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted); // Llama a la función de progreso de carga con el porcentaje completado.
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted); // Llama a la función de progreso de descarga con el porcentaje completado.
                }
            }
        });
}

export { API }; 
// Exporta el objeto API, que contiene métodos para interactuar con cada servicio definido en SERVICE_URLS.
