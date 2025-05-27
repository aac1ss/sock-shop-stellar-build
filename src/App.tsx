
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import { CartProvider } from "@/context/CartContext";
import SellerDashboard from '@/pages/seller/Dashboard';

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminBrands from "./pages/admin/Brands";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Customer Dashboard Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import OrderHistory from "./pages/customer/OrderHistory";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Toaster />
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminOrders />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminCustomers />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/analytics" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminAnalytics />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/brands" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminBrands />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              
              {/* Customer Dashboard Routes */}
              <Route path="/customer/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <CustomerDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/customer/orders" element={
                <ProtectedRoute>
                  <Layout>
                    <OrderHistory />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Seller Routes */}
              <Route 
                path="/seller/dashboard" 
                element={
                  <ProtectedRoute allowedRole="customer">
                    <Layout>
                      <SellerDashboard />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Customer Routes */}
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              <Route path="/products" element={
                <Layout>
                  <Products />
                </Layout>
              } />
              <Route path="/products/:id" element={
                <Layout>
                  <ProductDetail />
                </Layout>
              } />
              <Route path="/cart" element={
                <Layout>
                  <Cart />
                </Layout>
              } />
              <Route path="/categories" element={
                <Layout>
                  <Categories />
                </Layout>
              } />
              <Route path="/brands" element={
                <Layout>
                  <Brands />
                </Layout>
              } />
              <Route path="/about" element={
                <Layout>
                  <About />
                </Layout>
              } />
              <Route path="/contact" element={
                <Layout>
                  <Contact />
                </Layout>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={
                <Layout>
                  <NotFound />
                </Layout>
              } />
            </Routes>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
