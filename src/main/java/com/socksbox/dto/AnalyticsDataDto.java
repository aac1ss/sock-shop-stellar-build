
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
    private BigDecimal totalSales = BigDecimal.ZERO;
    private BigDecimal dailySales = BigDecimal.ZERO;
    private BigDecimal weeklySales = BigDecimal.ZERO;
    private BigDecimal monthlySales = BigDecimal.ZERO;
    
    private Long pendingOrders = 0L;
    private Long processingOrders = 0L;
    private Long shippedOrders = 0L;
    private Long deliveredOrders = 0L;
    private Long cancelledOrders = 0L;
    
    private Map<String, BigDecimal> salesByMonth;
}
