
import React, { useState, useEffect } from 'react';
import { Brand } from '@/types';
import { brands } from '@/data/brands';
import BrandCard from '@/components/ui/BrandCard';
import { motion } from 'framer-motion';

const Brands = () => {
  const [allBrands, setAllBrands] = useState<Brand[]>(brands);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Partners</h1>
        <p className="text-lg text-muted-foreground">
          Discover premium sock brands we collaborate with to bring you quality and style
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {allBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </motion.div>
    </div>
  );
};

export default Brands;
