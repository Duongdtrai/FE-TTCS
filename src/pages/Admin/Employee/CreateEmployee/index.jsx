import React from 'react';
import {useDocumentTitle} from "../../../../hooks/useDocumentTitle";
const CreateEmployee = () => {
  useDocumentTitle('Create employee');
  return (
    <div>
      <h1 className='text-3xl'>CreateEmployee</h1>
    </div>
  );
};

export default CreateEmployee;