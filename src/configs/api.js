import {http} from "../utils/http";
export const BearerToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

export default api = {
  
};