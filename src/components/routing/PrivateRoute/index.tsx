import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({hasSession}: {hasSession: boolean}) => {
    return hasSession ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;