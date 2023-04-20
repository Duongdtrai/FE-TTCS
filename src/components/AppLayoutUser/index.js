import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Dropdown } from 'antd';
import logo from "../../assets/images/logo.png";
import {
  ShoppingCartOutlined,UserOutlined,UnlockOutlined, PoweroffOutlined
} from '@ant-design/icons';
import UserAvatar from "../UserAvatar";
import { useHistory } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

// eslint-disable-next-line react/prop-types
const AppLayoutUser = ({children}) => {
  const history = useHistory();
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const items = [
    {
      key: "/profile",
      label: "Profile",
      icon: <UserOutlined/>,
    },
    {
      key: "/change-password",
      label: "Change Password",
      icon: <UnlockOutlined/>,
    },
    {
      key: "/logout",
      label: "Logout",
      icon: <PoweroffOutlined/>,
    },
  ];
  const handleMenuClick = (events) => {
    if (events.key) {
      if (events.key === "/logout") {
        // LogoutService.run(dispatch, {user: localStorage.getItem(STORAGE.userID)}, onLogout);
        localStorage.clear();
        navigate("/login");
      } else {
        navigate(events.key);
      }
    }
  };
  const menuProps = {
    items,
    // onClick: handleMenuClick,
  };


  return (
    <Layout className="layout">
      <Header className='flex justify-between items-center' style={{backgroundColor: '#4b9eed'}}>
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-16" />
          <h1>My Book</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="cursor-pointer text-base mr-8" onClick={() => history.push("/")}>Trang chủ</div>
          <div className="cursor-pointer text-base mr-8" onClick={() => history.push("/")}>Thể loại</div>
          <div className="cursor-pointer text-base mr-8" onClick={() => history.push("/author")}>Độc giả</div>
          <div> 
            <ShoppingCartOutlined className="cursor-pointer text-base mr-8" onClick={() => history.push("/cart")}/>
          </div>
          <div className='mr-8'>
            <span className='cursor-pointer text-base' onClick={() => history.push("/login")}>Đăng nhập</span>
            /
            <span className='cursor-pointer text-base' onClick={() => history.push("/register")}>Đăng ký</span>
          </div>
          <div>
            <Dropdown menu={menuProps} placement="bottomLeft">
              <a href="#" className="d-block" style={{color: "#FFFFFF", overflow: "hidden", maxWidth: "75ch"}}>
                <label className="text-overflow text-black" >{"Duong"}</label>&ensp;
                <UserAvatar size={40}/>
              </a>
            </Dropdown>
          </div>
         
        </div>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default AppLayoutUser;