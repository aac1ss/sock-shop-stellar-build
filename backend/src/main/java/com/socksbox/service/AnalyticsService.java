
package com.socksbox.service;

import com.socksbox.dto.AnalyticsDataDto;
import com.socksbox.dto.ProductSalesDto;
import com.socksbox.entity.Order;
import com.socksbox.entity.OrderItem;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public AnalyticsDataDto getSalesData() {
        AnalyticsDataDto data = new AnalyticsDataDto();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.truncatedTo(ChronoUnit.DAYS);
        LocalDateTime startOfWeek = now.minusDays(now.getDayOfWeek().getValue() - 1).truncatedTo(ChronoUnit.DAYS);
        LocalDateTime startOfMonth = now.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
        
        // Total Sales
        BigDecimal totalSales = orderRepository.getTotalSales();
        data.setTotalSales(totalSales != null ? totalSales : BigDecimal.ZERO);
        
        // Daily Sales
        BigDecimal dailySales = orderRepository.getSalesBetween(startOfDay, now);
        data.setDailySales(dailySales != null ? dailySales : BigDecimal.ZERO);
        
        // Weekly Sales
        BigDecimal weeklySales = orderRepository.getSalesBetween(startOfWeek, now);
        data.setWeeklySales(weeklySales != null ? weeklySales : BigDecimal.ZERO);
        
        // Monthly Sales
        BigDecimal monthlySales = orderRepository.getSalesBetween(startOfMonth, now);
        data.setMonthlySales(monthlySales != null ? monthlySales : BigDecimal.ZERO);
        
        // Order Counts
        data.setPendingOrders(orderRepository.countByStatus(Order.Status.PENDING));
        data.setProcessingOrders(orderRepository.countByStatus(Order.Status.PROCESSING));
        data.setShippedOrders(orderRepository.countByStatus(Order.Status.SHIPPED));
        data.setDeliveredOrders(orderRepository.countByStatus(Order.Status.DELIVERED));
        data.setCancelledOrders(orderRepository.countByStatus(Order.Status.CANCELLED));
        
        // Sales by Month
        Map<String, BigDecimal> salesByMonth = new LinkedHashMap<>();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            LocalDateTime monthEnd = monthStart.plusMonths(1);
            String monthKey = monthStart.getMonth().toString() + " " + monthStart.getYear();
            
            BigDecimal monthSales = orderRepository.getSalesBetween(monthStart, monthEnd);
            salesByMonth.put(monthKey, monthSales != null ? monthSales : BigDecimal.ZERO);
        }
        data.setSalesByMonth(salesByMonth);
        
        return data;
    }

    public List<ProductSalesDto> getProductPerformanceData() {
        List<Order> completedOrders = orderRepository.findAll().stream()
                .filter(order -> order.getStatus() != Order.Status.CANCELLED)
                .collect(Collectors.toList());
        
        Map<Long, ProductSalesDto> productSalesMap = new HashMap<>();
        
        for (Order order : completedOrders) {
            for (OrderItem item : order.getItems()) {
                Long productId = item.getProduct().getId();
                
                ProductSalesDto productSales = productSalesMap.getOrDefault(productId, new ProductSalesDto());
                productSales.setProductId(productId);
                productSales.setProductName(item.getName());
                
                int quantity = item.getQuantity();
                BigDecimal salesAmount = item.getPrice().multiply(BigDecimal.valueOf(quantity));
                
                productSales.setTotalQuantitySold(productSales.getTotalQuantitySold() + quantity);
                productSales.setTotalSalesAmount(productSales.getTotalSalesAmount().add(salesAmount));
                
                productSalesMap.put(productId, productSales);
            }
        }
        
        return new ArrayList<>(productSalesMap.values())
                .stream()
                .sorted((a, b) -> b.getTotalSalesAmount().compareTo(a.getTotalSalesAmount()))
                .collect(Collectors.toList());
    }

    public Map<String, Long> getCustomerAcquisitionData() {
        Map<String, Long> acquisitionData = new LinkedHashMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            LocalDateTime monthEnd = monthStart.plusMonths(1);
            String monthKey = monthStart.getMonth().toString() + " " + monthStart.getYear();
            
            long customerCount = userRepository.findAll().stream()
                    .filter(user -> user.getCreatedAt().isAfter(monthStart) && user.getCreatedAt().isBefore(monthEnd))
                    .count();
                    
            acquisitionData.put(monthKey, customerCount);
        }
        
        return acquisitionData;
    }
}
