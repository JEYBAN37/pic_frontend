
import axios from 'axios';
import { URLCAKE, type LoginFormInputs } from '../components/FormLogin';


export const SendCacketoServer = async (
    data: LoginFormInputs,
    navigate: any,
    urlSpecific: string,
    mensaje : string | null,
    showAlert: (msg: string) => void
) => {
    try {
        const response = await axios.post(`${URLCAKE}${urlSpecific}`, data, {
            withCredentials: true
        });
        if (response.data.status === 'success') {
            localStorage.setItem('infoUser', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } else {
            showAlert(response.data.message || "Error al iniciar sesión");
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401) {
                showAlert(mensaje || "Credenciales incorrectas");
            } else if (error.response.status === 403) {
                showAlert("Acceso denegado");
            } else if (error.response.status === 500) {
                showAlert("Error interno del servidor");
            } else {
                showAlert("Error: " + (error.response.data.message ));
            }
        } else if (error.request) {
            showAlert("No se recibió respuesta del servidor");
        } else {
            showAlert("Error al enviar la solicitud: " + error.message);
        }
    }
};