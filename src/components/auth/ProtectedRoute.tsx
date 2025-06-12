
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole?: 'admin' | 'customer' | 'seller' | undefined;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { isAuthenticated, profile, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && profile?.role !== allowedRole) {
    // Redirect based on user role
    if (profile?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (profile?.role === 'seller') {
      return <Navigate to="/seller/dashboard" replace />;
    } else {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
