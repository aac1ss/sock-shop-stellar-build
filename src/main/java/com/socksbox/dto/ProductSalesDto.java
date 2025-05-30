
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSalesDto {
    private Long productId;
    private String productName;
    private int totalQuantitySold = 0;
    private BigDecimal totalSalesAmount = BigDecimal.ZERO;
}
