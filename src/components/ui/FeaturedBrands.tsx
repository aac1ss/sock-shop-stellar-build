
import React from 'react';
import { Brand } from '@/types';
import { brands } from '@/data/brands';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FeaturedBrands = () => {
  const navigate = useNavigate();
  const featuredBrands = brands.filter(brand => brand.featured);
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partner Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with top sock brands to bring you the best quality and design.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {featuredBrands.map((brand) => (
            <motion.div
              key={brand.id}
              className="cursor-pointer"
              onClick={() => navigate(`/products?brand=${brand.id}`)}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-center h-28 w-40">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
              <p className="text-center mt-2 text-sm">{brand.name}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/brands')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md transition-colors"
          >
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
