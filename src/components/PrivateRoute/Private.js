import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext';
export const ProtectedRoute = ({children = null, roles=null}) => {
  const { userLoggedIN } = useContext(AuthContext);
  const accessToken = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('accessToken');


  if (!userLoggedIN || !accessToken) {
    return <Navigate to="/login-3" replace />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children ? children : <Outlet />;

}