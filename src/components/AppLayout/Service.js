import { notification } from "antd";
import {API} from "../../configs";
import {logout} from "../../redux/slice/AuthAdminSlice";
// import {loginError} from "../../redux/slice/LoginSlice";
// import {clearAdminAvatar} from "../../redux/slice/SingleAdminSlice";
// import {clearStateImage} from "../../redux/slice/UpdateAdminSlice";
// import {AppDispatch} from "../../redux/store";
// import {API_STATUS_CODE} from "../../utils/constant";
// import {getErr422} from "../../utils/helper";

export const LogoutService = {
  run: (dispatch, params, onLogout) => {
    API.logout()
      .then((response) => {
        dispatch(logout());
        notification["success"]({
          message: "Đăng xuất thành công",
        });
      });
  },
};
