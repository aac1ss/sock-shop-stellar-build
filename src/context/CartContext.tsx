
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number, color: string, size: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  
  // Load products once on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  // Sync with backend when authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated) {
        // Load from localStorage if not authenticated
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
        return;
      }
      
      setIsSyncing(true);
      try {
        const response = await axios.get('/cart');
        // Transform backend cart items to frontend format
        const cartItems = response.data.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          color: item.color || 'default',
          size: item.size || 'M'
        }));
        setCart(cartItems);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        // Fallback to localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } finally {
        setIsSyncing(false);
      }
    };
    
    fetchCart();
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const syncWithBackend = async (newCart: CartItem[]) => {
    if (!isAuthenticated) return;
    
    setIsSyncing(true);
    try {
      await axios.put('/cart', {
        items: newCart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        }))
      });
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
      toast({
        title: "Cart sync failed",
        description: "We couldn't update your cart on the server. Your changes are saved locally.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const addToCart = (productId: string, quantity: number, color: string, size: string) => {
    const existingItemIndex = cart.findIndex(
      item => item.productId === productId && item.color === color && item.size === size
    );

    let newCart: CartItem[];
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      newCart = [...cart, { productId, quantity, color, size }];
    }
    
    setCart(newCart);
    syncWithBackend(newCart);
    
    // Show notification
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product?.name || 'Product'} added to your cart`,
    });
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.productId !== productId);
    setCart(newCart);
    syncWithBackend(newCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCart(newCart);
    syncWithBackend(newCart);
  };

  const clearCart = () => {
    setCart([]);
    syncWithBackend([]);
    toast({
      title: "Cart cleared",
      description: "Your cart has been emptied.",
    });
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
