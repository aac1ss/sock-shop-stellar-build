
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
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
        return convertToDto(product);
    }

    public ProductDto createProduct(ProductDto productDto) {
        Product product = new Product();
        updateProductFromDto(product, productDto);
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
        updateProductFromDto(product, productDto);
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }

    private void updateProductFromDto(Product product, ProductDto productDto) {
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setInventory(productDto.getInventory());
        product.setFeatured(productDto.getFeatured());
        product.setImages(productDto.getImages());
        product.setColors(productDto.getColors());
        product.setSizes(productDto.getSizes());

        // Set category
        if (productDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(productDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + productDto.getCategoryId()));
            product.setCategory(category);
        }

        // Set brand
        if (productDto.getBrandId() != null) {
            Brand brand = brandRepository.findById(productDto.getBrandId())
                    .orElseThrow(() -> new ResourceNotFoundException("Brand not found with id " + productDto.getBrandId()));
            product.setBrand(brand);
        }
    }

    private ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setInventory(product.getInventory());
        productDto.setFeatured(product.getFeatured());
        productDto.setImages(product.getImages());
        productDto.setColors(product.getColors());
        productDto.setSizes(product.getSizes());
        productDto.setInStock(product.getInStock());
        
        if (product.getCategory() != null) {
            productDto.setCategoryId(product.getCategory().getId());
            productDto.setCategoryName(product.getCategory().getName());
        }
        
        if (product.getBrand() != null) {
            productDto.setBrandId(product.getBrand().getId());
            productDto.setBrandName(product.getBrand().getName());
        }
        
        if (!product.getImages().isEmpty()) {
            productDto.setImageUrl(product.getImages().get(0));
        }
        
        return productDto;
    }
}
