
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal'
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Create order in Supabase
      const orderData = {
        user_id: parseInt(user.id), // Convert UUID to number for now
        total_amount: total,
        status: 'pending',
        date: new Date().toISOString(),
        first_name: formData.firstName,
        last_name: formData.lastName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
        phone_number: formData.phone
      };

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.productName || 'Product',
        color: item.color,
        size: item.size,
        subtotal: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      
      navigate('/payment-success', { 
        state: { orderId: order.id, orderNumber: order.order_number }
      });

    } catch (error: any) {
      console.error('Order creation error:', error);
      toast({
        title: "Order failed",
        description: error.message || "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.color} - {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
