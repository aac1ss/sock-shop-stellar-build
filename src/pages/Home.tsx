
import React from 'react';
import HeroSection from '@/components/ui/HeroSection';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, TruckIcon, Zap, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = products.slice(0, 8);
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h6 className="text-primary font-medium mb-2">Categories</h6>
              <h2 className="text-3xl font-bold">Shop by Category</h2>
            </div>
            <Button variant="outline" asChild className="hidden md:flex mt-4 md:mt-0">
              <Link to="/categories" className="flex items-center">
                All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/categories" className="flex items-center">
                All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h6 className="text-primary font-medium mb-2">Featured Products</h6>
              <h2 className="text-3xl font-bold">Our Best Sellers</h2>
            </div>
            <Button variant="outline" asChild className="hidden md:flex mt-4 md:mt-0">
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Special Offer Banner */}
      <section className="py-16 bg-primary/5 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h6 className="text-primary font-medium mb-2">Special Offer</h6>
              <h2 className="text-3xl font-bold mb-4">Get 20% Off Your First Order</h2>
              <p className="text-muted-foreground mb-8 max-w-md">
                Sign up for our newsletter and get 20% off your first purchase. Don't miss out 
                on exclusive deals, new arrivals, and insider-only discounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="flex-shrink-0">
                  Subscribe Now
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1567303314286-6735a4ad9d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Special Offer"
                className="rounded-lg object-cover w-full aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h6 className="text-primary font-medium mb-2">Latest Products</h6>
              <h2 className="text-3xl font-bold">New Arrivals</h2>
            </div>
            <Button variant="outline" asChild className="hidden md:flex mt-4 md:mt-0">
              <Link to="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h6 className="text-primary font-medium mb-2">Our Benefits</h6>
            <h2 className="text-3xl font-bold">Why Choose The Socks Box</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4 text-primary">
                <Check className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                All our socks are made from high-quality materials for maximum comfort and durability.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4 text-primary">
                <TruckIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Fast Shipping</h3>
              <p className="text-muted-foreground">
                We ensure quick processing and delivery of your orders right to your doorstep.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4 text-primary">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">Secure Payment</h3>
              <p className="text-muted-foreground">
                Shop with confidence using our secure and protected payment methods.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors">
              <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4 text-primary">
                <LifeBuoy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-medium mb-3">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our customer service team is always ready to assist you with any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
