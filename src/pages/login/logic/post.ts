
import axios from 'axios';
import { type LoginFormInputs } from '../components/FormLogin';
import { URLCAKE, type FormInputs } from '../../home/data/data';


const handleError = (
    error: any,
    mensaje: string | null,
    showAlert: (msg: string) => void
) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                showAlert(mensaje || "Credenciales incorrectas");
                break;
            case 403:
                showAlert("Acceso denegado");
                break;
            case 500:
                showAlert("Error interno del servidor");
                break;
            default:
                showAlert("Error: " + (error.response.data.message));
        }
    } else if (error.request) {
        showAlert("No se recibió respuesta del servidor");
    } else {
        showAlert("Error al enviar la solicitud: " + error.message);
    }
};

const handlePostRequest = async (
    data: LoginFormInputs | FormInputs,
    navigate: any,
    urlSpecific: string,
    showAlert: (msg: string) => void
) => {
    const response = await axios.post(`${URLCAKE}${urlSpecific}`, data, {
        withCredentials: true
    });
    
    if (response.data.status === 'success') {
        localStorage.setItem('infoUser', JSON.stringify(response.data.user));
        navigate('/homePage');
    } else {
        showAlert(response.data.message || "Error al iniciar sesión");
    }
};

const handlePutRequest = async (
    data: LoginFormInputs | FormInputs,
    urlSpecific: string,
    showAlert: (msg: string) => void
) => {
    console.log("Datos a enviar:", data);
    const response = await axios.put(`${URLCAKE}${urlSpecific}`, data, {
        withCredentials: true
    });

    if (response.data.status === 'success') {
        alert("Usuario actualizado correctamente");
        showAlert("Usuario actualizado correctamente");
    } else {
        console.error("Error al actualizar usuario:", response.data);
        alert(response.data.message || "Error al actualizar usuario");
        showAlert(response.data.message || "Error al actualizar usuario");
    }
};

export const SendCacketoServer = async (
    data: LoginFormInputs | FormInputs,
    navigate: any,
    urlSpecific: string,
    mensaje : string | null,
    showAlert: (msg: string) => void,
    typeMethod: 'POST' | 'PUT'
) => {
    try {
        if (typeMethod === 'POST') {
            await handlePostRequest(data, navigate, urlSpecific, showAlert);
        } else if (typeMethod === 'PUT') {
            await handlePutRequest(data, urlSpecific, showAlert);
        }
    } catch (error: any) {
        handleError(error, mensaje, showAlert);
    }
};