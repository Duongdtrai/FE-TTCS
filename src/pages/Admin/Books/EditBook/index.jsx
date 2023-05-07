import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, notification, Button } from 'antd';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";
import { useHistory, useParams } from 'react-router-dom';
import { API } from '../../../../configs';
import { DATE_FORMAT, CATEGORY } from "../../../../utils/constant";
import moment from 'moment';
import UploadImage from '../../../../components/UploadImage';

const { Option } = Select;

const EditBook = () => {
  useDocumentTitle("Sửa sách");
  const [form] = Form.useForm();
  const { bookId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [listAuthor, setListAuthor] = useState([]);
  const [image, setImage] = useState(null);
  useEffect(() => {
    API.getDetailBook(bookId).then(response => {
      const timestamp = response.data.releaseDate;
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const getFullDay = `${day}/${month}/${year}`;
      if (response.data.avatarBooks.length >= 1 && response.data.avatarBooks[0].avatar) {
        setImage(`http://54.251.21.44/api/v1/file/${response.data.avatarBooks[0].avatar}`);
      }
      form.setFieldsValue({
        author: response.data.author.id,
        category: response.data.category,
        description: response.data.description,
        initialQuantity: response.data.initialQuantity,
        numberPage: response.data.numberPage,
        price: response.data.price,
        title: response.data.title,
        releaseDate: moment(getFullDay, DATE_FORMAT)
      });
      API.getAllAuthor().then(response => {
        setListAuthor(response.data);
      });
    });
  }, []);
  const handleSubmit = (values) => {
    setLoading(true);
    const dataEdit = { ...values, releaseDate: moment(values.releaseDate).format(DATE_FORMAT) };
    API.updateBook(dataEdit, bookId, values.author).then(response => {
      notification["error"]({
        message: "Sửa sách thành công",
      });
      setLoading(false);
      history.push("/admin/list-book");
    }).catch(err => {
      setLoading(false);
      notification["error"]({
        message: "Sửa sách không thành công",
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
    await API.addImageBook(bookId, formData).then((response) => {
      notification["success"]({
        message: "Thêm ảnh thành công",
      });
    }).catch(err => {
      notification["error"]({
        message: "Thêm ảnh không thành công",
      });
    });
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
          <UploadImage uploadFile={uploadFile} image={image} />
        </Form.Item>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input className='w-full' placeholder='Tiêu đề' />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <Input.TextArea className='w-full' placeholder='Mô tả' />
        </Form.Item>

        <Form.Item name="price" label="Giá tiền" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Giá tiền' />
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
          <DatePicker
            placeholder='Ngày phát hành'
            format={DATE_FORMAT}
            style={{ width: "100%" }}
            value={moment("2023-04-17 08:07:09", DATE_FORMAT)}
          />
        </Form.Item>

        <Form.Item name="initialQuantity" label="Số lượng nhập" rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
          <InputNumber className='w-full' placeholder='Số lượng nhập' />
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