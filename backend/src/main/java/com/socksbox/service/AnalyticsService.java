
package com.socksbox.service;

import com.socksbox.dto.AnalyticsDataDto;
import com.socksbox.dto.ProductSalesDto;
import com.socksbox.entity.Order;
import com.socksbox.entity.User;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.ProductRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public AnalyticsDataDto getSalesData() {
        AnalyticsDataDto analyticsData = new AnalyticsDataDto();
        
        // Calculate total sales
        List<Order> completedOrders = orderRepository.findByStatus(Order.Status.DELIVERED);
        BigDecimal totalSales = completedOrders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        analyticsData.setTotalSales(totalSales);
        analyticsData.setTotalOrders((long) orderRepository.findAll().size());
        analyticsData.setTotalCustomers(userRepository.countByRole(User.Role.CUSTOMER));
        analyticsData.setTotalProducts((long) productRepository.findAll().size());
        
        // Calculate monthly sales for the chart
        Map<String, BigDecimal> monthlySales = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        
        for (int i = 0; i < 12; i++) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            LocalDateTime monthEnd = monthStart.plusMonths(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);
            
            List<Order> monthlyOrders = orderRepository.findByDateBetweenAndStatus(monthStart, monthEnd, Order.Status.DELIVERED);
            BigDecimal monthlyTotal = monthlyOrders.stream()
                    .map(Order::getTotalAmount)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            
            String monthKey = monthStart.getMonth().toString() + " " + monthStart.getYear();
            monthlySales.put(monthKey, monthlyTotal);
        }
        
        analyticsData.setMonthlySales(monthlySales);
        return analyticsData;
    }

    public List<ProductSalesDto> getProductPerformanceData() {
        return orderRepository.findAll().stream()
                .flatMap(order -> order.getItems().stream())
                .collect(Collectors.groupingBy(
                    item -> item.getProduct().getId(),
                    Collectors.summingInt(item -> item.getQuantity())
                ))
                .entrySet().stream()
                .map(entry -> {
                    ProductSalesDto dto = new ProductSalesDto();
                    dto.setProductId(entry.getKey());
                    dto.setProductName(productRepository.findById(entry.getKey()).get().getName());
                    dto.setQuantitySold(entry.getValue());
                    return dto;
                })
                .sorted((a, b) -> Integer.compare(b.getQuantitySold(), a.getQuantitySold()))
                .limit(10)
                .collect(Collectors.toList());
    }

    public Map<String, Long> getCustomerAcquisitionData() {
        Map<String, Long> acquisitionData = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        
        for (int i = 0; i < 12; i++) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            LocalDateTime monthEnd = monthStart.plusMonths(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);
            
            Long customerCount = userRepository.countCustomersRegisteredBetween(User.Role.CUSTOMER, monthStart, monthEnd);
            String monthKey = monthStart.getMonth().toString() + " " + monthStart.getYear();
            acquisitionData.put(monthKey, customerCount);
        }
        
        return acquisitionData;
    }
}
