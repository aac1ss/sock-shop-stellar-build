
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const step1Schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type Step1Data = z.infer<typeof step1Schema>;

interface RegistrationStep1Props {
  onNext: (data: Step1Data) => void;
  userType: string;
}

const RegistrationStep1: React.FC<RegistrationStep1Props> = ({ onNext, userType }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
  });

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">
          Create {userType === 'seller' ? 'Seller' : 'Buyer'} Account
        </h2>
        <p className="text-muted-foreground mt-2">Enter your credentials</p>
      </div>
      
      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        <Button type="submit" className="w-full">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

export default RegistrationStep1;
