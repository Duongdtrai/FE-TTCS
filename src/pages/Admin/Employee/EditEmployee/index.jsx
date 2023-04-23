import React from 'react';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";

const EditEmployee = () => {
  useDocumentTitle('Edit employee');
  return (
    <div>
      <h1 className='text-3xl'>
        EditEmployee
      </h1>
    </div>
  );
};

export default EditEmployee;