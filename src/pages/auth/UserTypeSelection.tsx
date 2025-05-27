
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelect = (userType: 'buyer' | 'seller') => {
    navigate('/register', { state: { userType } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardHeader>
          <div className="flex justify-center mb-6">
            <img 
              src="/images/logo/logo.png" 
              alt="The Socks Box" 
              className="h-10" 
            />
          </div>
          <CardTitle className="text-2xl text-center">Join The Socks Box</CardTitle>
          <CardDescription className="text-center">
            Choose how you want to use our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary"
            onClick={() => handleUserTypeSelect('buyer')}
          >
            <User className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">I'm a Buyer</p>
              <p className="text-sm text-muted-foreground">Shop for amazing socks</p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-20 flex flex-col gap-2 hover:bg-primary/5 hover:border-primary"
            onClick={() => handleUserTypeSelect('seller')}
          >
            <Store className="h-8 w-8 text-primary" />
            <div className="text-center">
              <p className="font-medium">I'm a Seller</p>
              <p className="text-sm text-muted-foreground">Sell my sock products</p>
            </div>
          </Button>

          <div className="pt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTypeSelection;
