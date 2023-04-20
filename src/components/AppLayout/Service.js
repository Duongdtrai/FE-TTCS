// import {API} from "../../configs";
// import {logout} from "../../redux/slice/AuthSlice";
// import {loginError} from "../../redux/slice/LoginSlice";
// import {clearAdminAvatar} from "../../redux/slice/SingleAdminSlice";
// import {clearStateImage} from "../../redux/slice/UpdateAdminSlice";
// import {AppDispatch} from "../../redux/store";
// import {API_STATUS_CODE} from "../../utils/constant";
// import {getErr422} from "../../utils/helper";

export const LogoutService = {
//   run: (dispatch, params, onLogout) => {
//     API.logout()
//       .then((response) => {
//         if (!response.data.data.length && response.data.code === API_STATUS_CODE.success) {
//           dispatch(logout());
//           dispatch(clearAdminAvatar());
//           dispatch(clearStateImage());
//           onLogout();
//           localStorage.clear();
//         }
//         else if (response?.data?.error?.code === API_STATUS_CODE.unauthorized) {
//           dispatch(loginError(getErr422(response?.data?.error?.message)));
//         }
//       })
//       .catch((error) => {
//         dispatch(loginError(getErr422(error)));
//       });
//   },
};
