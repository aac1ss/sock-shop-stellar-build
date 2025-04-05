
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, 1, product.colors[0], product.sizes[1]);
  };

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'col-span-full md:col-span-2' : ''
      }`}
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className={`relative ${featured ? 'aspect-[21/9] md:aspect-[16/9]' : 'aspect-square'}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.featured && !featured && (
            <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg text-primary">
              {product.name}
            </h3>
            <p className="text-accent font-semibold">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            {featured ? product.description : product.description.substring(0, 60) + '...'}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {featured ? 'Add to Cart' : ''}
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
