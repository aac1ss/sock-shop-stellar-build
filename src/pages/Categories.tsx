
import React, { useState, useEffect } from 'react';
import { Category } from '@/types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '@/data/products';

const Categories = () => {
  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  
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
        {allCategories.map((category) => (
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
