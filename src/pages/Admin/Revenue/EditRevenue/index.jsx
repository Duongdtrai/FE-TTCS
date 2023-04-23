import React from 'react';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";

const EditRevenue = () => {
  useDocumentTitle('Edit revenue');
  return (
    <div>
      <h1 className='text-3xl'>EditRevenue</h1>
    </div>
  );
};

export default EditRevenue;