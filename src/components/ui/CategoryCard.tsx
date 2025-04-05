
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/categories/${category.id}`}
      className="group relative block overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-md"
    >
      <div className="aspect-square w-full">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{category.name}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center transform transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
