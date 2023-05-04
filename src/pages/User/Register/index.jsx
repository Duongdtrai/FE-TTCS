import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Select, notification, DatePicker } from 'antd';
import { API } from "../../../configs";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import UploadImage from '../../../components/UploadImage';
import { DATE_FORMAT } from "../../../utils/constant";
import moment from "moment";

const { Option } = Select;

const RegisterPage = () => {
  const [file, setFile] = useState(null);
  useDocumentTitle("Đăng ký");
  const history = useHistory();

  const onFinish = (values) => {
    if(file === null) {
      notification["error"]({
        message: "Vui lòng chọn ảnh",
      });
      return;
    }
    const dataRegister = { ...values, birthday: moment(values.birthday).format(DATE_FORMAT) };
    // const formData = new FormData();
    // const emptyBlob = new Blob([""], { type: "text/plain" });
    // if (file && file?.name) {
    //   formData.append("file", file, file.name);
    // } else {
    //   formData.append("file", emptyBlob, "");
    // }
    API.register({ user: JSON.stringify(dataRegister), image: file}).then((response) => {
      notification["success"]({
        message: "Tạo tài khoản thành công",
      });
      history.push('/login');
    }).then((error) => {
      notification["error"]({
        message: "Tạo tài khoản không thành công",
      });
    });
  };
  const uploadFile = async (file) => {
    setFile(file);
    // await API.uploadAvatarPerson(newPerson?.data.data.id, formData);
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Đăng ký tài khoản</h1>
      <div className='h-full flex justify-center items-center'>
        <div className='w-[500px]'>
          <Form
            name="normal_register"
            className="register-form"
            initialValues={{
              prefix: '86',
            }}
            labelAlign="top"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item name="avatar" label="Ảnh">
              <UploadImage uploadFile={uploadFile} />
            </Form.Item>
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
              <Input.Password placeholder="Mật khẩu" />
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
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder='Ngày sinh'
                format={DATE_FORMAT}
              />
            </Form.Item>
            <Form.Item
              label="Số diện thoại"
              name="numberPhone"
            >
              <Input style={{ width: '100%' }} placeholder="Số điện thoại" />
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
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </div>

      </div>
    </div>


  );
};

export default RegisterPage;
