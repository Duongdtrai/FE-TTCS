import axios from "axios";
import { BearerToken } from "../configs/api";
import ENV from "../configs/env";

export const http = axios.create({
  baseURL: ENV.host,
  timeout: 30000,
});