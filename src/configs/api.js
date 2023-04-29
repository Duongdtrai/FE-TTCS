import { http } from "../utils/http";
export const BearerToken = () => {
  return `Bearer ${localStorage.getItem("accessTokenAdmin")}`;
};
export const BearerTokenUser = () => {
  return `Bearer ${localStorage.getItem("accessTokenAdmin")}`;
};
const API = {
  loginAdmin: (data) => http.post("auth/login", data),
  logout: () => http.post("auth/logout"),
  refreshToken: () => http.post("auth/refresh"),
  register: (data) => http.post("auth/register", data),
  getAllUser: () => http.get("auth/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  getDetailsUser: () => http.get("auth/detail", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  loginUser: (data) => http.post("auth/login", data),
  uploadImageUser: (data) => http.post("auth/avatar", data),
  detailsUser: (userId) => http.get(`auth/${userId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  /** API BOOKS */
  getAllBook: () => http.get("book/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  getDetailBook: (bookId) => http.get(`book/${bookId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  addImageBook: (bookId, data) => http.post(`book/avatar/${bookId}`, data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  getImageBook: (avatarBook) => http.get(`file/${avatarBook}`),
  createNewBook: (bookId, data) => http.post(`book/add/${bookId}`, data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  deleteBook: (bookId) => http.post(`book/delete/${bookId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),

  /** API AUTHOR */
  getAllAuthor: () => http.get("author/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),
  getDetailAuthor: (authorId) => http.get(`author/${authorId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  createNewAuthor: (data) => http.post("author/add", data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  updateAuthor: (authorId, data) => http.post(`author/update/${authorId}`, data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  deleteAuthor: (authorId) => http.post(`author/delete/${authorId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  uploadAvatarAuthor: (authorId, data) => http.post(`author/avatar/${authorId}`, data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
};
export default API;