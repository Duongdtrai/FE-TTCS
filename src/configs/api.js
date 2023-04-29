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
  updateUser: (data) => http.post("auth/update", data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  loginUser: (data) => http.post("auth/login", data),
  uploadImageUser: (data) => http.post("auth/avatar", data, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  detailsUser: (userId) => http.get(`auth/${userId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
  changePassword: (data) => http.post("auth/changePassword", data, {
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

  /** API BORROW BOOK */
  getAllBorrowAdmin: () => http.get("borrowbook/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),

  getAllBorrowUser: () => http.get("borrowbook/get", {
    headers: {
      Authorization: BearerToken()
    }
  }),


  borrowBookUser: (data, bookId) => http.post(`borrowbook/add/${bookId}`, data, {
    headers: {
      Authorization: BearerToken()
    }
  }),

  /** API RETURN BOOK */
  getAllReturnAdmin: () => http.get("returnbook/all", {
    headers: {
      Authorization: BearerToken()
    }
  }),

  getAllReturnUser: () => http.get("returnbook/get", {
    headers: {
      Authorization: BearerToken()
    }
  }),

  returnBookUser: (borrowBookId) => http.post(`returnbook/add/${borrowBookId}`, {
    headers: {
      Authorization: BearerToken()
    }
  }),
};
export default API;