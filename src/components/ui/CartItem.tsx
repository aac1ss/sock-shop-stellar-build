
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: {
    id?: number;
    productId: number;
    quantity: number;
    color: string;
    size: string;
    productName?: string;
    price?: number;
    imageUrl?: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (item.id && newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (item.id) {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.imageUrl || '/placeholder.svg'}
          alt={item.productName || 'Product'}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.productName}</h3>
            <p className="ml-4">${((item.price || 0) * item.quantity).toFixed(2)}</p>
          </div>
          <div className="flex mt-1">
            <p className="text-sm text-gray-500">Color: {item.color}</p>
            <p className="ml-4 text-sm text-gray-500">Size: {item.size}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-2">{item.quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-secondary hover:text-secondary/80"
              onClick={handleRemove}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
