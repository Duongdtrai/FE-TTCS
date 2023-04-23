import React from 'react';
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";

const Profile = () => {
  useDocumentTitle('Profile');
  return (
    <div>
      <h1 className='text-3xl'>Profile</h1>
    </div>
  );
};

export default Profile;