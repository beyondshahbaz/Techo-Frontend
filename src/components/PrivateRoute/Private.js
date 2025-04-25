import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

export const ProtectedRoute = ({ children = null, roles = null }) => {
  const { userLoggedIN } = useContext(AuthContext);
  const accessToken = localStorage.getItem('accessToken') || '';
  const userRole = localStorage.getItem('role') || '';

  // Debugging
  console.log('Auth Check:', { userLoggedIN, accessToken, userRole });

  if (userRole === "ADMIN") {
    return children ? children : <Outlet />; // Always allow ADMIN
  }

  if (!userLoggedIN || !accessToken) {
    return <Navigate to="/login-3" replace />;
  }

  return children ? children : <Outlet />;
};