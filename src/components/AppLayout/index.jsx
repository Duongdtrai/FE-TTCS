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
import AdminAvatar from "../AdminAvatar";
import { STORAGE, API } from '../../configs';
import { ROLE } from '../../utils/constant';
import { setAdmin } from "../../redux/slice/AuthAdminSlice";
const { Header, Content, Sider } = Layout;

const leftMenuList = [
  {
    key: '/admin',
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
    key: '/admin/list-employee',
    icon: <UserOutlined />,
    label: 'Quản lý danh sách nhân viên',
  },
  {
    key: '/admin/list-author',
    icon: <UserOutlined />,
    label: 'Quản lý danh sách tác giả',
  },
  {
    key: '/admin/list-book',
    icon: <BookOutlined />,
    label: 'Quản lý danh sách Book',
  },

 
  {
    key: '/admin/list-borrow',
    icon: <PushpinOutlined />,
    label: 'Quản lý mượn sách',
  },

  {
    key: '/admin/list-store',
    icon: <AppstoreOutlined />,
    label: 'Quản lý kho',
  },
  {
    key: '/admin/list-cart',
    icon: <ShoppingCartOutlined />,
    label: 'Quản lý giỏ hàng',
  },
  {
    key: '/admin/list-revenue',
    icon: <MoneyCollectOutlined />,
    label: 'Quản lý doanh thu',
  },
];


// eslint-disable-next-line react/prop-types
const AppLayout = ({ children }) => {
  const user = useSelector((state) => state.authAdmin.user);
  const role = useSelector((state) => state.authAdmin.role);
  const is_loading = useSelector((state) => state.authAdmin.is_loading);
  const [acceptMenu, setAcceptMenu] = useState(true);
  const [menuList, setMenuList] = useState(leftMenuList);
  const [collapsed, setCollapsed] = useState(false);
  // const updateAdmin = useSelector((state) => state.updateAdmin);
  const history = useHistory();
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (is_loading) {
      API.getDetailsUser().then((response) => {
        dispatch(setAdmin(response.data));
        if (response.data.role === ROLE.ADMIN && acceptMenu) {
          // let menu = menuList;
          // menu.splice(2, 0, {
          //   key: '/admin/list-employee',
          //   icon: <UserOutlined />,
          //   label: 'Quản lý danh sách nhân viên',
          // },);
          // setMenuList(menu);
          setAcceptMenu(false);
        } 
      });
    }
  }, []);
  // useEffect(() => {
  //   getUserInfo();
  // }, [updateAdmin.refresh]);

  // const getUserInfo = () => {
  //   const adminId = localStorage.getItem("adminId") || "";
  //   GetCurrentUserService.run(dispatch, adminId);
  // };

  const items = [
    {
      key: "/admin/profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "/admin/change-password",
      label: "Change Password",
      icon: <UnlockOutlined />,
    },
    {
      key: "/admin/logout",
      label: "Logout",
      icon: <PoweroffOutlined />,
    },
  ];
  const onLogout = () => {
    localStorage.clear();
    history.push("/admin/login");
  };
  const handleMenuClick = (events) => {
    if (events.key) {
      if (events.key === "/admin/logout") {
        LogoutService.run(dispatch, { user: localStorage.getItem(STORAGE.adminId) }, onLogout);
        localStorage.clear();
        history.push("/admin/login");
      } else {
        history.push(events.key);
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
        <div className="logo d-inline !flex justify-between items-center">
          <img onClick={() => {
            history.push("/admin");
          }} src={logo} alt="Exponential Africa" className='logo'
          style={{ display: 'flex', height: "50px", paddingTop: "5px", cursor: "pointer" }} />
          <div className="ml-4 text-xl">Hệ thống quản lý thư viện sách</div>
        </div>
        <div className="pe-3 d-inline float-end me-3">
          <Dropdown menu={menuProps} placement="bottomLeft">
            <a href="#" className="d-block" style={{ color: "#FFFFFF", overflow: "hidden", maxWidth: "75ch" }}>
              <label className="text-overflow text-black" >{user?.username ? user?.username : 'Admin'}</label>&ensp;
              <AdminAvatar size={40} />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} style={{ overflow: 'auto', height: '100vh', position: 'fixed' }} breakpoint="md" collapsedWidth={80}>
          <Menu
            onClick={({ key }) => {
              history.push(key);
            }}
            mode="inline"
            selectedKeys={[window.location.pathname]}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            style={{ height: '100%', borderRight: 0 }}
            items={menuList}
          />
        </Sider>
        <Layout style={{ marginLeft: 250 }} className='md:!ml-64 !ml-24'>
          <Content style={{ flexGrow: 1, padding: 24, height: "100vh" }}>
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
