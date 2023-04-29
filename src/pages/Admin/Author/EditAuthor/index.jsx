import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, notification } from 'antd';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import moment from 'moment';
import UploadImage from '../../../../components/UploadImage';
import { DATE_FORMAT } from "../../../../utils/constant";
import { API } from '../../../../configs';
import { useHistory, useParams } from 'react-router-dom';
const { Option } = Select;


const EditEmployee = () => {
  useDocumentTitle('Chỉnh sửa thông tin tác giả');
  const history = useHistory();
  const { authorId } = useParams();
  const [authorInfor, setAuthorInfor] = useState({});
  const [loading, setLoading] = useState(false);
  const [image,setImage] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    API.getDetailAuthor(authorId).then((response) => {
      if (response.data.image){
        setImage(`http://54.251.21.44/api/v1/file/${response.data.avatarBooks[0].avatar}`);
      }
      setAuthorInfor(response.data);
      form.setFieldsValue({
        ...response.data,
        birthday: response.data.birthday ? moment(response.data.birthday, DATE_FORMAT) : moment('01/01/2000', DATE_FORMAT)
      });
    }).catch((error) => {
      notification["error"]({
        message: "Lấy thông tin tác giả không thành công",
      });
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
    setLoading(true);
    API.updateAuthor(authorId, dataAuthor).then((response) => {
      notification["success"]({
        message: "Sửa tác giả thành công",
      });
      setLoading(false);
      history.push("/admin/list-author");
    }).catch(error => {
      setLoading(false);
      notification["error"]({
        message: "Tạo nhân viên không thành công",
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
    await API.uploadAvatarAuthor(authorId, formData).then((response) => {
      notification["success"]({
        message: "Thêm ảnh tác giả thành công",
      });
    }).catch(error => {
      notification["error"]({
        message: "Tạo nhân viên không thành công",
      });}
    );
  };
  
  return (
    <div>
      <h1 className='text-3xl'>Chỉnh sửa tác giả</h1>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        labelAlign="left"
        colon={false}
        form={form}
      >
        <Form.Item name="bookImage" label="Ảnh">
          <UploadImage uploadFile={uploadFile} image={image}/>
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
          <DatePicker placeholder='Ngày sinh' format={DATE_FORMAT} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Địa chỉ' />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input.TextArea className='w-full' placeholder='Mô tả' />
        </Form.Item>
        
        
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
            Tạo mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditEmployee;