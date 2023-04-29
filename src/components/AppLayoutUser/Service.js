import { notification } from "antd";
import {API} from "../../configs";
import {logout} from "../../redux/slice/AuthUserSlice";

export const LogoutService = {
  run: (dispatch) => {
    API.logout()
      .then(() => {
        dispatch(logout());
        notification["success"]({
          message: "Đăng xuất thành công",
        });
      });
  },
};
