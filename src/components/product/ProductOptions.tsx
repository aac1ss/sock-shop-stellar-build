
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ProductOptionsProps {
  colors?: string[];
  sizes?: string[];
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  inStock: boolean;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductOptions = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  quantity,
  inStock,
  setSelectedColor,
  setSelectedSize,
  setQuantity,
  onAddToCart
}: ProductOptionsProps) => {
  return (
    <div>
      {colors && colors.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Color</h3>
          <RadioGroup 
            value={selectedColor || colors[0]} 
            onValueChange={setSelectedColor}
            className="flex space-x-3"
          >
            {colors.map(color => (
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
      )}
      
      {sizes && sizes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Size</h3>
          <RadioGroup 
            value={selectedSize || sizes[1] || sizes[0]} 
            onValueChange={setSelectedSize}
            className="flex space-x-3"
          >
            {sizes.map(size => (
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
      )}

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

      <Button 
        className="w-full py-6 text-lg flex items-center justify-center"
        disabled={!inStock}
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductOptions;
