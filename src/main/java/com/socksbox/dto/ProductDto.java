
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer inventory;
    private Boolean featured = false;
    private List<String> images = new ArrayList<>();
    private List<String> colors = new ArrayList<>();
    private List<String> sizes = new ArrayList<>();
    private Boolean inStock;
    private Long categoryId;
    private String categoryName;
    private Long brandId;
    private String brandName;
    private String imageUrl;
}
