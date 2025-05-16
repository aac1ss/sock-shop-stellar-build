
package com.socksbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDataDto {
    private BigDecimal totalSales;
    private Long totalOrders;
    private Long totalCustomers;
    private Map<String, BigDecimal> monthlySales;
    private Map<String, Long> ordersByStatus;
}
