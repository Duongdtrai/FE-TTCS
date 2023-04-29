import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, notification, DatePicker } from 'antd';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment';
import { API } from '../../../../configs';
import { DATE_FORMAT } from "../../../../utils/constant";
const { Option } = Select;


const EditEmployee = () => {
  useDocumentTitle('Chỉnh sửa thông tin nhân viên');
  const history = useHistory();
  const { employeeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    API.detailsUser(employeeId).then((response) => {
      form.setFieldsValue({
        ...response.data,
        birthday: response.data.birthday ? moment(response.data.birthday, DATE_FORMAT) : moment('01/01/2000', DATE_FORMAT)
      });
    }).catch(err => {
      notification["error"]({
        message: "Lấy nhân viên không thành công",
      });
    });
  }, []);
  const onFinish = (values) => {
    setLoading(true);
    API.register({ username: values.username, password: values.password }).then((response) => {
      notification["success"]({
        message: "Sửa nhân viên thành công",
      });
      setLoading(false);
      history.push('/admin/list-employee');
    }).then((error) => {
      setLoading(false);
      notification["error"]({
        message: "Sửa nhân viên không thành công",
      });
    });
  };

  return (
    <div>
      <h1 className='text-3xl'>Chỉnh sửa nhân viên</h1>
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
          <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
            Chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEmployee;