
import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat1",
      name: "Athletic Socks",
      description: "Designed for sports and high-intensity activities with moisture-wicking technology.",
      imageUrl: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "cat2",
      name: "Dress Socks",
      description: "Elegant and refined socks for formal occasions and business attire.",
      imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
    },
    {
      id: "cat3",
      name: "Casual Socks",
      description: "Comfortable everyday socks in various colors and patterns.",
      imageUrl: "https://images.unsplash.com/photo-1589902860314-e910697faea4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    },
    {
      id: "cat4",
      name: "Novelty Socks",
      description: "Fun and unique designs for expressing your personality.",
      imageUrl: "https://images.unsplash.com/photo-1616531770192-6eaea74c2815?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: "cat5",
      name: "Compression Socks",
      description: "Support socks that improve circulation and reduce fatigue.",
      imageUrl: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
    },
    {
      id: "cat6",
      name: "Winter Socks",
      description: "Warm and cozy socks for cold weather.",
      imageUrl: "https://images.unsplash.com/photo-1583086762675-5a88bcc12241?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
    }
  ]);
  
  const navigate = useNavigate();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection by category to find the perfect socks for every occasion
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="group cursor-pointer" 
            onClick={() => navigate(`/products?category=${category.id}`)}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ type: "tween" }}
          >
            <div className="overflow-hidden rounded-lg bg-card shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                <img 
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold text-center drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Categories;
