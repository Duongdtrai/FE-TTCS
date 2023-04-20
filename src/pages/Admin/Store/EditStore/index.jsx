import React from 'react';
import { useParams } from 'react-router-dom';
const EditStore = () => {
  const {storeId} = useParams();
  return (
    <div>EditStore</div>
  );
};

export default EditStore;