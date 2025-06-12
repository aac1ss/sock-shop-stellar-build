
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    // Get order details from navigation state
    const state = location.state as { orderId?: string; orderNumber?: string } | null;
    if (state) {
      setOrderDetails(state);
    }
  }, [location.state]);

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          
          {orderDetails && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Order ID:</strong> {orderDetails.orderId}
              </p>
              {orderDetails.orderNumber && (
                <p className="text-sm">
                  <strong>Order Number:</strong> {orderDetails.orderNumber}
                </p>
              )}
            </div>
          )}
          
          <p className="text-sm text-muted-foreground">
            You will receive a confirmation email with your order details and tracking information.
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/customer/order-history')} 
              className="w-full"
            >
              View Order History
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
