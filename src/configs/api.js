import {http} from "../utils/http";
export const BearerToken = () => {
  return `Bearer ${localStorage.getItem("token")}`;
};

const API = {
  loginAdmin: (data) => http.post("auth/login", data),
  logout: () => http.post("auth/logout"),
  refreshToken: () =>http.post("auth/refresh"),
  register: (data) =>http.post("auth/register", data),

  loginUser: (data) => http.post("auth/login", data),
};
export default API;