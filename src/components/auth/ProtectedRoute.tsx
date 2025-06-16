
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole?: 'admin' | 'customer' | 'seller' | undefined;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, profile, isLoading } = useAuth();
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'profile:', profile, 'allowedRole:', allowedRole);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // If no specific role is required, allow access
  if (!allowedRole) {
    return <>{children}</>;
  }
  
  // Check if user has the required role
  if (profile?.role !== allowedRole) {
    console.log('User role mismatch. Current role:', profile?.role, 'Required role:', allowedRole);
    
    // Redirect based on user's actual role
    if (profile?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (profile?.role === 'seller') {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (profile?.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else {
      // If no role is set, redirect to login
      return <Navigate to="/login" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
