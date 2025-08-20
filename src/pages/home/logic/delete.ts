import axios from "axios";
import { URLCAKE } from "../data/data";

export const deleteUser = async (userId: string, userName: string) => {
  try {
    const response = await axios.delete(`${URLCAKE}/users/delete/${userId}`, { withCredentials: true });
    if (response.data.status === 'success') {
      alert(`Usuario ${userName} ${response.data.message}`);
      return true;
    } else {
      alert(`Error al eliminar usuario ${userName}`);
      return false;
    }
  } catch {
    alert(`Error al eliminar usuario ${userName}`);
    return false;
  }
};

export default deleteUser;
