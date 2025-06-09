
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const step2Schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Please enter your address' }),
  city: z.string().min(2, { message: 'Please enter your city' }),
  state: z.string().min(2, { message: 'Please enter your state' }),
  zipCode: z.string().min(5, { message: 'Please enter a valid zip code' }),
});

export type Step2Data = z.infer<typeof step2Schema>;

interface RegistrationStep2Props {
  onSubmit: (data: Step2Data) => void;
  onBack: () => void;
  isLoading: boolean;
}

const RegistrationStep2: React.FC<RegistrationStep2Props> = ({ onSubmit, onBack, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
        <p className="text-muted-foreground mt-2">Tell us more about yourself</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="123 Main St"
            {...register('address')}
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              placeholder="New York"
              {...register('city')}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              type="text"
              placeholder="NY"
              {...register('state')}
            />
            {errors.state && (
              <p className="text-sm text-destructive">{errors.state.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <Input
            id="zipCode"
            type="text"
            placeholder="10001"
            {...register('zipCode')}
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive">{errors.zipCode.message}</p>
          )}
        </div>
        
        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Register'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegistrationStep2;
