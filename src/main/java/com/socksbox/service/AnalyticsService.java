
package com.socksbox.service;

import com.socksbox.dto.AnalyticsDataDto;
import com.socksbox.dto.ProductSalesDto;
import com.socksbox.entity.Order;
import com.socksbox.entity.OrderItem;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

    public AnalyticsDataDto getSalesData() {
        AnalyticsDataDto data = new AnalyticsDataDto();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfDay = now.truncatedTo(ChronoUnit.DAYS);
        LocalDateTime startOfWeek = now.minusDays(now.getDayOfWeek().getValue() - 1).truncatedTo(ChronoUnit.DAYS);
        LocalDateTime startOfMonth = now.withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
        
        // Total Sales
        Double totalSales = orderRepository.getTotalSales();
        data.setTotalSales(totalSales != null ? BigDecimal.valueOf(totalSales) : BigDecimal.ZERO);
        
        // Daily Sales
        Double dailySales = orderRepository.getSalesBetween(startOfDay, now);
        data.setDailySales(dailySales != null ? BigDecimal.valueOf(dailySales) : BigDecimal.ZERO);
        
        // Weekly Sales
        Double weeklySales = orderRepository.getSalesBetween(startOfWeek, now);
        data.setWeeklySales(weeklySales != null ? BigDecimal.valueOf(weeklySales) : BigDecimal.ZERO);
        
        // Monthly Sales
        Double monthlySales = orderRepository.getSalesBetween(startOfMonth, now);
        data.setMonthlySales(monthlySales != null ? BigDecimal.valueOf(monthlySales) : BigDecimal.ZERO);
        
        // Order Counts
        Long pendingOrders = orderRepository.countByStatus(Order.Status.PENDING);
        Long processingOrders = orderRepository.countByStatus(Order.Status.PROCESSING);
        Long shippedOrders = orderRepository.countByStatus(Order.Status.SHIPPED);
        Long deliveredOrders = orderRepository.countByStatus(Order.Status.DELIVERED);
        Long cancelledOrders = orderRepository.countByStatus(Order.Status.CANCELLED);
        
        data.setPendingOrders(pendingOrders != null ? pendingOrders : 0L);
        data.setProcessingOrders(processingOrders != null ? processingOrders : 0L);
        data.setShippedOrders(shippedOrders != null ? shippedOrders : 0L);
        data.setDeliveredOrders(deliveredOrders != null ? deliveredOrders : 0L);
        data.setCancelledOrders(cancelledOrders != null ? cancelledOrders : 0L);
        
        // Orders by Date
        LocalDateTime startOfSixMonthsAgo = now.minusMonths(6).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
        List<Order> recentOrders = orderRepository.findAll().stream()
                .filter(order -> !order.getDate().isBefore(startOfSixMonthsAgo))
                .collect(Collectors.toList());
        
        Map<String, BigDecimal> salesByMonth = new LinkedHashMap<>();
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).truncatedTo(ChronoUnit.DAYS);
            String monthKey = monthStart.getMonth().toString() + " " + monthStart.getYear();
            salesByMonth.put(monthKey, BigDecimal.ZERO);
        }
        
        for (Order order : recentOrders) {
            if (order.getStatus() != Order.Status.CANCELLED) {
                String monthKey = order.getDate().getMonth().toString() + " " + order.getDate().getYear();
                if (salesByMonth.containsKey(monthKey)) {
                    BigDecimal currentTotal = salesByMonth.get(monthKey);
                    salesByMonth.put(monthKey, currentTotal.add(order.getTotalAmount()));
                }
            }
        }
        
        data.setSalesByMonth(salesByMonth);
        
        return data;
    }

    public List<ProductSalesDto> getProductPerformanceData() {
        // Get all completed orders
        List<Order> completedOrders = orderRepository.findAll().stream()
                .filter(order -> order.getStatus() != Order.Status.CANCELLED)
                .collect(Collectors.toList());
        
        // Aggregate sales by product
        Map<Long, ProductSalesDto> productSalesMap = new HashMap<>();
        
        for (Order order : completedOrders) {
            for (OrderItem item : order.getItems()) {
                Long productId = item.getProduct().getId();
                
                ProductSalesDto productSales = productSalesMap.getOrDefault(productId, new ProductSalesDto());
                productSales.setProductId(productId);
                productSales.setProductName(item.getName());
                
                // Update sales quantities and amounts
                int quantity = item.getQuantity();
                BigDecimal salesAmount = item.getPrice().multiply(BigDecimal.valueOf(quantity));
                
                productSales.setTotalQuantitySold(productSales.getTotalQuantitySold() + quantity);
                productSales.setTotalSalesAmount(productSales.getTotalSalesAmount().add(salesAmount));
                
                productSalesMap.put(productId, productSales);
            }
        }
        
        // Convert to list and sort by total sales amount (descending)
        List<ProductSalesDto> productSalesList = new ArrayList<>(productSalesMap.values());
        productSalesList.sort((a, b) -> b.getTotalSalesAmount().compareTo(a.getTotalSalesAmount()));
        
        return productSalesList;
    }

    public Map<String, Long> getCustomerAcquisitionData() {
        // Get all users with role CUSTOMER
        long totalCustomers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.CUSTOMER)
                .count();
        
        // Calculate customers who have made orders
        Set<Long> customersWithOrders = orderRepository.findAll().stream()
                .map(order -> order.getUser().getId())
                .collect(Collectors.toSet());
        
        long activeCustomers = customersWithOrders.size();
        long inactiveCustomers = totalCustomers - activeCustomers;
        
        Map<String, Long> customerStats = new HashMap<>();
        customerStats.put("totalCustomers", totalCustomers);
        customerStats.put("activeCustomers", activeCustomers);
        customerStats.put("inactiveCustomers", inactiveCustomers);
        
        return customerStats;
    }
}
