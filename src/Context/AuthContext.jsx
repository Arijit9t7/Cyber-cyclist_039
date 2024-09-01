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
        toast.success("Logged Out Successfully");
    };

    const adminLogin = () => {
        setAdmin(true);
        localStorage.setItem('admin', JSON.stringify(true));
        toast.success("Admin Logged In Successfully");
    };

    // Effect hook to update localStorage when `isLoggedIn` or `admin` state changes
    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem('admin', JSON.stringify(admin));
    }, [admin]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, adminLogin }}>
            {children}
        </AuthContext.Provider>
    );
};