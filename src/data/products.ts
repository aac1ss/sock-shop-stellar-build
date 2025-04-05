
import { Product, Category } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Cozy Winter Socks",
    price: 12.99,
    description: "Super soft and warm socks perfect for cold winter days. Made with premium cotton and wool blend.",
    category: "winter",
    imageUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: true,
    inventory: 100,
    inStock: true,
    colors: ["red", "blue", "gray"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "2",
    name: "Athletic Performance Socks",
    price: 9.99,
    description: "Breathable and moisture-wicking socks designed for high-intensity workouts and sports activities.",
    category: "sports",
    imageUrl: "https://images.unsplash.com/photo-1583342138304-8bb18712a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1583342138304-8bb18712a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: true,
    inventory: 85,
    inStock: true,
    colors: ["white", "black", "blue"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "3",
    name: "Funky Pattern Socks",
    price: 7.99,
    description: "Add some fun to your outfit with these uniquely patterned socks featuring bright colors and fun designs.",
    category: "casual",
    imageUrl: "https://images.unsplash.com/photo-1589526261866-ab0d34f8e25f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1589526261866-ab0d34f8e25f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: false,
    inventory: 120,
    inStock: true,
    colors: ["multi"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "4",
    name: "Business Formal Socks",
    price: 14.99,
    description: "Elegant and comfortable socks perfect for business attire and formal occasions.",
    category: "formal",
    imageUrl: "https://images.unsplash.com/photo-1614093326149-3bdeae0af1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1614093326149-3bdeae0af1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: true,
    inventory: 75,
    inStock: true,
    colors: ["black", "navy", "gray"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "5",
    name: "No-Show Ankle Socks",
    price: 6.99,
    description: "Low-cut socks that stay hidden inside your shoes while providing comfort and support.",
    category: "casual",
    imageUrl: "https://images.unsplash.com/photo-1563000215-e31a8ddcb2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1563000215-e31a8ddcb2d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: false,
    inventory: 90,
    inStock: true,
    colors: ["white", "black", "beige"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "6",
    name: "Fuzzy Sleep Socks",
    price: 11.99,
    description: "Ultra-soft and cozy socks perfect for lounging and sleeping. Keeps your feet warm throughout the night.",
    category: "sleep",
    imageUrl: "https://images.unsplash.com/photo-1608461864721-b8f50c91c147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1608461864721-b8f50c91c147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"],
    featured: false,
    inventory: 50,
    inStock: true,
    colors: ["pink", "blue", "purple"],
    sizes: ["S", "M", "L"]
  }
];

export const categories: Category[] = [
  {
    id: "winter",
    name: "Winter Collection",
    description: "Keep warm with our premium winter socks",
    imageUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sports",
    name: "Athletic & Sports",
    description: "Performance socks for active lifestyles",
    imageUrl: "https://images.unsplash.com/photo-1583342138304-8bb18712a68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "casual",
    name: "Everyday Casual",
    description: "Comfortable socks for daily wear",
    imageUrl: "https://images.unsplash.com/photo-1589526261866-ab0d34f8e25f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "formal",
    name: "Business & Formal",
    description: "Elegant socks for professional settings",
    imageUrl: "https://images.unsplash.com/photo-1614093326149-3bdeae0af1eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sleep",
    name: "Sleep & Lounge",
    description: "Cozy socks for ultimate relaxation",
    imageUrl: "https://images.unsplash.com/photo-1608461864721-b8f50c91c147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
  }
];
