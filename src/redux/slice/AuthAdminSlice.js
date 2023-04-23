import { createSlice } from "@reduxjs/toolkit";
import {STORAGE} from "../../configs";

export const initialState = {
  adminId: localStorage.getItem(STORAGE.adminId) || "",
  user: {},
  token: localStorage.getItem(STORAGE.accessTokenAdmin) || "",
  is_loading: false,
  role: 0
};

const Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.adminId = action.payload.id;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.is_loading = false;
    },
    setAdminToken: (state, action) => {
      localStorage.setItem(STORAGE.accessTokenAdmin, action.payload.accessToken);
      localStorage.setItem(STORAGE.adminId, action.payload.id);
      state.adminId = action.payload.id;
      state.token = action.payload.accessToken;
      state.user = action.payload;
      state.role = action.payload.role;
      state.is_loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      localStorage.removeItem(STORAGE.accessTokenAdmin);
      localStorage.removeItem(STORAGE.adminId);
      state.adminId = 0;
      state.user = {};
      state.token = "";
      state.role = 0;
      state.is_loading = false;
    },
  }
});

export const {setAdmin, setAdminToken, logout} = Slice.actions;
export default Slice.reducer; 