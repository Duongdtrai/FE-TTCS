import { createSlice } from "@reduxjs/toolkit";
import {STORAGE} from "../../configs";

export const initialState ={
  userId: 0,
  user: {},
  token: localStorage.getItem(STORAGE.token) || "",
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
      localStorage.setItem(STORAGE.token, action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.is_loading = false;
    },
    logout: (state) => {
      localStorage.clear();
      state.userId = 0;
      state.user = {};
      state.token = "";
      state.is_loading = false;
    },
  }
});


export default Slice.reducer;