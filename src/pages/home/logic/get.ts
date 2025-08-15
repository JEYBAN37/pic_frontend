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
