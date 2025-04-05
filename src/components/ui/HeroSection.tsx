
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-neutral">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
              Step into Comfort and Style
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              Discover our premium collection of socks designed for comfort,
              durability, and style. From casual everyday wear to specialized athletic performance.
            </p>
            <div className="mt-8 space-x-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to="/products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
              alt="Colorful socks collection"
              className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
