import React from 'react';
import { Image } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import Logo from "../../assets/images/logo.png";


const LoginAdmin = () => {
  const onFinish = (values) => {
    // call api và lấy token để lưu vào trong localstoreage
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
          <Image
            preview={false}
            width={400}
            src={Logo}
          />
        </div>
        <div className='col-span-4'>
          <h1 className='text-center'>Login</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
        Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div style={{position: "fixed", bottom: 10}}>Verson 1.0</div>
    </div>
  );
};

export default LoginAdmin;