
package com.socksbox.service;

import com.socksbox.dto.AnalyticsDataDto;
import com.socksbox.dto.ProductSalesDto;
import com.socksbox.entity.Order;
import com.socksbox.repository.OrderItemRepository;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private UserRepository userRepository;

    public AnalyticsDataDto getSalesData() {
        AnalyticsDataDto analyticsData = new AnalyticsDataDto();
        
        // Get total sales
        Double totalSales = orderRepository.getTotalSales();
        analyticsData.setTotalSales(totalSales != null ? BigDecimal.valueOf(totalSales) : BigDecimal.ZERO);
        
        // Get total orders
        Long totalOrders = orderRepository.count();
        analyticsData.setTotalOrders(totalOrders);
        
        // Get total customers
        Long totalCustomers = userRepository.count();
        analyticsData.setTotalCustomers(totalCustomers);
        
        // Get monthly sales for the current year
        Map<String, BigDecimal> monthlySales = new LinkedHashMap<>();
        int currentYear = YearMonth.now().getYear();
        
        // Initialize all months with zero
        for (Month month : Month.values()) {
            monthlySales.put(month.getDisplayName(TextStyle.SHORT, Locale.ENGLISH), BigDecimal.ZERO);
        }
        
        // Get actual sales data for each month
        for (Month month : Month.values()) {
            LocalDateTime startOfMonth = LocalDateTime.of(currentYear, month, 1, 0, 0);
            LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusNanos(1);
            
            Double monthSales = orderRepository.getSalesBetween(startOfMonth, endOfMonth);
            if (monthSales != null) {
                monthlySales.put(month.getDisplayName(TextStyle.SHORT, Locale.ENGLISH), BigDecimal.valueOf(monthSales));
            }
        }
        analyticsData.setMonthlySales(monthlySales);
        
        // Get orders by status
        Map<String, Long> ordersByStatus = new HashMap<>();
        for (Order.Status status : Order.Status.values()) {
            Long count = orderRepository.countByStatus(status);
            ordersByStatus.put(status.name(), count);
        }
        analyticsData.setOrdersByStatus(ordersByStatus);
        
        return analyticsData;
    }

    public List<ProductSalesDto> getProductPerformanceData() {
        List<Object[]> topProducts = orderItemRepository.findTopSellingProducts();
        
        return topProducts.stream().map(data -> {
            ProductSalesDto productSales = new ProductSalesDto();
            productSales.setProductId((Long) data[0]);
            productSales.setProductName((String) data[1]);
            productSales.setTotalQuantitySold(((Number) data[2]).intValue());
            productSales.setTotalRevenue(BigDecimal.valueOf(((Number) data[3]).doubleValue()));
            return productSales;
        }).collect(Collectors.toList());
    }

    public Map<String, Long> getCustomerAcquisitionData() {
        // In a real application, you would query user registration data by month
        // For this example, we'll return dummy data
        Map<String, Long> acquisitionData = new LinkedHashMap<>();
        
        // Get current year
        int currentYear = YearMonth.now().getYear();
        
        // Initialize all months with zero
        for (Month month : Month.values()) {
            acquisitionData.put(month.getDisplayName(TextStyle.SHORT, Locale.ENGLISH), 0L);
        }
        
        // Add dummy data (in a real app, this would be actual user registration data)
        acquisitionData.put("Jan", 15L);
        acquisitionData.put("Feb", 21L);
        acquisitionData.put("Mar", 35L);
        acquisitionData.put("Apr", 28L);
        acquisitionData.put("May", 42L);
        acquisitionData.put("Jun", 55L);
        
        return acquisitionData;
    }
}
