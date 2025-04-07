
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inventory: number;
  featured: boolean;
  imageUrl: string; // For backward compatibility
  colors: string[]; // For color selection
  sizes: string[]; // For size selection
  inStock: boolean; // For stock status
}

export interface CartItem {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Add user interface for better type checking
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
  image?: string;
}

// Add order interface for customer dashboard
export interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  imageUrl: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
