import React, {useEffect, useState} from "react";
import {UserOutlined} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import {useSelector} from "react-redux";
import Logo from "../../assets/images/logo.png";
// import {getDefValue} from "../../utils/helper";


// eslint-disable-next-line react/prop-types
const UserAvartar = ({size, image}) => {
  // const auth = useSelector((state) => state.auth);
  // const updateAdmin = useSelector((state) => state.updateAdmin);
  // const [image, setImage] = useState(updateAdmin.image);
  // useEffect(() => {
  //   setImage(updateAdmin.image);
  // }, [updateAdmin.image]);
  // const avatar = getDefValue(auth.user, "avatar");
  return <Avatar src={image} size={size} icon={<UserOutlined/>}/>;
  // if (avatar !== "") {
  //   return (
  //     <Avatar
  //       size={size}
  //       src={
  //         Logo
  //         // image ? image : avatar + "?updated_at=" + getDefValue(auth.user?.avatar, "updated_at")
  //       }
  //     />
  //   );
  // } else if (updateAdmin.image) {
  //   return (
  //     <Avatar
  //       size={size}
  //       src={
  //         Logo
  //         // updateAdmin.image
  //       }
  //     />
  //   );
  // } else {
  //   return <Avatar size={size} icon={<UserOutlined/>}/>;
  // }
};

export default UserAvartar;
