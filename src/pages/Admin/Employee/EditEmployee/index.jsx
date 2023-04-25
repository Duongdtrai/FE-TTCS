import React from 'react';
import { Form, Input, Button, Select, notification, DatePicker } from 'antd';
import {useDocumentTitle} from "../../../../hooks/useDocumentTitle";
import moment from 'moment';
const {Option} = Select;


const EditEmployee = () => {
  useDocumentTitle('Chỉnh sửa thông tin nhân viên');
  const onFinish = (values) => {
    API.register({ username: values.username, password: values.password }).then((response) => {
      notification["success"]({
        message: "Tạo nhân viên thành công",
      });
      history.push('/admin/list-employee');
    }).then((error) => {
      notification["error"]({
        message: "Tạo nhân viên không thành công",
      });
    });
  };

  return (
    <div>
      <h1 className='text-3xl'>Chỉnh sửa nhân viên</h1>
      <Form
        name="normal_register"
        className="register-form"
        initialValues={{
          prefix: '86',
        }}
        labelAlign="top"
        onFinish={onFinish}
      >
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
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này',
            },
          ]}
          hasFeedback
          
        >
          <Input.Password placeholder="Mật khẩu" disabled/>
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập trường này',
            },
          ]}
        >
          <Select placeholder="Giới tính">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birthday"
        >
          <DatePicker
            defaultValue={moment()}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          label="Số diện thoại"
          name="numberPhone"
        >
          <Input style={{ width: '100%' }} placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Trạng thái làm việc"
          name="status"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn trường này',
            },
          ]}
        >
          <Select placeholder="Trạng thái">
            <Option value="male">Đang làm việc</Option>
            <Option value="female">Đã nghỉ việc</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Công việc"
          name="job"
        >
          <Input style={{ width: '100%' }} placeholder="Công việc" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
        >
          <Input style={{ width: '100%' }} placeholder="Địa chỉ" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button">
          Chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEmployee;