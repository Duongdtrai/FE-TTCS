import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setUserToken } from '../../../redux/slice/AuthUserSlice';
import { API } from '../../../configs';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle';

const LoginPage = () => {
  useDocumentTitle("Đăng nhập");
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    API.loginUser({ username: values.username, password: values.password })
      .then((response) => {
        dispatch(setUserToken(response.data));
        notification["success"]({
          message: "Đăng nhập thành công",
        });
        history.push("/");
      }).catch((error) => {
        notification["error"]({
          message: "Đăng nhập không thành công",
        });
      });
  };

  return (
    <div className='mt-24 h-full flex justify-center items-center'>
      <div className='w-[500px]'>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h1 style={{ textAlign: 'center' }}>Đăng nhập</h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="/">
            Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item className='text-center'>
            <Button type="primary" htmlType="submit" className="login-form-button mr-2">
            Đăng nhập
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => history.push("/register")}
            >
            Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
