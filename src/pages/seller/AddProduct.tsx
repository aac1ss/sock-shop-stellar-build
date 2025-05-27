
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { productsAPI, categoriesAPI, brandsAPI } from '@/services/api';
import { Upload, X } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  inventory: z.number().min(0, 'Inventory cannot be negative'),
  categoryId: z.string().min(1, 'Please select a category'),
  brandId: z.string().min(1, 'Please select a brand'),
  featured: z.boolean().default(false),
});

type ProductFormData = z.infer<typeof productSchema>;

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [images, setImages] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<string[]>(['']);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        categoriesAPI.getAll(),
        brandsAPI.getAll()
      ]);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories and brands",
        variant: "destructive",
      });
    }
  };

  const handleAddColor = () => {
    setColors([...colors, '']);
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleAddSize = () => {
    setSizes([...sizes, '']);
  };

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    try {
      const productData = {
        ...data,
        images: images.filter(img => img.trim() !== ''),
        colors: colors.filter(color => color.trim() !== ''),
        sizes: sizes.filter(size => size.trim() !== ''),
      };

      await productsAPI.create(productData);
      
      toast({
        title: "Product added successfully",
        description: "Your product is now available in the store!",
      });
      
      navigate('/seller/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Product</CardTitle>
            <CardDescription>
              Create a new product listing for your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Amazing Socks"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="19.99"
                    {...register('price', { valueAsNumber: true })}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product..."
                  rows={4}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category *</Label>
                  <Select onValueChange={(value) => setValue('categoryId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-sm text-destructive">{errors.categoryId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandId">Brand *</Label>
                  <Select onValueChange={(value) => setValue('brandId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand: any) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.brandId && (
                    <p className="text-sm text-destructive">{errors.brandId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inventory">Inventory *</Label>
                  <Input
                    id="inventory"
                    type="number"
                    placeholder="100"
                    {...register('inventory', { valueAsNumber: true })}
                  />
                  {errors.inventory && (
                    <p className="text-sm text-destructive">{errors.inventory.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Colors</Label>
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      placeholder="Color name"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveColor(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddColor}>
                  Add Color
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Sizes</Label>
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={size}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      placeholder="Size (S, M, L, XL)"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveSize(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddSize}>
                  Add Size
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  onCheckedChange={(checked) => setValue('featured', !!checked)}
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Product'}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/seller/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
