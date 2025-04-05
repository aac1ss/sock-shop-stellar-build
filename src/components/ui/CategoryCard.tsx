
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="group relative block overflow-hidden rounded-lg"
    >
      <div className="aspect-square w-full">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-xl font-bold">{category.name}</h3>
        <p className="text-sm text-gray-200">{category.description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
