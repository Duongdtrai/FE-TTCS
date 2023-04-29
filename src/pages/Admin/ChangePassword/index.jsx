import React from 'react';
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { Form, Input } from 'antd';

const ChangePassword = () => {
  useDocumentTitle('Change password');
  return (
    <div>
      <h1 className='text-3xl'>Change Password</h1>
      <Form>
        {/* 
        <Form.Item>
          <Input placeholder="Tên đăng nhập"/>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default ChangePassword;