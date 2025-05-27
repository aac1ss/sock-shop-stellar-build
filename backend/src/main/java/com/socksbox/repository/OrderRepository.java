
package com.socksbox.repository;

import com.socksbox.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByDateDesc(Long userId);
    List<Order> findByStatus(Order.Status status);
    
    @Query("SELECT o FROM Order o WHERE o.date BETWEEN :startDate AND :endDate AND o.status = :status")
    List<Order> findByDateBetweenAndStatus(@Param("startDate") LocalDateTime startDate, 
                                          @Param("endDate") LocalDateTime endDate, 
                                          @Param("status") Order.Status status);
}
