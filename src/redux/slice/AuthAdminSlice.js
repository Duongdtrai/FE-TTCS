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
    setAdminId: (state, action) => {
      state.adminId = action.payload.id;
      state.is_loading = false;
    },
    setAdmin: (state, action) => {
      state.user = action.payload.user;
      state.is_loading = false;
    },
    setAdminToken: (state, action) => {
      localStorage.setItem(STORAGE.accessTokenAdmin, action.payload.accessToken);
      localStorage.setItem("adminId", action.payload.id);
      state.adminId = action.payload.id;
      state.token = action.payload.accessToken;
      state.user = action.payload;
      state.role = action.payload.role;
      state.is_loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.adminId = 0;
      state.user = {};
      state.token = "";
      state.role = 0;
      state.is_loading = false;
    },
  }
});

export const {setAdminId, setAdmin, setAdminToken, logout} = Slice.actions;
export default Slice.reducer; 