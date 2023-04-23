import React from 'react';
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";

const ChangePassword = () => {
  useDocumentTitle('Change password');
  return (
    <div>
      <h1 className='text-3xl'>Change Password</h1>
    </div>
  );
};

export default ChangePassword;