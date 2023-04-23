import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";

const EditStore = () => {
  useDocumentTitle('Edit store');
  const {storeId} = useParams();
  return (
    <div>EditStore</div>
  );
};

export default EditStore;