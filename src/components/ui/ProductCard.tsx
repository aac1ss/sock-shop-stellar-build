
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(Number(product.id), 1, product.colors[0], product.sizes[1]);
  };

  return (
    <div 
      className={`bg-background rounded-lg overflow-hidden border border-border transition-all duration-300 ${
        featured ? 'col-span-full md:col-span-2' : ''
      } ${isHovered ? 'shadow-lg' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className={`relative ${featured ? 'aspect-[21/9] md:aspect-[16/9]' : 'aspect-square'}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          {product.featured && !featured && (
            <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center backdrop-blur-sm">
              <span className="text-foreground font-medium px-4 py-2 bg-background/80 rounded-full">Out of Stock</span>
            </div>
          )}
          
          {/* Quick action buttons that appear on hover */}
          <div className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-background/80 hover:bg-background backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full bg-background/80 hover:bg-background backdrop-blur-sm"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-foreground">
                {product.name}
              </h3>
              <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
            </div>
            <p className="text-muted-foreground text-sm">
              {featured ? product.description : product.description.substring(0, 60) + '...'}
            </p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-1">
                {product.colors.slice(0, 4).map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <div className="w-4 h-4 rounded-full border border-border bg-background flex items-center justify-center text-xs">
                    +{product.colors.length - 4}
                  </div>
                )}
              </div>
              <Button
                variant="default"
                size="sm"
                className="rounded-full"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {featured || window.innerWidth > 768 ? 'Add to Cart' : ''}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
