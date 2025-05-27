
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    
    @NotBlank(message = "Product name is required")
    private String name;
    
    private String description;
    
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
    
    private Long categoryId;
    private String categoryName;
    
    private Long brandId;
    private String brandName;
    
    private Integer inventory = 0;
    
    private Boolean featured = false;
    
    private List<String> images = new ArrayList<>();
    private String imageUrl;
    
    private List<String> colors = new ArrayList<>();
    private List<String> sizes = new ArrayList<>();
    
    private Boolean inStock;
}
