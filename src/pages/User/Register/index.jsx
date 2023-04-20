import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { API } from "../../../configs";
import {useDocumentTitle} from "../../../hooks/useDocumentTitle";
const { Option } = Select;

const RegisterPage = () => {
  useDocumentTitle("Đăng ký");
  const history = useHistory();
  const onFinish = (values) => {
    API.register({ username: values.username, password: values.password }).then((response) => {
      notification["success"]({
        message: "Đăng ký tài khoản thành công",
      });
      history.push('/login');
    }).then((error) => {
      notification["error"]({
        message: "Đăng ký không thành công",
      });
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className='h-full flex justify-center items-center'>
      <div>
        <Form
          name="normal_register"
          className="register-form"
          initialValues={{
            prefix: '86',
          }}
          onFinish={onFinish}
        >
          <h1 style={{ textAlign: 'center' }}>Đăng ký</h1>
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
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này',
              },
              {
                type: 'email',
                message: 'Đây phải là email',
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm password"
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp, vui lòng nhập lại'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập trường này',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon" />} style={{ width: '100%' }} placeholder="Phone Number" />
          </Form.Item>

          <Form.Item className='text-center'>
            <Button type="primary" htmlType="submit" className="register-form-button">
          Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
      
    </div>
    
  );
};

export default RegisterPage;
