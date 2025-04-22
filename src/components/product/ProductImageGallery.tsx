
import React from 'react';

interface ProductImageGalleryProps {
  imageUrl: string;
  productName: string;
}

const ProductImageGallery = ({ imageUrl, productName }: ProductImageGalleryProps) => {
  return (
    <div className="rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={productName}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ProductImageGallery;
