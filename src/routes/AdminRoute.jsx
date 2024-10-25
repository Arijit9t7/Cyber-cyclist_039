import React  from 'react';
import { useAuth } from '../Context/AuthContext';
import { Outlet } from 'react-router-dom';

export const AdminRoute = () => {
    const { adminLogin } = useAuth();

    return adminLogin ? <Outlet /> : <div>
        <h1>Access Denied</h1>
        <p>You are not authorized to view this page.</p>
    </div>
}