import React, {useState} from 'react';
import { Form, Input, Button, Select, notification, DatePicker } from 'antd';
import {useDocumentTitle} from "../../../../hooks/useDocumentTitle";
import moment from 'moment';
import UploadImage from '../../../../components/UploadImage';
import { API } from '../../../../configs';
import { DATE_FORMAT } from "../../../../utils/constant";
const {Option} = Select;


const CreateEmployee = () => {
  useDocumentTitle('Tạo nhân viên');
  const [file, setFile] = useState();
  const onFinish = (values) => {
    // const formData = new FormData();
    // const emptyBlob = new Blob([""], { type: "text/plain" });
    // if (file && file?.name) {
    //   formData.append("file", file, file.name);
    // } else {
    //   formData.append("file", emptyBlob, "");
    // }
    // API.uploadImageUser(formData).then(response => {
    //   console.log("response", response);
    // });
    delete values.avatar;
    console.log({...values, birthday: moment(values.birthday).format(DATE_FORMAT)});
    API.register({...values, birthday: moment(values.birthday).format(DATE_FORMAT)}).then((response) => {
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
  const uploadFile = async (fileUpload) => {
    setFile(fileUpload);
  };
  return (
    <div>
      <h1 className='text-3xl'>Tạo nhân viên mới</h1>
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
            <Option value="DangLamViec">Đang làm việc</Option>
            <Option value="DaNghiViec">Đã nghỉ việc</Option>
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
        Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateEmployee;