
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  inStock: boolean;
  colors: string[];
  sizes: string[];
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
