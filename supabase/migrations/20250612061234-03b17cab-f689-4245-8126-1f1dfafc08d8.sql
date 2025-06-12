
-- Create profiles table to store user information and roles
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'customer',
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Enable RLS on existing tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access to products, categories, and brands
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can view brands" 
  ON public.brands 
  FOR SELECT 
  USING (true);

-- Admin policies for product management
CREATE POLICY "Admins can manage products" 
  ON public.products 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage categories" 
  ON public.categories 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can manage brands" 
  ON public.brands 
  FOR ALL 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- First, let's update the cart table to use UUID for user_id
-- We'll need to add a new column and migrate data
ALTER TABLE public.carts ADD COLUMN user_uuid UUID;

-- We'll handle cart policies separately since we need to fix the data structure first
CREATE POLICY "Users can view their own cart" 
  ON public.carts 
  FOR SELECT 
  TO authenticated
  USING (user_uuid = auth.uid());

CREATE POLICY "Users can create their own cart" 
  ON public.carts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (user_uuid = auth.uid());

CREATE POLICY "Users can update their own cart" 
  ON public.carts 
  FOR UPDATE 
  TO authenticated
  USING (user_uuid = auth.uid());

CREATE POLICY "Users can delete their own cart" 
  ON public.carts 
  FOR DELETE 
  TO authenticated
  USING (user_uuid = auth.uid());

-- Cart items policies
CREATE POLICY "Users can manage their own cart items" 
  ON public.cart_items 
  FOR ALL 
  TO authenticated
  USING (
    cart_id IN (
      SELECT id FROM public.carts WHERE user_uuid = auth.uid()
    )
  );
