
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (requireAuth && !isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If the user is an admin, redirect to admin dashboard
  if (!isLoading && isAuthenticated && user?.role === 'admin' && window.location.pathname === '/') {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
