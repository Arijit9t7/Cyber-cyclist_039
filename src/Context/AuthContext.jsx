import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn ? JSON.parse(savedIsLoggedIn) : false;
  });

  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('admin');
    return savedAdmin ? JSON.parse(savedAdmin) : false;
  });

  const [rerender, setRerender] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    toast.success("Logged In Successfully");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAdmin(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('admin');
    localStorage.removeItem('currloginuser');
    toast.success("Logged Out Successfully");
  };

  const adminLogin = () => {
    setAdmin(true);
    localStorage.setItem('admin', JSON.stringify(true));
    toast.success("Admin Logged In Successfully");
  };


  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('admin', JSON.stringify(admin));
  }, [admin]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, adminLogin, admin, rerender, setRerender }}>
      {children}
    </AuthContext.Provider>
  );
};