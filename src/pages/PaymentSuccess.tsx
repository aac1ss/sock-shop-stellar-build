
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package } from 'lucide-react';
import { paymentAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const oid = searchParams.get('oid');
      const refId = searchParams.get('refId');
      const amt = searchParams.get('amt');

      if (oid && refId && amt) {
        try {
          const response = await paymentAPI.verify({ oid, refId, amt });
          if (response.data.status === 'SUCCESS') {
            setVerified(true);
            toast({
              title: "Payment Successful",
              description: "Your payment has been verified and order confirmed!",
            });
          } else {
            toast({
              title: "Payment Verification Failed",
              description: "There was an issue verifying your payment.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          toast({
            title: "Verification Error",
            description: "Failed to verify payment.",
            variant: "destructive",
          });
        }
      }
      setVerifying(false);
    };

    verifyPayment();
  }, [searchParams, toast]);

  if (verifying) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Verifying your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {verified ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <Package className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {verified ? 'Payment Successful!' : 'Payment Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {verified 
              ? 'Your order has been confirmed and will be processed soon.'
              : 'There was an issue with your payment. Please try again.'
            }
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/customer/orders')} 
              className="w-full"
            >
              View Orders
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
