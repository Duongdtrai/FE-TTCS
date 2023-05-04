import Error404 from "../pages/Errors/Page404";
/** Admin */
import LoginAdmin from "../pages/Admin/login";
import ListUser from "./Admin/User/ListUser";
import CreateUser from "./Admin/User/CreateUser";
import EditUser from "./Admin/User/EditUser";
import ListEmployee from "./Admin/Employee/ListEmployee";
import CreateEmployee from "./Admin/Employee/CreateEmployee";
import EditEmployee from "./Admin/Employee/EditEmployee";
import DashBoard from "./Admin/Dashboard";
import ListBook from "./Admin/Books/ListBook";
import EditBook from "./Admin/Books/EditBook";
import CreateBook from "./Admin/Books/CreateBook";
import ListCart from "./Admin/Carts/ListCart";
import EditCart from "./Admin/Carts/EditCart";
import ListStore from "./Admin/Store/ListStore";
import CreateStore from "./Admin/Store/CreateStore";
import EditStore from "./Admin/Store/EditStore";
import ListRevenue from "./Admin/Revenue/ListRevenue";
import CreateRevenue from "./Admin/Revenue/CreateRevenue";
import EditRevenue from "./Admin/Revenue/EditRevenue";
import ListBorrow from "./Admin/BorrowBook/ListBorrow";
import DetailBorrow from "./Admin/BorrowBook/DetailBorrow";
import ChangePassword from "./Admin/ChangePassword";
import Profile from "./Admin/Profile";
import CreateAuthor from "./Admin/Author/CreateAuthor";
import ListAuthor from "./Admin/Author/ListAuthor";
import EditAuthor from "./Admin/Author/EditAuthor";
import ListReturnBook from "./Admin/ReturnBook/ListReturn";
/** User */
import LoginPage from "../pages/User/Login";
import HomePage from "../pages/User";
import RegisterPage from "./User/Register";
import AuthorPage from "./User/Author";
import CartPage from "./User/Cart";
import ChangePasswordPage from "./User/ChangePassword";
import ProfilePage from "./User/Profile";
import DetailAuthor from "../pages/User/Author/DetailAuthor";
import Category from "../pages/User/Category";
import DetailBook from "../pages/User/Books/DetailBook";

export {
  /** Admin */
  DashBoard,
  LoginAdmin,
  /** Admin - Screen User */
  ListUser,
  CreateUser,
  EditUser,
  /** Admin - Screen Employee */
  ListEmployee,
  CreateEmployee,
  EditEmployee,
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
  /** Admin - Screen List Revenue */
  ListRevenue,
  CreateRevenue,
  EditRevenue,
  /** Admin - Screen List Borrow */
  DetailBorrow,
  ListBorrow,
  /** Admin - Screen List Borrow */
  ListReturnBook,
  /** Admin - Screen List Author */
  ListAuthor,
  CreateAuthor,
  EditAuthor,
  /** Admin - Screen Change Password */
  ChangePassword,
  Profile,
  /** User */
  LoginPage,
  HomePage,
  RegisterPage,
  AuthorPage,
  CartPage,
  ChangePasswordPage,
  ProfilePage,
  DetailAuthor,
  Category,
  DetailBook,
  // error
  Error404,

};