import Error404 from "../pages/Errors/Page404";
/** Admin */
import LoginAdmin from "../pages/Admin/login";
import ListManager from "../pages/Admin/Manager/ListManager";
import CreateManager from "../pages/Admin/Manager/CreateManager";
import EditManager from "../pages/Admin/Manager/EditManager";


/** User */
import LoginPage from "../pages/User/Login";
import HomePage from "../pages/User";
import RegisterPage from "./User/Register";
import AuthorPage from "./User/Author";
import CartPage from "./User/Cart";
import ChangePasswordPage from "./User/ChangePassword";
import ProfilePage from "./User/Profile";
export {
  /** Admin */
  LoginAdmin,
  ListManager,
  CreateManager,
  EditManager,

  /** User */
  LoginPage,
  HomePage,
  RegisterPage,
  AuthorPage,
  CartPage,
  ChangePasswordPage,
  ProfilePage,
  // error
  Error404,
 
};