export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  inventory: number;
  featured: boolean;
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
