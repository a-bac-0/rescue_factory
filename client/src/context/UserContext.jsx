import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    sessionStorage.setItem("user", JSON.stringify(userData));
    //seleccionar el token y ponerlo
  };

  const logoutUser = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
