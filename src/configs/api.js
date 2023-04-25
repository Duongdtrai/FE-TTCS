import {http} from "../utils/http";
export const BearerToken = () => {
  return `Bearer ${localStorage.getItem("accessTokenAdmin")}`;
};
export const BearerTokenUser = () => {
  return `Bearer ${localStorage.getItem("accessTokenAdmin")}`;
};
const API = {
  loginAdmin: (data) => http.post("/auth/login", data),
  logout: () => http.post("/auth/logout"),
  refreshToken: () =>http.post("/auth/refresh"),
  register: (data) =>http.post("/auth/register", data),
  getAllUser: () => http.get("/auth/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  getDetailsUser: () => http.get("/auth/detail", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  loginUser: (data) => http.post("/auth/login", data),

  /** API BOOKS */
  getAllBook: () => http.get("/book/all", {
    headers: {
      Authorization: BearerToken()
    }
  })
};
export default API;