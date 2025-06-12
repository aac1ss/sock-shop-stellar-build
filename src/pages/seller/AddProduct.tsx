
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inventory: '',
    categoryId: '',
    brandId: '',
    featured: false,
    images: [''],
    colors: [''],
    sizes: ['']
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, brandsRes] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('brands').select('*')
      ]);
      
      if (categoriesRes.error) throw categoriesRes.error;
      if (brandsRes.error) throw brandsRes.error;
      
      setCategories(categoriesRes.data || []);
      setBrands(brandsRes.data || []);
    } catch (error: any) {
      console.error('Failed to load data:', error);
      toast({
        title: "Error",
        description: "Failed to load categories and brands",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          inventory: parseInt(formData.inventory),
          stock_quantity: parseInt(formData.inventory),
          category_id: parseInt(formData.categoryId),
          brand_id: parseInt(formData.brandId),
          featured: formData.featured,
          active: true,
          main_image: formData.images.filter(img => img.trim())[0] || null,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-')
        })
        .select()
        .single();

      if (productError) throw productError;

      // Insert images
      const validImages = formData.images.filter(img => img.trim());
      if (validImages.length > 0) {
        const imageInserts = validImages.map(imageUrl => ({
          product_id: product.id,
          image_url: imageUrl
        }));
        
        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imageInserts);
        
        if (imageError) console.error('Error inserting images:', imageError);
      }

      // Insert colors
      const validColors = formData.colors.filter(color => color.trim());
      if (validColors.length > 0) {
        const colorInserts = validColors.map(color => ({
          product_id: product.id,
          color: color
        }));
        
        const { error: colorError } = await supabase
          .from('product_colors')
          .insert(colorInserts);
        
        if (colorError) console.error('Error inserting colors:', colorError);
      }

      // Insert sizes
      const validSizes = formData.sizes.filter(size => size.trim());
      if (validSizes.length > 0) {
        const sizeInserts = validSizes.map(size => ({
          product_id: product.id,
          size: size
        }));
        
        const { error: sizeError } = await supabase
          .from('product_sizes')
          .insert(sizeInserts);
        
        if (sizeError) console.error('Error inserting sizes:', sizeError);
      }
      
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      
      navigate('/seller/dashboard');
    } catch (error: any) {
      console.error('Failed to create product:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addArrayField = (field: 'images' | 'colors' | 'sizes') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'images' | 'colors' | 'sizes', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'images' | 'colors' | 'sizes', index: number) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price (Rs.)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="inventory">Stock Quantity</Label>
                <Input
                  id="inventory"
                  type="number"
                  value={formData.inventory}
                  onChange={(e) => setFormData({...formData, inventory: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData({...formData, categoryId: value})}>
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
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Select value={formData.brandId} onValueChange={(value) => setFormData({...formData, brandId: value})}>
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
            </div>

            {/* Product Images */}
            <div>
              <Label>Product Images</Label>
              <div className="space-y-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => updateArrayField('images', index, e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeArrayField('images', index)}
                      disabled={formData.images.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('images')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>

            {/* Available Colors */}
            <div>
              <Label>Available Colors</Label>
              <div className="space-y-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Color (e.g., Red, Blue, Black)"
                      value={color}
                      onChange={(e) => updateArrayField('colors', index, e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeArrayField('colors', index)}
                      disabled={formData.colors.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('colors')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Color
                </Button>
              </div>
            </div>

            {/* Available Sizes */}
            <div>
              <Label>Available Sizes</Label>
              <div className="space-y-2">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Size (e.g., S, M, L, XL)"
                      value={size}
                      onChange={(e) => updateArrayField('sizes', index, e.target.value)}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeArrayField('sizes', index)}
                      disabled={formData.sizes.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayField('sizes')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              />
              <Label htmlFor="featured">Featured Product</Label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/seller/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
