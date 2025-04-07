
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="group cursor-pointer"
      onClick={() => navigate(`/products?brand=${brand.id}`)}
      whileHover={{ y: -5 }}
      transition={{ type: "tween" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="rounded-lg overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square p-6 flex items-center justify-center bg-white dark:bg-gray-800">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="max-h-32 max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{brand.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {brand.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCard;
