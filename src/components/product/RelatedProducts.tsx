
import React from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
