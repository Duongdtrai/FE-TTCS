import {configureStore} from "@reduxjs/toolkit";
import AuthAdminSlice from "./slice/AuthAdminSlice";
import AuthUserSlice from "./slice/AuthUserSlice";

export const store = configureStore({
  reducer: {
    authAdmin: AuthAdminSlice,
    authUser: AuthUserSlice
  },
});

