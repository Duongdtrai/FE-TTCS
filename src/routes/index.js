import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import { PrivateRouteUser } from "./PrivateRouteUser";
import AppLayoutUser from "../components/AppLayoutUser";
import {
  /**Admin */
  LoginAdmin,
  Error404,
  ListManager,
  CreateManager,
  EditManager,
  DashBoard,
  ListBook,
  EditBook,
  CreateBook,
  ListStore,
  CreateStore,
  EditStore,

  /**User */
  LoginPage,
  HomePage,
  RegisterPage,
  AuthorPage,
  CartPage,
  ChangePasswordPage,
  ProfilePage,
  ListCart,
  EditCart,

} from "../pages";

const RoutesProvider = () => {
  /**
   * @Role {user}
   */
  const PrivateUserPages = [
    {
      path: "/login",
      component: <LoginPage />,
    },
    {
      path: "/register",
      component: <RegisterPage />,
    },
    {
      path: "/author",
      component: <AuthorPage />,
    }, {
      path: "/cart",
      component: <CartPage />,
    }, {
      path: "/change-password",
      component: <ChangePasswordPage />,
    }, {
      path: "/profile",
      component: <ProfilePage />,
    }
  ];


  /**
   * @Role {admin}
   */
  const PrivateAdminPages = [
    {
      path: "/admin/list-manager",
      component: <ListManager />,
    },
    {
      path: "/admin/create-manager",
      component: <CreateManager />,
    },
    {
      path: "/admin/edit-manager",
      component: <EditManager />,
    },
    {
      path: "/admin/list-book",
      component: <ListBook />,
    },
    {
      path: "/admin/create-book",
      component: <CreateBook />,
    },
    {
      path: "/admin/edit-book",
      component: <EditBook />,
    },
    {
      path: "/admin/list-cart",
      component: <ListCart />,
    },
    {
      path: "/admin/edit-cart",
      component: <EditCart />,
    },
    {
      path: "/admin/list-store",
      component: <ListStore />,
    },
    {
      path: "/admin/create-store",
      component: <CreateStore />,
    },
    {
      path: "/admin/edit-store/:storeId",
      component: <EditStore />,
    },
    {
      path: "/admin",
      component: <DashBoard />
    },
  ];

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <AppLayoutUser>
            <HomePage />
          </AppLayoutUser>

        </Route>
        <Route exact path="/admin/login">
          <LoginAdmin />
        </Route>

        {PrivateAdminPages.map((i, index) => {
          return (
            <PrivateRouteAdmin path={i.path} key={index}>
              {i.component}
            </PrivateRouteAdmin>
          );
        })}
        {PrivateUserPages.map((i, index) => {
          return (
            <PrivateRouteUser path={i.path} key={index}>
              {i.component}
            </PrivateRouteUser>
          );
        })}

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesProvider;