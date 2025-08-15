import axios from "axios";
import { URLCAKE } from "../../home/data/data";

export interface StadisticsData {
    count: number;
}

export const GetStadistics = async (
    urlSpecific: string = '/responsables/viewAnalitic',
    setData: (data: StadisticsData) => void,
    showAlert: (msg: string) => void
) => {
    try {
        const response = await axios.get<StadisticsData>(`${URLCAKE}${urlSpecific}`, {
            withCredentials: true
        });
        // Ahora retorna los datos además de setearlos
        setData(response.data);
        return response.data;
    } catch (error: any) {
        showAlert(error.message || "Error al obtener los datos");
        return null;
    }
}