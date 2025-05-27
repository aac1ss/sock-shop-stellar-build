
package com.socksbox.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class AnalyticsDataDto {
    private BigDecimal totalSales;
    private Long totalOrders;
    private Long totalCustomers;
    private Long totalProducts;
    private Map<String, BigDecimal> monthlySales;
}
