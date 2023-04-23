import React from 'react';
import {useDocumentTitle} from "../../../../hooks/useDocumentTitle";
const EditBook = () => {
  useDocumentTitle("Edit Book");
  return (
    <div>
      <h1 className='text-3xl'>EditBooks</h1>
    </div>
  );
};

export default EditBook;