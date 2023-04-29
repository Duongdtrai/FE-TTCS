import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Dropdown } from 'antd';
import logo from "../../assets/images/logo.png";
import {
  ShoppingCartOutlined, UserOutlined, UnlockOutlined, PoweroffOutlined
} from '@ant-design/icons';
import UserAvatar from "../UserAvatar";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutService } from './Service';
import { STORAGE } from '../../configs';
import { API } from "../../configs";
import { setUser } from "../../redux/slice/AuthUserSlice";
const { Header, Content, Footer } = Layout;

// eslint-disable-next-line react/prop-types
const AppLayoutUser = ({ children }) => {
  const [refresh, setRefresh] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    API.getDetailsUser().then((response) => {
      dispatch(setUser(response.data));
      setIsLogin(true);
    });
  }, [authUser]);

  const items = [
    {
      key: "/profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "/change-password",
      label: "Change Password",
      icon: <UnlockOutlined />,
    },
    {
      key: "/logout",
      label: "Logout",
      icon: <PoweroffOutlined />,
    },
  ];
 
  const handleMenuClick = (events) => {
    if (events.key) {
      if (events.key === "/logout") {
        LogoutService.run(dispatch);
        setRefresh(!refresh);
      } else {
        history.push(events.key);
      }
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  return (
    <Layout className="layout">
      <Header className='flex justify-between items-center' style={{ backgroundColor: '#4b9eed' }}>
        <div className="flex justify-center items-center">
          <img src={logo} alt="Logo" className="w-16" />
          <h1 className='ml-2 text-white'>My Book</h1>
        </div>
        <div className="flex justify-center items-center">
          <div className="cursor-pointer text-base mr-8 text-white" onClick={() => history.push("/")}>Trang chủ</div>
          <div className="cursor-pointer text-base mr-8 text-white" onClick={() => history.push("/")}>Thể loại</div>
          <div className="cursor-pointer text-base mr-8 text-white" onClick={() => history.push("/author")}>Tác giả</div>
          <div>
            <ShoppingCartOutlined className="cursor-pointer text-base mr-8 text-white" onClick={() => history.push("/cart")} />
          </div>
          {
            isLogin ? (<></>) :
              (
                <div className='mr-8'>
                  <span className='cursor-pointer text-base text-white' onClick={() => history.push("/login")}>Đăng nhập</span>
                  <span className='text-white ml-2 mr-2 font-semibold'>/</span>
                  <span className='cursor-pointer text-base text-white' onClick={() => history.push("/register")}>Đăng ký</span>
                </div>
              )
          }
          {
            isLogin && (
              <div>
                <Dropdown menu={menuProps} placement="bottomLeft">
                  <a href="#" className="d-block" style={{
                    color: "#FFFFFF",
                    overflow: "hidden",
                    maxWidth: "75ch"
                  }}>
                    <label className="text-overflow text-white" >{authUser?.user.username}</label>&ensp;
                    <UserAvatar size={40} />
                  </a>
                </Dropdown>
              </div>
            )
          }
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
        Ant Design ©2023 Created by TTCS
      </Footer>
    </Layout>
  );
};
export default AppLayoutUser;