
package com.socksbox.repository;

import com.socksbox.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.id = :cartId AND ci.product.id = :productId AND ci.color = :color AND ci.size = :size")
    Optional<CartItem> findByCartIdAndProductIdAndColorAndSize(
        @Param("cartId") Long cartId, 
        @Param("productId") Long productId, 
        @Param("color") String color, 
        @Param("size") String size
    );
}
