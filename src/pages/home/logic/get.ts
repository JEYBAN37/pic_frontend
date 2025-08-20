import axios from "axios";
import { URLCAKE } from "../data/data";

export const getVerifyUser = async () => {
  return axios
    .get(`${URLCAKE}/users/check`, { withCredentials: true })
    .then((res) => {
      if (res.data.authenticated) {
        const userInfo = localStorage.getItem("infoUser");
        return JSON.parse(userInfo || "{}");
      } else {
        window.location.href = `${URLCAKE}/users/logout`;
      }
    });
};

export const getUserTypes = async () => {
  return axios
    .get(`${URLCAKE}/users/adminStadistics`, { withCredentials: true })
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        window.location.href = `${URLCAKE}/users/logout`;
      }
    });
};

export const getUserList = async (
  searchText: string,
  selectedRole: string,
  page: number
) => {
  return axios.post(
    `${URLCAKE}/users/usersList`,
    JSON.stringify({
      search: searchText,
      group_id: selectedRole,
      page: page,
    }),
    { withCredentials: true }
  );
};

export const getOneUser = async (id: string , reset: (data: any) => void, showAlert: (message: string) => void) => {
  try {
    const response = await axios.get(`${URLCAKE}/users/getOne/${id}`, {
      withCredentials: true,
    });

    if (response.data?.user) {
      reset(response.data.user); // ✅ SOLO aquí reseteas
    } else {
      showAlert("No se encontraron datos del usuario");
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    showAlert("Error al obtener datos del usuario");
  }
};
