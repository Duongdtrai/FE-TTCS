import { notification } from "antd";
import {API} from "../../configs";
import {logout} from "../../redux/slice/AuthAdminSlice";

export const LogoutService = {
  run: (dispatch, params, onLogout) => {
    API.logout()
      .then((response) => {
        dispatch(logout());
        onLogout();
        notification["success"]({
          message: "Đăng xuất thành công",
        });
      });
  },
};
