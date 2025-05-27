import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, AlertCircle, Loader } from 'lucide-react';
import { productsAPI } from '@/services/api';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductOptions from '@/components/product/ProductOptions';
import RelatedProducts from '@/components/product/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await productsAPI.getById(id);
        setProduct(response.data);
        
        if (response.data.colors?.length > 0) {
          setSelectedColor(response.data.colors[0]);
        }
        if (response.data.sizes?.length > 0) {
          setSelectedSize(response.data.sizes[1] || response.data.sizes[0]);
        }
        
        const relatedResponse = await productsAPI.getByCategory(response.data.category);
        setRelatedProducts(
          relatedResponse.data
            .filter((p: Product) => p.id !== id)
            .slice(0, 4)
        );
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
        toast({
          title: "Error",
          description: "Could not load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id, toast]);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedColor && product.colors?.length) {
      setSelectedColor(product.colors[0]);
    }
    if (!selectedSize && product.sizes?.length) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
    }
    
    addToCart(
      Number(product.id),
      quantity,
      selectedColor || product.colors?.[0] || 'default',
      selectedSize || product.sizes?.[1] || product.sizes?.[0] || 'M'
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Loader className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-accent mb-4" />
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Return to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <ProductImageGallery imageUrl={product.imageUrl} productName={product.name} />

        <div>
          <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
          <p className="text-2xl font-semibold text-accent mt-2">${product.price.toFixed(2)}</p>
          
          <div className="my-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {!product.inStock && (
            <div className="mb-6 p-2 bg-red-50 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Currently out of stock
            </div>
          )}

          <ProductOptions
            colors={product.colors}
            sizes={product.sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            inStock={product.inStock}
            setSelectedColor={setSelectedColor}
            setSelectedSize={setSelectedSize}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductDetail;
