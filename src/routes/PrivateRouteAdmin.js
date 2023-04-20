/* eslint-disable react/react-in-jsx-scope */
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import AppLayout from "../components/AppLayout";

// eslint-disable-next-line react/prop-types
export const PrivateRouteAdmin = ({ children, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  let isLogin = auth.token && auth.user;
  isLogin = true;
  return (
    <Route
      {...rest}
      render={({location}) =>
        isLogin ? (
          <AppLayout>{children}</AppLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

