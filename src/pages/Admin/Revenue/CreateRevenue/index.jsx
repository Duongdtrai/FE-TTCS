import React from 'react';
import { useDocumentTitle } from "../../../../hooks/useDocumentTitle";

const ListCart = () => {
  useDocumentTitle('CreateRevenue');
  return (
    <div>
      <h1 className="text-3xl">ListCart</h1>
    </div>
  );
};

export default ListCart;