
package com.socksbox.repository;

import com.socksbox.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.status = :status")
    Long countByStatus(Order.Status status);
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.date BETWEEN :startDate AND :endDate")
    Long countByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.status != 'CANCELLED'")
    Double getTotalSales();
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.date BETWEEN :startDate AND :endDate AND o.status != 'CANCELLED'")
    Double getSalesBetween(LocalDateTime startDate, LocalDateTime endDate);
}
