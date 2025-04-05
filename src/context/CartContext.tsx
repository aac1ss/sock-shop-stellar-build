
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { products } from '../data/products';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (productId: string, quantity: number, color: string, size: string) => {
    const existingItemIndex = cart.findIndex(
      item => item.productId === productId && item.color === color && item.size === size
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Add new item
      setCart([...cart, { productId, quantity, color, size }]);
    }
    
    // Show notification
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
