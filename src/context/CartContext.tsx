
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cartAPI } from '@/services/supabaseApi';
import { useAuth } from './AuthContext';

interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  productName?: string;
  price?: number;
  imageUrl?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity: number, color: string, size: string) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Fetch cart from Supabase
  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsSyncing(true);
      const response = await cartAPI.get();
      setCart(response.data.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Don't show error toast for initial fetch failures
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated]);

  const addToCart = async (productId: number, quantity: number, color: string, size: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSyncing(true);
      const response = await cartAPI.addItem({
        productId,
        quantity,
        color,
        size
      });
      setCart(response.data.items || []);
      toast({
        title: "Added to cart",
        description: `${quantity} item(s) added to your cart`,
      });
    } catch (error: any) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Failed to add to cart",
        description: error.message || "There was an error adding the item to your cart.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!isAuthenticated) return;

    try {
      setIsSyncing(true);
      const response = await cartAPI.removeItem(itemId.toString());
      setCart(response.data.items || []);
      toast({
        title: "Item removed",
        description: "Item removed from your cart",
      });
    } catch (error: any) {
      console.error('Failed to remove from cart:', error);
      toast({
        title: "Failed to remove item",
        description: error.message || "There was an error removing the item.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!isAuthenticated) return;

    try {
      setIsSyncing(true);
      const response = await cartAPI.updateItem(itemId.toString(), quantity);
      setCart(response.data.items || []);
    } catch (error: any) {
      console.error('Failed to update quantity:', error);
      toast({
        title: "Failed to update quantity",
        description: error.message || "There was an error updating the quantity.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    try {
      setIsSyncing(true);
      await cartAPI.clear();
      setCart([]);
      toast({
        title: "Cart cleared",
        description: "Your cart has been emptied.",
      });
    } catch (error: any) {
      console.error('Failed to clear cart:', error);
      toast({
        title: "Failed to clear cart",
        description: error.message || "There was an error clearing your cart.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + ((item.price || 0) * item.quantity);
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
        isSyncing
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
