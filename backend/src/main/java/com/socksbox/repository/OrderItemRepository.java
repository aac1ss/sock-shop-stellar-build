
package com.socksbox.repository;

import com.socksbox.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderId(Long orderId);
    
    @Query("SELECT oi.product.id, oi.name, SUM(oi.quantity), SUM(oi.price * oi.quantity) FROM OrderItem oi GROUP BY oi.product.id, oi.name ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> findTopSellingProducts();
}
