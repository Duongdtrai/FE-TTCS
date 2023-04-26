import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory, useParams } from 'react-router-dom';
import { API } from '../../../../configs';
import { DATE_FORMAT } from "../../../../utils/constant";
import moment from 'moment';
import UploadImage from '../../../../components/UploadImage';

const EditBook = () => {
  useDocumentTitle("Sửa sách");
  const [form] = Form.useForm();
  const { bookId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [listAuthor, setListAuthor] = useState([]);
  useEffect(() => {
    API.getDetailBook(bookId).then(response => {
      form.setFieldsValue({
        ...response.data,
        birthday: response.data.birthday ? moment(response.data.releaseDate, DATE_FORMAT) : moment('01/01/2000', DATE_FORMAT)
      });
      API.getAllAuthor().then(response => {
        setListAuthor(response.data);
      });
    });
  }, []);
  const handleSubmit = (values) => {
    setLoading(true);
    API.createNewBook({ ...values, releaseDate: moment(values.releaseDate).format(DATE_FORMAT) }).then(response => {
      notification["error"]({
        message: "Thêm sách thành công",
      });
      setLoading(false);
      history.push("/admin/list-book");
    }).catch(err => {
      notification["error"]({
        message: "Thêm sách không thành công",
      });
    });
  };
  const uploadFile = async (fileUpload) => {
    setFile(fileUpload);
    const formData = new FormData();
    const emptyBlob = new Blob([""], { type: "text/plain" });
    if (file && file?.name) {
      formData.append("file", file, file.name);
    } else {
      formData.append("file", emptyBlob, "");
    }
    await API.uploadAvatarPerson(newPerson?.data.data.id, formData);
  };
  return (
    <div>
      <h1 className='text-3xl'>Sửa sách</h1>
      <Form
        onFinish={handleSubmit}
        layout="vertical"
        labelAlign="left"
        colon={false}
        form={form}>
        <Form.Item name="bookImage" label="Ảnh">
          <UploadImage uploadFile={uploadFile} />
        </Form.Item>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Tiêu đề' />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input.TextArea className='w-full' placeholder='Mô tả' />
        </Form.Item>

        <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='giá tiền' />
        </Form.Item>

        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Select className='w-full' placeholder='Tác giả'>
            {listAuthor.map((value, index) => (<Option value={value.id} key={index}>{value.fullName}</Option>)
            )}
          </Select>
        </Form.Item>

        <Form.Item name="numberPage" label="Số lượng trang" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Số lượng trang' />
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Số lượng trang' />
        </Form.Item>

        <Form.Item name="releaseDate" label="Ngày phát hành" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <DatePicker placeholder='Ngày phát hành' format={DATE_FORMAT} />
        </Form.Item>

        <Form.Item name="initialQuantity" label="Số lượng nhập" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Số lượng nhập' />
        </Form.Item>

        <Form.Item name="numberBorrow" label="Number of Borrowed Books" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-form-button" loading={loading}>
            Sửa
          </Button>
        </Form.Item>

      </Form>
    </div>

  );
};

export default EditBook;