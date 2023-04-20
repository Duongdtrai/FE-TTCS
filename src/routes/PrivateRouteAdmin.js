/* eslint-disable react/react-in-jsx-scope */
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import AppLayout from "../components/AppLayout";
import {ROLE} from '../utils/constant';
import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
export const PrivateRouteAdmin = ({ children, ...rest }) => {
  const authAdmin = useSelector((state) => state.authAdmin);
  const isLogin = authAdmin.token && authAdmin.adminId;
  // gọi ra và check role

  return (
    <Route
      {...rest}
      render={({location}) =>
        isLogin ? (
          <AppLayout>{children}</AppLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/admin/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

