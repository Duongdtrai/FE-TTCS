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
import DashBoard from "./Admin/Dashboard";
import ListBook from "./Admin/Books/ListBook";
import EditBook from "./Admin/Books/EditBook";
import CreateBook from "./Admin/Books/CreateBook";
import ListCart from "./Admin/Carts/ListCart";
import EditCart from "./Admin/Carts/EditCart";
import ListStore from "./Admin/Store/ListStore";
import CreateStore from "./Admin/Store/CreateStore";
import EditStore from "./Admin/Store/EditStore";

export {
  /** Admin */
  DashBoard,
  LoginAdmin,
  /** Admin - Screen User */
  ListManager,
  CreateManager,
  EditManager,
  /** Admin - Screen List Book */
  ListBook,
  EditBook,
  CreateBook,
  /** Admin - Screen List Cart */
  ListCart,
  EditCart,
  /** Admin - Screen List Store */
  ListStore,
  CreateStore,
  EditStore,
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