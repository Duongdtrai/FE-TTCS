import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button } from 'antd';
import UploadImage from '../../../../components/UploadImage';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { DATE_FORMAT } from "../../../../utils/constant";
import { API } from '../../../../configs';
import moment from 'moment';
const { Option } = Select;
const CreateAuthor = () => {
  useDocumentTitle("Thêm tác giả");
  const [file, setFile] = useState();
  useEffect(() => {
    API.getAllAuthor().then(response => {
      console.log("response", response.data);
    });
  }, []);
  const handleSubmit = (values) => {
    const dataAuthor = {
      fullName: values.fullName,
      description: values.description,
      birthday: moment(values.birthday).format(DATE_FORMAT),
      address: values.address,
      gender: values.gender,
      age: values.age,
    };
    API.createNewBook(dataAuthor).then((response) => {
      console.log("response", response);
    });
    // const formData = new FormData();
    // const emptyBlob = new Blob([""], { type: "text/plain" });
    // if (file && file?.name) {
    //   formData.append("file", file, file.name);
    // } else {
    //   formData.append("file", emptyBlob, "");
    // }
    //  API.uploadAvatarPerson(newPerson?.data.data.id, formData);
  };
  const uploadFile = async (fileUpload) => {
    setFile(fileUpload);
    
  };
  return (
    <div>
      <h1 className='text-3xl'>Thêm tác giả mới</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="bookImage" label="Ảnh">
          <UploadImage uploadFile={uploadFile} />
        </Form.Item>
        <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Họ và tên' />
        </Form.Item>
        <Form.Item name="author" label="Giới tính" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Select className='w-full' placeholder='Giới tính'>
            <Option value='Male'>Nam</Option>
            <Option value='Female'>Nữ</Option>
            <Option value='Other'>Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item name="age" label="Tuổi" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Tuổi' />
        </Form.Item>
        <Form.Item name="birthday" label="Ngày sinh" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <DatePicker placeholder='Ngày sinh' format={DATE_FORMAT} />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Địa chỉ' />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input.TextArea className='w-full' placeholder='Mô tả' />
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

export default CreateAuthor;