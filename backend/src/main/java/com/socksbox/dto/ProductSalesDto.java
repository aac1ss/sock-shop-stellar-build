
package com.socksbox.dto;

import lombok.Data;

@Data
public class ProductSalesDto {
    private Long productId;
    private String productName;
    private Integer quantitySold;
}
