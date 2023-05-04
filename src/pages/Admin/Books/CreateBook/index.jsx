import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, notification } from 'antd';
const { Option } = Select;
import './style.scss';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { DATE_FORMAT, CATEGORY } from "../../../../utils/constant";
import moment from 'moment';
import { API } from '../../../../configs';
import { useHistory } from 'react-router-dom';

const CreateBook = () => {
  useDocumentTitle("Thêm sách");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [listAuthor, setListAuthor] = useState([]);
  const history = useHistory();
  useEffect(() => {
    API.getAllAuthor().then(response => {
      setListAuthor(response.data);
    });
  }, []);
  const handleSubmit = (values) => {
    const newData = {
      title: values.title,
      description: values.description,
      price: values.price,
      numberPage: values.numberPage,
      releaseDate: moment(values.releaseDate).format("YYYY-MM-DD"),
      category: values.category,
      initialQuantity: values.initialQuantity
    };
    setLoading(true);
    API.createNewBook(values.author, newData).then(response => {
      notification["success"]({
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
      <h1 className='text-3xl'>Thêm sách mới</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Tiêu đề' />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input.TextArea className='w-full' placeholder='Mô tả' />
        </Form.Item>

        <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='giá tiền' />
        </Form.Item>

        <Form.Item name="author" label="Tác giả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Select className='w-full' placeholder='Tác giả'>
            {listAuthor.map((value, index) => (<Option value={value.id} key={index}>{value.fullName}</Option>)
            )}
          </Select>
        </Form.Item>

        <Form.Item name="numberPage" label="Số lượng trang" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Số lượng trang' />
        </Form.Item>

        <Form.Item name="category" label="Thể loại" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Select placeholder="Thể loại">
            <Option value={CATEGORY.ccpl.value}>{CATEGORY.ccpl.title}</Option>
            <Option value={CATEGORY.khcn.value}>{CATEGORY.khcn.title}</Option>
            <Option value={CATEGORY.vhnt.value}>{CATEGORY.vhnt.title}</Option>
            <Option value={CATEGORY.vhxh.value}>{CATEGORY.vhxh.title}</Option>
            <Option value={CATEGORY.gt.value}>{CATEGORY.gt.title}</Option>
            <Option value={CATEGORY.ttt.value}>{CATEGORY.ttt.title}</Option>
            <Option value={CATEGORY.tttltg.value}>{CATEGORY.tttltg.title}</Option>
            <Option value={CATEGORY.stn.value}>{CATEGORY.stn.title}</Option>
          </Select>
        </Form.Item>

        <Form.Item name="releaseDate" label="Ngày phát hành" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <DatePicker placeholder='Ngày phát hành' format={DATE_FORMAT} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="initialQuantity" label="Số lượng nhập" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Số lượng nhập' />
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

export default CreateBook;