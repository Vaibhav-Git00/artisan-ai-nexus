import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface RoleBasedRouteProps {
  allowedRoles: ('artisan' | 'buyer' | 'admin')[];
  redirectPath?: string;
}

const RoleBasedRoute = ({ 
  allowedRoles, 
  redirectPath = '/login' 
}: RoleBasedRouteProps) => {
  const { isLoggedIn, user } = useAuth();

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  // If logged in but not in allowed roles, redirect to dashboard
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'artisan') {
      return <Navigate to="/artisan-dashboard" replace />;
    } else if (user.role === 'buyer') {
      return <Navigate to="/buyer-dashboard" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    
    // Fallback to home if role is unknown
    return <Navigate to="/" replace />;
  }

  // If logged in and has allowed role, render the child routes
  return <Outlet />;
};

export default RoleBasedRoute;
