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
      state.is_loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.is_loading = false;
    },
    setUserToken: (state, action) => {
      localStorage.setItem(STORAGE.accessTokenUser, action.payload.accessToken);
      localStorage.setItem(STORAGE.userId, action.payload.id);
      state.userId = action.payload.id;
      state.accessTokenUser = action.payload.accessToken;
      state.is_loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.userId = 0;
      state.user = {};
      state.accessTokenUser = "";
      state.is_loading = false;
    },
  }
});

export const { setUserId, setUser, setUserToken, logout } = Slice.actions;
export default Slice.reducer; 