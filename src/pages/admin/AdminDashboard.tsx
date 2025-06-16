
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentOrders: [],
    recentProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch products count
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (productsError) throw productsError;

      // Fetch orders with items
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (name, main_image)
          )
        `)
        .order('date', { ascending: false })
        .limit(5);

      if (ordersError) throw ordersError;

      // Fetch all orders for revenue calculation
      const { data: allOrders, error: allOrdersError } = await supabase
        .from('orders')
        .select('total_amount');

      if (allOrdersError) throw allOrdersError;

      // Fetch customers (profiles)
      const { data: customers, error: customersError } = await supabase
        .from('profiles')
        .select('id', { count: 'exact' })
        .eq('role', 'customer');

      if (customersError) throw customersError;

      // Calculate total revenue
      const totalRevenue = allOrders?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0) || 0;

      setStats({
        totalProducts: products?.length || 0,
        totalOrders: allOrders?.length || 0,
        totalCustomers: customers?.length || 0,
        totalRevenue,
        recentOrders: orders || [],
        recentProducts: products || []
      });
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      fetchDashboardData();
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleCreateProduct = () => {
    navigate('/admin/products/create');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/admin/products')}>
            <Package className="h-4 w-4 mr-2" />
            Manage Products
          </Button>
          <Button onClick={() => navigate('/admin/orders')}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Manage Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Active products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 inline mr-1" />
              All time orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 inline mr-1" />
              All time revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Products</CardTitle>
          <Button onClick={handleCreateProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          {stats.recentProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No products yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentProducts.map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={product.main_image || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Rs. {Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={product.inventory > 0 ? "default" : "destructive"}>
                      {product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/admin/products/${product.id}/edit`)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{order.order_number || order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.first_name} {order.last_name} • {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center space-x-4">
                    <div>
                      <p className="font-medium">Rs. {Number(order.total_amount).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.order_items?.length || 0} items
                      </p>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {order.status || 'pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
