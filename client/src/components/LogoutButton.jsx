import React from 'react';
import { useUserContext } from '../context/UserContext';

const LogoutButton = () => {
  const { logoutUser } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logoutUser();
  };

  return (
    <button className='inline-flex px-4 py-2 bg-[#31442C] text-[#D1B85E] rounded-lg' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
