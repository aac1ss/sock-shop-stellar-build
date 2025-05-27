
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Building, Upload } from 'lucide-react';

const companySchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyDescription: z.string().min(10, 'Description must be at least 10 characters'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  businessRegistrationNumber: z.string().min(5, 'Registration number is required'),
  taxId: z.string().min(5, 'Tax ID is required'),
  businessAddress: z.string().min(10, 'Business address is required'),
  contactPhone: z.string().min(10, 'Contact phone is required'),
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanyFormData) => {
    setIsLoading(true);
    try {
      // TODO: Send company data to backend
      console.log('Company registration data:', data);
      
      toast({
        title: "Company registered successfully",
        description: "Welcome to The Socks Box seller platform!",
      });
      
      navigate('/seller/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Building className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Register Your Company</CardTitle>
            <CardDescription>
              Complete your seller profile to start selling on The Socks Box
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Your Company Ltd."
                    {...register('companyName')}
                  />
                  {errors.companyName && (
                    <p className="text-sm text-destructive">{errors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    {...register('website')}
                  />
                  {errors.website && (
                    <p className="text-sm text-destructive">{errors.website.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description *</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Tell us about your company and products..."
                  rows={4}
                  {...register('companyDescription')}
                />
                {errors.companyDescription && (
                  <p className="text-sm text-destructive">{errors.companyDescription.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessRegistrationNumber">Business Registration Number *</Label>
                  <Input
                    id="businessRegistrationNumber"
                    placeholder="REG123456789"
                    {...register('businessRegistrationNumber')}
                  />
                  {errors.businessRegistrationNumber && (
                    <p className="text-sm text-destructive">{errors.businessRegistrationNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID *</Label>
                  <Input
                    id="taxId"
                    placeholder="TAX987654321"
                    {...register('taxId')}
                  />
                  {errors.taxId && (
                    <p className="text-sm text-destructive">{errors.taxId.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address *</Label>
                <Textarea
                  id="businessAddress"
                  placeholder="Enter your complete business address..."
                  rows={3}
                  {...register('businessAddress')}
                />
                {errors.businessAddress && (
                  <p className="text-sm text-destructive">{errors.businessAddress.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  {...register('contactPhone')}
                />
                {errors.contactPhone && (
                  <p className="text-sm text-destructive">{errors.contactPhone.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Complete Registration'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegistration;
