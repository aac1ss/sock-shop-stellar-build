
import React, { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [showFilters, setShowFilters] = useState(false);

  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  const applyFilters = () => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setFilteredProducts(products);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Apply filters when dependencies change
  React.useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">All Products</h1>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div 
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white p-4 rounded-lg shadow md:sticky md:top-20 h-fit`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Filters</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-xs"
            >
              Reset
            </Button>
          </div>
          
          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label 
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider 
              min={minPrice}
              max={maxPrice}
              step={0.5}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-4"
            />
            <div className="flex justify-between text-sm">
              <span>${priceRange[0].toFixed(2)}</span>
              <span>${priceRange[1].toFixed(2)}</span>
            </div>
          </div>
          
          {/* Apply Button for Mobile */}
          <div className="md:hidden mt-4">
            <Button onClick={() => setShowFilters(false)} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
              <Button 
                onClick={resetFilters} 
                className="mt-4"
                variant="outline"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  {selectedCategories.length > 0 && (
                    <div className="flex items-center gap-1 bg-neutral px-2 py-1 rounded-full text-xs">
                      <span>Categories: {selectedCategories.length}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4"
                        onClick={() => setSelectedCategories([])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
                    <div className="flex items-center gap-1 bg-neutral px-2 py-1 rounded-full text-xs">
                      <span>Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4"
                        onClick={() => setPriceRange([minPrice, maxPrice])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
