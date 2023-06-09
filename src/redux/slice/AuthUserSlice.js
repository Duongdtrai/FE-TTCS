import { createSlice } from "@reduxjs/toolkit";
import { STORAGE } from "../../configs";

export const initialState = {
  userId: localStorage.getItem(STORAGE.userId) || "",
  user: {},
  accessTokenUser: localStorage.getItem(STORAGE.accessTokenUser) || "",
  is_loading: false
};

const Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload.userId;
      state.is_loading = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.is_loading = true;
    },
    setUserToken: (state, action) => {
      localStorage.setItem(STORAGE.accessTokenUser, action.payload.accessToken);
      localStorage.setItem(STORAGE.userId, action.payload.id);
      state.userId = action.payload.id;
      state.accessTokenUser = action.payload.accessToken;
      state.is_loading = true;
    },
    logout: (state) => {
      localStorage.removeItem(STORAGE.userId);
      localStorage.removeItem(STORAGE.accessTokenUser);
      state.userId = 0;
      state.user = {};
      state.accessTokenUser = "";
      state.is_loading = false;
    },
  }
});

export const { setUserId, setUser, setUserToken, logout } = Slice.actions;
export default Slice.reducer; 