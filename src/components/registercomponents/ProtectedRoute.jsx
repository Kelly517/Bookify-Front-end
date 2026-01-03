import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../assets/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role, isInitialized } = useAuth();

    if (!isInitialized) return null;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children;
}

export default ProtectedRoute
