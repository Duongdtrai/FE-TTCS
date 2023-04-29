import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { PrivateRouteAdmin } from "./PrivateRouteAdmin";
import { PrivateRouteUser } from "./PrivateRouteUser";
import AppLayoutUser from "../components/AppLayoutUser";
import {
  /**Admin */
  LoginAdmin,
  Error404,
  ListUser,
  CreateUser,
  EditUser,
  ListEmployee,
  CreateEmployee,
  EditEmployee,
  DashBoard,
  ListBook,
  EditBook,
  CreateBook,
  ListStore,
  CreateStore,
  EditStore,
  ListRevenue,
  CreateRevenue,
  EditRevenue,
  DetailBorrow,
  ListBorrow,
  ChangePassword,
  Profile,
  ListAuthor,
  CreateAuthor,
  EditAuthor,
  ListReturnBook,
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
import { useSelector } from "react-redux";

const RoutesProvider = () => {
  const is_login = useSelector((state) => state.authAdmin.is_loading);
  /**
   * @Role {admin}
   */
  const PrivateAdminPages = [
    {
      path: "/admin/list-user",
      component: <ListUser />,
    },
    {
      path: "/admin/create-user",
      component: <CreateUser />,
    },
    {
      path: "/admin/edit-user",
      component: <EditUser />,
    },
    {
      path: "/admin/list-employee/:employeeId",
      component: <EditEmployee />,
    },
    {
      path: "/admin/list-employee",
      component: <ListEmployee />,
    },
    {
      path: "/admin/create-employee",
      component: <CreateEmployee />,
    },
    {
      path: "/admin/list-book/:bookId",
      component: <EditBook />,
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
      path: "/admin/list-revenue",
      component: <ListRevenue />,
    },
    {
      path: "/admin/create-revenue",
      component: <CreateRevenue />,
    },
    {
      path: "/admin/edit-revenue",
      component: <EditRevenue />,
    },
    {
      path: "/admin/list-author/:authorId",
      component: <EditAuthor />,
    },
    {
      path: "/admin/list-author",
      component: <ListAuthor />,
    },
    {
      path: "/admin/create-author",
      component: <CreateAuthor />,
    },
    {
      path: "/admin/list-borrow",
      component: <ListBorrow />,
    },
    {
      path: "/admin/detail-borrow",
      component: <DetailBorrow />,
    },
    {
      path: "/admin/list-return-book",
      component: <ListReturnBook />,
    },
    {
      path: '/admin/change-password',
      component: <ChangePassword />,
    },
    {
      path: '/admin/profile',
      component: <Profile />,
    },
    {
      path: "/admin",
      component: <DashBoard />
    },
  ];

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


  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/">
          <AppLayoutUser>
            <HomePage />
          </AppLayoutUser>
        </Route>
        <Route exact path="/admin/login">
          {is_login ? <Redirect to="/admin" /> : <LoginAdmin />}
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
    </BrowserRouter >
  );
};

export default RoutesProvider;