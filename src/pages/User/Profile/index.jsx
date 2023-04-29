import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, DatePicker, notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { API } from "../../../configs";
import { DATE_FORMAT } from "../../../utils/constant";
import UploadImage from '../../../components/UploadImage';
import moment from "moment";

const Profile = () => {
  useDocumentTitle('Profile User');
  const { Option } = Select;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.user);
  const is_loading = useSelector((state) => state.authUser.is_loading);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();

  useEffect(async () => {
    setImage(user.avatar ? `http://54.251.21.44/api/v1/file/${user.avatar}`: null);
    form.setFieldsValue({
      ...user,
      birthday: user.birthday ? moment(user.birthday, DATE_FORMAT) : null
    });
  }, [is_loading]);

  const onFinish = (values) => {
    setLoading(true);
    API.updateUser(values).then(() => {
      setLoading(false);
      notification["error"]({
        message: "Cập nhật thông tin thành công",
      });
    }).catch(err => {
      setLoading(false);
      notification["error"]({
        message: "Cập nhật thông tin không thành công",
      });
    });
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    const emptyBlob = new Blob([""], { type: "text/plain" });
    if (file && file?.name) {
      formData.append("file", file, file.name);
    } else {
      formData.append("file", emptyBlob, "");
    }
    await API.uploadImageUser(formData).then((response) => {
      notification["success"]({
        message: "Cập nhật ảnh thành công",
      });
    }).catch(error => {
      notification["error"]({
        message: "Cập nhật ảnh không thành công",
      });
    }
    );
  };
  return (
    <div>
      <h1 className='text-3xl'>Profile User</h1>
      <Form
        onFinish={onFinish}
        layout="vertical"
        labelAlign="left"
        colon={false}
        form={form}
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
            format="YYYY-MM-DD"
            allowClear
            style={{ width: "100%" }}
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
        <div className='w-full flex justify-center items-center'>
          <UploadImage uploadFile={uploadFile} image={image} />
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;