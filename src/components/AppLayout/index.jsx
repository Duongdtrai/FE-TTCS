import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import {
  MoneyCollectOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  PoweroffOutlined,
  PushpinOutlined,
  UnlockOutlined,
  UserOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { LogoutService } from "./Service";
import UserAvatar from "../UserAvatar";
import { STORAGE } from '../../configs';
// import {GetCurrentUserService} from '../GetCurrentUser/Service';

const { Header, Content, Sider } = Layout;

const leftMenuList = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard'
  },
  {
    key: '/admin/list-user',
    icon: <UserOutlined />,
    label: 'Quản lý danh sách độc giả',
    // children: [
    //   {
    //     key: '/list-users',
    //     label: "Users",
    //   },
    // ]
  },
  {
    key: '/admin/list-book',
    icon: <BookOutlined />,
    label: 'Quản lý danh sách Book',
  },

  {
    key: '/admin/list-cart',
    icon: <ShoppingCartOutlined />,
    label: 'Quản lý giỏ hàng',
  },
  {
    key: '/admin/book',
    icon: <PushpinOutlined />,
    label: 'Quản lý mượn sách',
  },
  {
    key: '/admin/book',
    icon: <MoneyCollectOutlined />,
    label: 'Quản lý doanh thu',
  },
  {
    key: '/admin/book',
    icon: <AppstoreOutlined />,
    label: 'Quản lý kho',
  },

];


// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const [collapsed, setCollapsed] = useState(false);
  // const updateAdmin = useSelector((state) => state.updateAdmin);
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = () => {
    localStorage.clear();
    history.push("/login");
  };

  // useEffect(() => {
  //   getUserInfo();
  // }, [updateAdmin.refresh]);

  // const getUserInfo = () => {
  //   const userId = localStorage.getItem("userId") || "";
  //   GetCurrentUserService.run(dispatch, userId);
  // };

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
        LogoutService.run(dispatch, { user: localStorage.getItem(STORAGE.userID) }, onLogout);
        localStorage.clear();
        navigate("/login");
      } else {
        navigate(events.key);
      }
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  const [openKeys, setOpenKeys] = useState(() => {
    return JSON.parse(localStorage.getItem('openMenu') || "[]");
  });
  const onOpenChange = (key) => {
    setOpenKeys(key);
    localStorage.setItem('openMenu', JSON.stringify(key));
  };

  return (
    <Layout className="min-vh-100">
      <Header style={{ backgroundColor: 'white', borderBottom: '1px solid #c9c9c9', position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex' }} className='justify-between items-center'>
        <div className="logo d-inline flex justify-between items-center">
          <img onClick={() => {
            navigate("/admin");
          }} src={logo} alt="Exponential Africa" className='logo'
          style={{ display: 'flex', height: "50px", paddingTop: "5px", cursor: "pointer" }} />
          <div className="ml-4 text-xl">My Admin</div>
        </div>
        <div className="pe-3 d-inline float-end me-3">
          <Dropdown menu={menuProps} placement="bottomLeft">
            <a href="#" className="d-block" style={{ color: "#FFFFFF", overflow: "hidden", maxWidth: "75ch" }}>
              <label className="text-overflow text-black" >{user?.fullName ? user?.fullName : 'Admin'}</label>&ensp;
              <UserAvatar size={40} />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} style={{ overflow: 'auto', height: '100vh', position: 'fixed' }} breakpoint="md" collapsedWidth={80}>
          <Menu
            onClick={({ key }) => {
              navigate(key);
            }}
            mode="inline"
            selectedKeys={[window.location.pathname]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ height: '100%', borderRight: 0 }}
            items={leftMenuList}
          />
        </Sider>
        <Layout style={{ marginLeft: 250 }} className='md:!ml-64 !ml-24'>
          <Content style={{ flexGrow: 1, padding: 24 }}>
            <div style={{ padding: 24, background: "#FFFFFF" }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
