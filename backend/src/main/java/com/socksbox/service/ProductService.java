
package com.socksbox.service;

import com.socksbox.dto.ProductDto;
import com.socksbox.entity.Brand;
import com.socksbox.entity.Category;
import com.socksbox.entity.Product;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.BrandRepository;
import com.socksbox.repository.CategoryRepository;
import com.socksbox.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private BrandRepository brandRepository;

    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getFeaturedProducts() {
        return productRepository.findByFeatured(true).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByBrand(Long brandId) {
        return productRepository.findByBrandId(brandId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ProductDto> getProductsByFilters(Long categoryId, Long brandId, Double minPrice, Double maxPrice) {
        return productRepository.findByFilters(categoryId, brandId, minPrice, maxPrice).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToDto(product);
    }

    @Transactional
    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        
        // Set basic properties
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setInventory(productDto.getInventory());
        product.setFeatured(productDto.getFeatured());
        
        // Set category
        if (productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }
        
        // Set brand
        if (productDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDto.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
            product.setBrand(brand);
        }
        
        // Set collections
        if (productDto.getImages() != null) {
            product.setImages(productDto.getImages());
        }
        
        if (productDto.getColors() != null) {
            product.setColors(productDto.getColors());
        }
        
        if (productDto.getSizes() != null) {
            product.setSizes(productDto.getSizes());
        }
        
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        // Update basic properties
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setInventory(productDto.getInventory());
        product.setFeatured(productDto.getFeatured());
        
        // Update category
        if (productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }
        
        // Update brand
        if (productDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDto.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found"));
            product.setBrand(brand);
        }
        
        // Update collections
        if (productDto.getImages() != null) {
            product.setImages(productDto.getImages());
        }
        
        if (productDto.getColors() != null) {
            product.setColors(productDto.getColors());
        }
        
        if (productDto.getSizes() != null) {
            product.setSizes(productDto.getSizes());
        }
        
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setInventory(product.getInventory());
        productDto.setFeatured(product.getFeatured());
        
        // Set images and add the first image as imageUrl for backward compatibility
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            productDto.setImages(product.getImages());
            productDto.setImageUrl(product.getImages().get(0));
        }
        
        productDto.setColors(product.getColors());
        productDto.setSizes(product.getSizes());
        productDto.setInStock(product.getInStock());
        
        // Set category info
        if (product.getCategory() != null) {
            productDto.setCategoryId(product.getCategory().getId());
            productDto.setCategoryName(product.getCategory().getName());
        }
        
        // Set brand info
        if (product.getBrand() != null) {
            productDto.setBrandId(product.getBrand().getId());
            productDto.setBrandName(product.getBrand().getName());
        }
        
        return productDto;
    }
}
