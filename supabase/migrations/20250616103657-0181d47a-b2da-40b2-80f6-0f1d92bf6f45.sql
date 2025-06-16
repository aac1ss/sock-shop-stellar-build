
-- Enable RLS on all tables that don't have it yet
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to product-related tables
CREATE POLICY "Allow public read access to brands" ON public.brands
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to categories" ON public.categories
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to products" ON public.products
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product_images" ON public.product_images
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product_colors" ON public.product_colors
FOR SELECT USING (true);

CREATE POLICY "Allow public read access to product_sizes" ON public.product_sizes
FOR SELECT USING (true);

-- Create a security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Admin policies for full access
CREATE POLICY "Admins can do everything on brands" ON public.brands
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on categories" ON public.categories
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on products" ON public.products
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on orders" ON public.orders
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on order_items" ON public.order_items
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on product_images" ON public.product_images
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on product_colors" ON public.product_colors
FOR ALL USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Admins can do everything on product_sizes" ON public.product_sizes
FOR ALL USING (public.get_current_user_role() = 'admin');

-- Seller policies for product management
CREATE POLICY "Sellers can manage products" ON public.products
FOR ALL USING (public.get_current_user_role() = 'seller');

CREATE POLICY "Sellers can manage product_images" ON public.product_images
FOR ALL USING (public.get_current_user_role() = 'seller');

CREATE POLICY "Sellers can manage product_colors" ON public.product_colors
FOR ALL USING (public.get_current_user_role() = 'seller');

CREATE POLICY "Sellers can manage product_sizes" ON public.product_sizes
FOR ALL USING (public.get_current_user_role() = 'seller');

CREATE POLICY "Sellers can view orders" ON public.orders
FOR SELECT USING (public.get_current_user_role() = 'seller');

CREATE POLICY "Sellers can view order_items" ON public.order_items
FOR SELECT USING (public.get_current_user_role() = 'seller');

-- Customer policies for orders and cart
CREATE POLICY "Customers can view their orders" ON public.orders
FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Customers can view their order_items" ON public.order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND auth.uid()::text = orders.user_id::text
  )
);

-- Cart policies
CREATE POLICY "Users can manage their own carts" ON public.carts
FOR ALL USING (auth.uid() = user_uuid);

CREATE POLICY "Users can manage their own cart_items" ON public.cart_items
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.carts 
    WHERE carts.id = cart_items.cart_id 
    AND auth.uid() = carts.user_uuid
  )
);

-- Update orders table to use UUID for user_id temporarily for demo
-- We'll create some sample orders linked to the current user
UPDATE public.orders SET user_id = 1 WHERE user_id IS NOT NULL;
