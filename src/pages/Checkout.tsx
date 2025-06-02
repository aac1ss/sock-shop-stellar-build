
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ordersAPI, paymentAPI } from '@/services/api';
import { CreditCard, Truck, MapPin } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('ESEWA');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nepal'
  });

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all shipping address fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Create order
      const orderResponse = await ordersAPI.create({
        street: shippingAddress.street,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country
      });

      const order = orderResponse.data;

      // Initiate payment
      const paymentResponse = await paymentAPI.initiate({
        orderId: order.id,
        amount: getCartTotal(),
        paymentMethod: paymentMethod,
        returnUrl: `${window.location.origin}/payment/success`,
        failureUrl: `${window.location.origin}/payment/failure`
      });

      if (paymentMethod === 'ESEWA' && paymentResponse.data.paymentUrl) {
        // Redirect to eSewa
        window.location.href = paymentResponse.data.paymentUrl;
      } else if (paymentMethod === 'CASH_ON_DELIVERY') {
        // Clear cart and redirect to success page
        await clearCart();
        toast({
          title: "Order Placed",
          description: "Your order has been placed successfully!",
        });
        navigate('/customer/orders');
      }
    } catch (error: any) {
      console.error('Checkout failed:', error);
      toast({
        title: "Checkout Failed",
        description: error.response?.data?.message || "Failed to place order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cartTotal = getCartTotal();
  const shippingCost = 100; // Fixed shipping cost
  const totalAmount = cartTotal + shippingCost;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={shippingAddress.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                placeholder="Enter your street address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  placeholder="State"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="ESEWA" id="esewa" />
                <Label htmlFor="esewa" className="flex items-center cursor-pointer">
                  <img src="/esewa-logo.png" alt="eSewa" className="w-8 h-8 mr-2" />
                  eSewa Digital Wallet
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="CASH_ON_DELIVERY" id="cod" />
                <Label htmlFor="cod" className="flex items-center cursor-pointer">
                  <Truck className="w-5 h-5 mr-2" />
                  Cash on Delivery
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cart.map((item: any) => (
              <div key={`${item.productId}-${item.color}-${item.size}`} className="flex justify-between">
                <span>{item.productName} ({item.color}, {item.size}) × {item.quantity}</span>
                <span>Rs. {((item.price || 0) * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>Rs. {cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>Rs. {shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Rs. {totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handlePlaceOrder} 
            className="w-full mt-6" 
            disabled={loading}
          >
            {loading ? 'Processing...' : `Place Order - Rs. ${totalAmount.toFixed(2)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
