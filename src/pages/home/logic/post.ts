import axios from "axios";
import type { LoginFormInputs } from "../../login/components/FormLogin";
import { URLCAKE, type FormInputs } from "../data/data";

export const cakePostRequest = async (
    data: LoginFormInputs | FormInputs,
    urlSpecific: string,
    showAlert: (msg: string) => void
) => {
    try {

        const response = await axios.post(`${URLCAKE}${urlSpecific}`, data, {
            withCredentials: true,
        });


        return {
            success: true,
            data: response.data,
        };
    } catch (error: any) {
        console.error("Error en petición:", error);

        if (error.response) {
            // 👇 aquí manejamos el JSON que devuelve tu API (409)
            const { status, message } = error.response.data;
            showAlert(message || "Error en el servidor");

            return {
                success: false,
                status: status || "error",
                message: message || "Error desconocido",
            };
        } else if (error.request) {
            showAlert("No se recibió respuesta del servidor");
            return { success: false, message: "Sin respuesta del servidor" };
        } else {
            showAlert("Error al configurar la petición");
            return { success: false, message: "Error de configuración" };
        }
    }
};
