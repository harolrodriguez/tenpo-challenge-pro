import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '@/features/auth/store/auth.store';

const ProtectedRoute = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
