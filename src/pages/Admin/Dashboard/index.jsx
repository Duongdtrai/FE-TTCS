import React from 'react';
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";

const Dashboard = () => {
  useDocumentTitle('Dashboard');
  return (
    <div>
      <h1 className='text-3xl'>Dashboard</h1>
    </div>
  );
};

export default Dashboard;