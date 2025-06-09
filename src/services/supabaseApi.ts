
import { supabase } from '@/integrations/supabase/client';

// Products API using Supabase
export const productsAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        brands (name),
        product_images (image_url),
        product_colors (color),
        product_sizes (size)
      `);
    
    if (error) throw error;
    return { data };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        brands (name),
        product_images (image_url),
        product_colors (color),
        product_sizes (size)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  },

  getFeatured: async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        brands (name),
        product_images (image_url),
        product_colors (color),
        product_sizes (size)
      `)
      .eq('featured', true);
    
    if (error) throw error;
    return { data };
  },

  getByCategory: async (categoryId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        brands (name),
        product_images (image_url),
        product_colors (color),
        product_sizes (size)
      `)
      .eq('category_id', categoryId);
    
    if (error) throw error;
    return { data };
  },

  getByBrand: async (brandId: string) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        brands (name),
        product_images (image_url),
        product_colors (color),
        product_sizes (size)
      `)
      .eq('brand_id', brandId);
    
    if (error) throw error;
    return { data };
  },

  create: async (product: any) => {
    // Insert product
    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        category_id: product.categoryId,
        brand_id: product.brandId,
        featured: product.featured,
        active: true,
        stock_quantity: product.inventory,
        main_image: product.images?.[0] || null,
        slug: product.name.toLowerCase().replace(/\s+/g, '-')
      })
      .select()
      .single();

    if (productError) throw productError;

    // Insert images
    if (product.images && product.images.length > 0) {
      const imageInserts = product.images.map((imageUrl: string) => ({
        product_id: productData.id,
        image_url: imageUrl
      }));
      
      const { error: imageError } = await supabase
        .from('product_images')
        .insert(imageInserts);
      
      if (imageError) console.error('Error inserting images:', imageError);
    }

    // Insert colors
    if (product.colors && product.colors.length > 0) {
      const colorInserts = product.colors.map((color: string) => ({
        product_id: productData.id,
        color: color
      }));
      
      const { error: colorError } = await supabase
        .from('product_colors')
        .insert(colorInserts);
      
      if (colorError) console.error('Error inserting colors:', colorError);
    }

    // Insert sizes
    if (product.sizes && product.sizes.length > 0) {
      const sizeInserts = product.sizes.map((size: string) => ({
        product_id: productData.id,
        size: size
      }));
      
      const { error: sizeError } = await supabase
        .from('product_sizes')
        .insert(sizeInserts);
      
      if (sizeError) console.error('Error inserting sizes:', sizeError);
    }

    return { data: productData };
  },

  update: async (id: string, product: any) => {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        inventory: product.inventory,
        category_id: product.categoryId,
        brand_id: product.brandId,
        featured: product.featured
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: null };
  }
};

// Orders API using Supabase
export const ordersAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name, main_image)
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name, main_image)
        )
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  },

  create: async (order: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  update: async (id: string, order: any) => {
    const { data, error } = await supabase
      .from('orders')
      .update(order)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: null };
  }
};

// Cart API using Supabase
export const cartAPI = {
  get: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!cart) {
      const { data: newCart, error: cartError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single();
      
      if (cartError) throw cartError;
      cart = newCart;
    }

    // Get cart items
    const { data: items, error: itemsError } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (
          id,
          name,
          price,
          main_image
        )
      `)
      .eq('cart_id', cart.id);

    if (itemsError) throw itemsError;

    return { 
      data: { 
        ...cart, 
        items: items.map(item => ({
          ...item,
          productName: item.products?.name,
          price: item.products?.price,
          imageUrl: item.products?.main_image
        }))
      } 
    };
  },

  addItem: async (item: any) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get or create cart
    let { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!cart) {
      const { data: newCart, error: cartError } = await supabase
        .from('carts')
        .insert({ user_id: user.id })
        .select()
        .single();
      
      if (cartError) throw cartError;
      cart = newCart;
    }

    // Get product price
    const { data: product } = await supabase
      .from('products')
      .select('price')
      .eq('id', item.productId)
      .single();

    // Check if item already exists
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', item.productId)
      .eq('color', item.color)
      .eq('size', item.size)
      .single();

    if (existingItem) {
      // Update quantity
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + item.quantity })
        .eq('id', existingItem.id);
      
      if (error) throw error;
    } else {
      // Add new item
      const { error } = await supabase
        .from('cart_items')
        .insert({
          cart_id: cart.id,
          product_id: item.productId,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          price: product?.price || 0
        });
      
      if (error) throw error;
    }

    // Return updated cart
    return cartAPI.get();
  },

  updateItem: async (itemId: string, quantity: number) => {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
    
    if (error) throw error;
    return cartAPI.get();
  },

  removeItem: async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
    
    if (error) throw error;
    return cartAPI.get();
  },

  clear: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: cart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (cart) {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);
      
      if (error) throw error;
    }

    return { data: { items: [] } };
  }
};

// Categories API using Supabase
export const categoriesAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');
    
    if (error) throw error;
    return { data };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  },

  create: async (category: any) => {
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        description: category.description,
        slug: category.name.toLowerCase().replace(/\s+/g, '-'),
        image_url: category.image_url
      })
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  update: async (id: string, category: any) => {
    const { data, error } = await supabase
      .from('categories')
      .update({
        name: category.name,
        description: category.description,
        image_url: category.image_url
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: null };
  }
};

// Brands API using Supabase
export const brandsAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('*');
    
    if (error) throw error;
    return { data };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return { data };
  },

  create: async (brand: any) => {
    const { data, error } = await supabase
      .from('brands')
      .insert({
        name: brand.name,
        description: brand.description,
        slug: brand.name.toLowerCase().replace(/\s+/g, '-'),
        logo: brand.logo,
        featured: brand.featured || false
      })
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  update: async (id: string, brand: any) => {
    const { data, error } = await supabase
      .from('brands')
      .update({
        name: brand.name,
        description: brand.description,
        logo: brand.logo,
        featured: brand.featured
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { data: null };
  }
};

// Admin API using Supabase
export const adminAPI = {
  getCustomers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'customer');
    
    if (error) throw error;
    return { data };
  },

  getAnalytics: async () => {
    // Basic analytics - you can expand this
    const { data: orders } = await supabase
      .from('orders')
      .select('*');
    
    const { data: products } = await supabase
      .from('products')
      .select('*');

    const { data: users } = await supabase
      .from('users')
      .select('*');

    return {
      data: {
        totalOrders: orders?.length || 0,
        totalProducts: products?.length || 0,
        totalUsers: users?.length || 0,
        totalRevenue: orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
      }
    };
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return { data };
  }
};
