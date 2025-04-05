
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inventory: number;
  featured: boolean;
  imageUrl: string; // Added for backward compatibility
  colors: string[]; // Added for color selection
  sizes: string[]; // Added for size selection
  inStock: boolean; // Added for stock status
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
