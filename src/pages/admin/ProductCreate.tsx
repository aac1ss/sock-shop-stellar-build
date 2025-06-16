
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProductCreate = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    category_id: '',
    brand_id: '',
    featured: false,
    main_image: '',
    colors: '',
    sizes: '',
    images: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('name');

      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          inventory: parseInt(formData.inventory),
          stock_quantity: parseInt(formData.inventory),
          category_id: parseInt(formData.category_id),
          brand_id: parseInt(formData.brand_id),
          featured: formData.featured,
          active: true,
          main_image: formData.main_image,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-')
        })
        .select()
        .single();

      if (productError) throw productError;

      // Insert colors
      if (formData.colors) {
        const colors = formData.colors.split(',').map(c => c.trim()).filter(c => c);
        const colorInserts = colors.map(color => ({
          product_id: productData.id,
          color: color
        }));
        
        if (colorInserts.length > 0) {
          const { error: colorError } = await supabase
            .from('product_colors')
            .insert(colorInserts);
          
          if (colorError) console.error('Error inserting colors:', colorError);
        }
      }

      // Insert sizes
      if (formData.sizes) {
        const sizes = formData.sizes.split(',').map(s => s.trim()).filter(s => s);
        const sizeInserts = sizes.map(size => ({
          product_id: productData.id,
          size: size
        }));
        
        if (sizeInserts.length > 0) {
          const { error: sizeError } = await supabase
            .from('product_sizes')
            .insert(sizeInserts);
          
          if (sizeError) console.error('Error inserting sizes:', sizeError);
        }
      }

      // Insert additional images
      if (formData.images) {
        const images = formData.images.split(',').map(img => img.trim()).filter(img => img);
        const imageInserts = images.map(imageUrl => ({
          product_id: productData.id,
          image_url: imageUrl
        }));
        
        if (imageInserts.length > 0) {
          const { error: imageError } = await supabase
            .from('product_images')
            .insert(imageInserts);
          
          if (imageError) console.error('Error inserting images:', imageError);
        }
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      });

      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: "Error",
        description: "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
        <h1 className="text-3xl font-bold">Create Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price *</label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Inventory *</label>
                <Input
                  type="number"
                  value={formData.inventory}
                  onChange={(e) => handleInputChange('inventory', e.target.value)}
                  placeholder="0"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select onValueChange={(value) => handleInputChange('category_id', value)} required>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand *</label>
                <Select onValueChange={(value) => handleInputChange('brand_id', value)} required>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Main Image URL</label>
                <Input
                  value={formData.main_image}
                  onChange={(e) => handleInputChange('main_image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Colors (comma separated)</label>
                <Input
                  value={formData.colors}
                  onChange={(e) => handleInputChange('colors', e.target.value)}
                  placeholder="Black, White, Red, Blue"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sizes (comma separated)</label>
                <Input
                  value={formData.sizes}
                  onChange={(e) => handleInputChange('sizes', e.target.value)}
                  placeholder="S, M, L, XL"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Images (comma separated URLs)</label>
              <Textarea
                value={formData.images}
                onChange={(e) => handleInputChange('images', e.target.value)}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Product
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCreate;
