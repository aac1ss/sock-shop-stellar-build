
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const step1Schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const step2Schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Please enter your address' }),
  city: z.string().min(2, { message: 'Please enter your city' }),
  state: z.string().min(2, { message: 'Please enter your state' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid zip code' }),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const Register = () => {
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const onStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const onStep2Submit = async (data: Step2Data) => {
    if (!step1Data) return;

    setIsLoading(true);
    try {
      await registerUser({
        ...step1Data,
        ...data
      });
      navigate('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || "There was a problem creating your account",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
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
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
          <CardDescription className="text-center">
            {currentStep === 1 ? 'Enter your credentials' : 'Complete your profile'}
          </CardDescription>
          <div className="flex justify-center space-x-2 mt-4">
            <div className={`h-2 w-8 rounded ${currentStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`} />
            <div className={`h-2 w-8 rounded ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 1 ? (
            <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...step1Form.register('email')}
                />
                {step1Form.formState.errors.email && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...step1Form.register('password')}
                />
                {step1Form.formState.errors.password && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...step1Form.register('confirmPassword')}
                />
                {step1Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          ) : (
            <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...step2Form.register('name')}
                />
                {step2Form.formState.errors.name && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  {...step2Form.register('phone')}
                />
                {step2Form.formState.errors.phone && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St"
                  {...step2Form.register('address')}
                />
                {step2Form.formState.errors.address && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.address.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="New York"
                    {...step2Form.register('city')}
                  />
                  {step2Form.formState.errors.city && (
                    <p className="text-sm text-destructive">{step2Form.formState.errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    type="text"
                    placeholder="NY"
                    {...step2Form.register('state')}
                  />
                  {step2Form.formState.errors.state && (
                    <p className="text-sm text-destructive">{step2Form.formState.errors.state.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  placeholder="10001"
                  {...step2Form.register('zipCode')}
                />
                {step2Form.formState.errors.zipCode && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.zipCode.message}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Register'}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
