
import React from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/ui/CartItem';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flow-root">
                <ul className="-my-6">
                  {cart.map((item) => (
                    <li key={`${item.productId}-${item.color}-${item.size}`} className="py-2">
                      <CartItem item={item} />
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold text-accent">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 flex items-center justify-center">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="mt-4 text-xs text-gray-500 text-center">
                Shipping, taxes, and discounts calculated at checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
