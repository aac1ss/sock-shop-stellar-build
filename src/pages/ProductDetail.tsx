
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, AlertCircle } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  if (!product) {
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

  const handleAddToCart = () => {
    if (!selectedColor) setSelectedColor(product.colors[0]);
    if (!selectedSize) setSelectedSize(product.sizes[1]);
    
    addToCart(
      product.id,
      quantity,
      selectedColor || product.colors[0],
      selectedSize || product.sizes[1]
    );
  };

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
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
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

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Color</h3>
            <RadioGroup 
              value={selectedColor || product.colors[0]} 
              onValueChange={setSelectedColor}
              className="flex space-x-3"
            >
              {product.colors.map(color => (
                <div key={color} className="flex items-center space-x-2">
                  <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color}`}
                    className={`h-8 w-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color ? 'border-secondary' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Size</h3>
            <RadioGroup 
              value={selectedSize || product.sizes[1]} 
              onValueChange={setSelectedSize}
              className="flex space-x-3"
            >
              {product.sizes.map(size => (
                <div key={size}>
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`h-10 w-10 rounded-md flex items-center justify-center cursor-pointer border ${
                      selectedSize === size 
                        ? 'border-secondary bg-secondary/10 text-secondary' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="mx-4 w-8 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="w-full py-6 text-lg flex items-center justify-center"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
