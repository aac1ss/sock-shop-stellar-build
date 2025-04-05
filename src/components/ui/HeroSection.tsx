
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="inline-block text-primary font-medium text-sm px-3 py-1 bg-primary/10 rounded-full">
              New Collection 2023
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Discover Stylish<br />
              <span className="text-primary">Premium</span> Socks
            </h1>
            <p className="text-muted-foreground max-w-md">
              Elevate your style with our premium collection of socks designed for comfort, 
              durability, and contemporary fashion. Discover the perfect pair for every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/products">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/categories" className="flex items-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
            <img
              src="https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
              alt="Colorful socks collection"
              className="rounded-lg shadow-xl w-full h-auto object-cover aspect-[4/3] relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
