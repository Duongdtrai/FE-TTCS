import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Option } = Select;
import './style.scss';
import {useDocumentTitle} from "../../../../hooks/useDocumentTitle";
const CreateBook = () => {
  useDocumentTitle("Thêm sách");
  return (
    <div>
      <h1 className='text-3xl'>Thêm sách mới</h1>
      <Form layout="vertical">
        <Form.Item name="bookImage" label="Book Image">
          <Upload>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input className='w-full' />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea className='w-full'/>
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber className='w-full' />
        </Form.Item>

        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Select className='w-full'>
            <Option value={1}>Author 1</Option>
            <Option value={2}>Author 2</Option>
            <Option value={3}>Author 3</Option>
          </Select>
        </Form.Item>

        <Form.Item name="numberPage" label="Number of Pages" rules={[{ required: true }]}>
          <InputNumber className='w-full'/>
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input className='w-full'/>
        </Form.Item>

        <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="initialQuantity" label="Initial Quantity" rules={[{ required: true }]}>
          <InputNumber className='w-full'/>
        </Form.Item>

        <Form.Item name="numberBorrow" label="Number of Borrowed Books" rules={[{ required: true }]}>
          <InputNumber className='w-full'/>
        </Form.Item>
      </Form>
    </div>
   
  );
};

export default CreateBook;