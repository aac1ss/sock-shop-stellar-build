
package com.socksbox.service;

import com.socksbox.dto.OrderDto;
import com.socksbox.dto.OrderItemDto;
import com.socksbox.entity.*;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderItemRepository orderItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private ProductRepository productRepository;

    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OrderDto getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return convertToDto(order);
    }

    @Transactional
    public OrderDto createOrderFromCart(Long userId, Address shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        
        if (cart.getItems().isEmpty()) {
            throw new IllegalStateException("Cannot create order from empty cart");
        }
        
        // Create new order
        Order order = new Order();
        order.setUser(user);
        order.setCustomerName(user.getName());
        order.setCustomerEmail(user.getEmail());
        order.setStatus(Order.Status.PENDING);
        order.setDate(LocalDateTime.now());
        order.setShippingAddress(shippingAddress);
        
        // Generate tracking number
        order.setTrackingNumber(UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase());
        
        // Calculate total amount and create order items
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setName(cartItem.getProduct().getName());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setColor(cartItem.getColor());
            orderItem.setSize(cartItem.getSize());
            
            // Get first image or empty string
            String imageUrl = cartItem.getProduct().getImages().isEmpty() ? 
                    "" : cartItem.getProduct().getImages().get(0);
            orderItem.setImageUrl(imageUrl);
            
            order.getItems().add(orderItem);
            
            // Add to total amount
            totalAmount = totalAmount.add(
                    cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            
            // Update inventory
            Product product = cartItem.getProduct();
            if (product.getInventory() != null) {
                product.setInventory(product.getInventory() - cartItem.getQuantity());
                productRepository.save(product);
            }
        }
        
        order.setTotalAmount(totalAmount);
        
        // Save order and items
        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after creating order
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);
        
        return convertToDto(savedOrder);
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, Order.Status newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        order.setStatus(newStatus);
        
        return convertToDto(orderRepository.save(order));
    }

    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setCustomerName(order.getCustomerName());
        orderDto.setCustomerEmail(order.getCustomerEmail());
        orderDto.setStatus(order.getStatus());
        orderDto.setTotalAmount(order.getTotalAmount());
        orderDto.setDate(order.getDate());
        orderDto.setTrackingNumber(order.getTrackingNumber());
        orderDto.setShippingAddress(order.getShippingAddress());
        
        // Convert order items to DTOs
        orderDto.setItems(order.getItems().stream()
                .map(this::convertItemToDto)
                .collect(Collectors.toList()));
        
        return orderDto;
    }
    
    private OrderItemDto convertItemToDto(OrderItem item) {
        OrderItemDto itemDto = new OrderItemDto();
        itemDto.setId(item.getId());
        itemDto.setProductId(item.getProduct().getId());
        itemDto.setName(item.getName());
        itemDto.setPrice(item.getPrice());
        itemDto.setQuantity(item.getQuantity());
        itemDto.setColor(item.getColor());
        itemDto.setSize(item.getSize());
        itemDto.setImageUrl(item.getImageUrl());
        return itemDto;
    }
}
