
package com.socksbox.service;

import com.socksbox.dto.OrderDto;
import com.socksbox.entity.*;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CartRepository;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    public List<OrderDto> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserIdOrderByDateDesc(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
        return convertToDto(order);
    }

    @Transactional
    public OrderDto createOrderFromCart(Long userId, Address shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user " + userId));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot create order from empty cart");
        }

        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        order.setTotalAmount(cart.getTotalAmount());

        // Create order items from cart items
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setName(cartItem.getProduct().getName());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setColor(cartItem.getColor());
            orderItem.setSize(cartItem.getSize());
            
            if (!cartItem.getProduct().getImages().isEmpty()) {
                orderItem.setImageUrl(cartItem.getProduct().getImages().get(0));
            }
            
            order.getItems().add(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        // Clear the cart
        cartService.clearCart(userId);

        return convertToDto(savedOrder);
    }

    public OrderDto updateOrderStatus(Long orderId, Order.Status status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + orderId));

        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return convertToDto(updatedOrder);
    }

    private OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setUserId(order.getUser().getId());
        dto.setCustomerName(order.getUser().getName());
        dto.setCustomerEmail(order.getUser().getEmail());
        dto.setStatus(order.getStatus());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setDate(order.getDate());
        dto.setTrackingNumber(order.getTrackingNumber());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setItems(order.getItems().stream()
                .map(this::convertOrderItemToDto)
                .collect(Collectors.toList()));
        return dto;
    }

    private com.socksbox.dto.OrderItemDto convertOrderItemToDto(OrderItem orderItem) {
        com.socksbox.dto.OrderItemDto dto = new com.socksbox.dto.OrderItemDto();
        dto.setId(orderItem.getId());
        dto.setProductId(orderItem.getProduct().getId());
        dto.setName(orderItem.getName());
        dto.setPrice(orderItem.getPrice());
        dto.setQuantity(orderItem.getQuantity());
        dto.setColor(orderItem.getColor());
        dto.setSize(orderItem.getSize());
        dto.setImageUrl(orderItem.getImageUrl());
        return dto;
    }
}
