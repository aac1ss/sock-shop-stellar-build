
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import RegistrationStep1, { Step1Data } from '@/components/auth/RegistrationStep1';
import RegistrationStep2, { Step2Data } from '@/components/auth/RegistrationStep2';
import RegistrationProgress from '@/components/auth/RegistrationProgress';

const Register = () => {
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  
  const userType = (location.state as any)?.userType || 'buyer';

  useEffect(() => {
    if (!location.state?.userType) {
      navigate('/user-type-selection');
    }
  }, [location.state, navigate]);

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = async (data: Step2Data) => {
    if (!step1Data) return;

    setIsLoading(true);
    try {
      await registerUser({
        ...step1Data,
        ...data,
        userType
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

  const handleBack = () => {
    setCurrentStep(1);
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
          <RegistrationProgress currentStep={currentStep} totalSteps={2} />
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 ? (
            <RegistrationStep1 onNext={handleStep1Submit} userType={userType} />
          ) : (
            <RegistrationStep2 
              onSubmit={handleStep2Submit} 
              onBack={handleBack}
              isLoading={isLoading}
            />
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
