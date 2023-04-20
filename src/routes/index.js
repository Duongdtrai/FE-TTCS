import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PrivateRouteAdmin} from "./PrivateRouteAdmin";
import {PrivateRouteUser} from "./PrivateRouteUser";
import {
  /**Admin */
  LoginAdmin,
  Error404,
  ListManager,
  CreateManager,
  EditManager,
  
  /**User */
  LoginPage,
  HomePage,
  RegisterPage,
  AuthorPage,
  CartPage,
  ChangePasswordPage,
  ProfilePage,
} from "../pages";

const RoutesProvider = () => {
  /**
   * @Role {user}
   */
  const PrivateUserPages = [
    {
      path: "/home-page",
      component: <HomePage/>,
    },
    {
      path: "/login",
      component: <LoginPage/>,
    },
    {
      path: "/register",
      component: <RegisterPage/>,
    },
    {
      path: "/author",
      component: <AuthorPage/>,
    },{
      path: "/cart",
      component: <CartPage/>,
    },{
      path: "/change-password",
      component: <ChangePasswordPage/>,
    },{
      path: "/profile",
      component: <ProfilePage/>,
    }

  ];


  /**
   * @Role {admin}
   */
  const PrivateAdminPages =[ 
    {
      path: "/admin/list-manager",
      component: <ListManager/>,
    },
    {
      path: "/admin/create-manager",
      component: <CreateManager/>,
    },
    {
      path: "/admin/edit-manager",
      component: <EditManager/>,
    }
  ];
    
  return (
    <BrowserRouter>
      <Switch>
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
          <Error404/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesProvider;