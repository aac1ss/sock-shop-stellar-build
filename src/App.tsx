
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
import UserTypeSelection from "./pages/auth/UserTypeSelection";
import AuthDebug from "./components/AuthDebug";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/Products";
import ProductCreate from "./pages/admin/ProductCreate";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminBrands from "./pages/admin/Brands";

// Customer Dashboard Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import OrderHistory from "./pages/customer/OrderHistory";

// Seller Pages
import SellerDashboard from './pages/seller/SellerDashboard';
import CompanyRegistration from './pages/seller/CompanyRegistration';
import AddProduct from './pages/seller/AddProduct';

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
              <Route path="/user-type-selection" element={<UserTypeSelection />} />
              <Route path="/auth-debug" element={<Layout><AuthDebug /></Layout>} />
              
              {/* Payment Routes */}
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failure" element={<PaymentFailure />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <AdminDashboard />
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
              <Route path="/admin/products/create" element={
                <ProtectedRoute allowedRole="admin">
                  <AdminLayout>
                    <ProductCreate />
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
                <ProtectedRoute allowedRole="customer">
                  <Layout>
                    <CustomerDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/customer/orders" element={
                <ProtectedRoute allowedRole="customer">
                  <Layout>
                    <OrderHistory />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Seller Routes */}
              <Route path="/seller/company-registration" element={
                <ProtectedRoute allowedRole="seller">
                  <CompanyRegistration />
                </ProtectedRoute>
              } />
              <Route path="/seller/dashboard" element={
                <ProtectedRoute allowedRole="seller">
                  <Layout>
                    <SellerDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/seller/add-product" element={
                <ProtectedRoute allowedRole="seller">
                  <Layout>
                    <AddProduct />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Public Routes */}
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
              <Route path="/checkout" element={
                <ProtectedRoute allowedRole="customer">
                  <Layout>
                    <Checkout />
                  </Layout>
                </ProtectedRoute>
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
