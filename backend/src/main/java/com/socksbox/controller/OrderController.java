
package com.socksbox.controller;

import com.socksbox.dto.CreateOrderRequestDto;
import com.socksbox.dto.OrderDto;
import com.socksbox.dto.UpdateOrderStatusDto;
import com.socksbox.entity.Address;
import com.socksbox.entity.Order;
import com.socksbox.service.OrderService;
import com.socksbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    // Customer endpoints
    @GetMapping("/orders")
    public ResponseEntity<List<OrderDto>> getUserOrders(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderDto> getOrderById(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        OrderDto order = orderService.getOrderById(id);
        
        // Check if order belongs to current user or user is admin
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"));
                
        if (!order.getUserId().equals(userId) && !isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        return ResponseEntity.ok(order);
    }

    @PostMapping("/orders")
    public ResponseEntity<OrderDto> createOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CreateOrderRequestDto createOrderRequest) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        
        Address shippingAddress = new Address(
                createOrderRequest.getStreet(),
                createOrderRequest.getCity(),
                createOrderRequest.getState(),
                createOrderRequest.getZipCode(),
                createOrderRequest.getCountry()
        );
        
        OrderDto createdOrder = orderService.createOrderFromCart(userId, shippingAddress);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    // Admin endpoints
    @GetMapping("/admin/orders")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/admin/orders/{id}/status")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateOrderStatusDto statusDto) {
        OrderDto updatedOrder = orderService.updateOrderStatus(id, Order.Status.valueOf(statusDto.getStatus()));
        return ResponseEntity.ok(updatedOrder);
    }
}
