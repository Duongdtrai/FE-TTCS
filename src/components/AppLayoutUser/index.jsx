import React, { useEffect, useState } from 'react';
import { Layout, theme, Dropdown } from 'antd';
import logo from "../../assets/images/logo.png";
import {
  ShoppingCartOutlined, UserOutlined, UnlockOutlined, PoweroffOutlined
} from '@ant-design/icons';
import UserAvatar from "../UserAvatar";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutService } from './Service';
import { API } from "../../configs";
import { setUser } from "../../redux/slice/AuthUserSlice";
import UserDefault from "../../assets/images/user-default.png";
const { Header, Content, Footer } = Layout;

// eslint-disable-next-line react/prop-types
const AppLayoutUser = ({ children }) => {
  const is_loading = useSelector((state) => state.authUser.is_loading);
  const authUser = useSelector((state) => state.authUser);
  const [refresh, setRefresh] = useState(true);
  const [isLogin, setIsLogin] = useState(is_loading);
  const history = useHistory();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!is_loading) {
      API.getDetailsUser().then((response) => {
        dispatch(setUser(response.data));
        setIsLogin(true);
      });
    }
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
          <div className="cursor-pointer text-base mr-8 text-white" onClick={() => history.push("/category")}>Thể loại</div>
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
                    <label className="text-overflow text-white mr-1" >{authUser?.user.username}</label>
                    <UserAvatar size={40} image={authUser.user ? `http://54.251.21.44/api/v1/file/${authUser.user.avatar}` : UserDefault} />
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