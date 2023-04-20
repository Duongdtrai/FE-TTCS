import axios from "axios";
import { BearerToken } from "../configs/api";
import ENV from "../configs/env";

export const http = axios.create({
  baseURL: ENV.host,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(async config => {
  const token = BearerToken();
  config.headers.Authorization = token;
  return config;
}, error => {
  return Promise.reject(error);
});

