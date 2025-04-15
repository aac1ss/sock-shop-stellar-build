
package com.socksbox.service;

import com.socksbox.dto.OrderDto;
import com.socksbox.dto.OrderItemDto;
import com.socksbox.entity.*;
import com.socksbox.exception.InsufficientStockException;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CartRepository;
import com.socksbox.repository.OrderRepository;
import com.socksbox.repository.ProductRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

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
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
        return convertToDto(order);
    }

    @Transactional
    public OrderDto createOrderFromCart(Long userId, Address shippingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user with id " + userId));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot create order from empty cart");
        }

        // Validate stock and reserve inventory
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();
            int quantity = cartItem.getQuantity();
            
            if (product.getInventory() < quantity) {
                throw new InsufficientStockException("Not enough stock available for product " + product.getName());
            }
            
            // Update inventory
            product.setInventory(product.getInventory() - quantity);
            productRepository.save(product);
        }

        // Create new order
        Order order = new Order();
        order.setUser(user);
        order.setCustomerName(user.getName());
        order.setCustomerEmail(user.getEmail());
        order.setStatus(Order.Status.PENDING);
        order.setDate(LocalDateTime.now());
        order.setShippingAddress(shippingAddress);
        order.setTrackingNumber(generateTrackingNumber());

        // Calculate total amount and add items to order
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setName(cartItem.getProduct().getName());
            orderItem.setPrice(cartItem.getProduct().getPrice());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setColor(cartItem.getColor());
            orderItem.setSize(cartItem.getSize());
            
            // Get the first image as thumbnail
            if (!cartItem.getProduct().getImages().isEmpty()) {
                orderItem.setImageUrl(cartItem.getProduct().getImages().get(0));
            }
            
            orderItems.add(orderItem);
            
            // Add to total
            BigDecimal itemTotal = cartItem.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            totalAmount = totalAmount.add(itemTotal);
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);
        
        Order savedOrder = orderRepository.save(order);
        
        // Clear the cart after creating the order
        cart.getItems().clear();
        cartRepository.save(cart);
        
        return convertToDto(savedOrder);
    }

    @Transactional
    public OrderDto updateOrderStatus(Long id, Order.Status status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
        
        order.setStatus(status);
        
        // If order is cancelled, return items to inventory
        if (status == Order.Status.CANCELLED) {
            for (OrderItem orderItem : order.getItems()) {
                Product product = orderItem.getProduct();
                product.setInventory(product.getInventory() + orderItem.getQuantity());
                productRepository.save(product);
            }
        }
        
        Order updatedOrder = orderRepository.save(order);
        return convertToDto(updatedOrder);
    }

    private String generateTrackingNumber() {
        return "SOCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private OrderDto convertToDto(Order order) {
        OrderDto orderDto = new OrderDto();
        orderDto.setId(order.getId());
        orderDto.setUserId(order.getUser().getId());
        orderDto.setCustomerName(order.getCustomerName());
        orderDto.setCustomerEmail(order.getCustomerEmail());
        orderDto.setStatus(order.getStatus().name());
        orderDto.setTotalAmount(order.getTotalAmount());
        orderDto.setDate(order.getDate());
        orderDto.setTrackingNumber(order.getTrackingNumber());
        orderDto.setShippingAddress(order.getShippingAddress());

        List<OrderItemDto> itemDtos = new ArrayList<>();
        for (OrderItem item : order.getItems()) {
            OrderItemDto itemDto = new OrderItemDto();
            itemDto.setId(item.getId());
            itemDto.setProductId(item.getProduct().getId());
            itemDto.setName(item.getName());
            itemDto.setPrice(item.getPrice());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setColor(item.getColor());
            itemDto.setSize(item.getSize());
            itemDto.setImageUrl(item.getImageUrl());
            itemDtos.add(itemDto);
        }
        
        orderDto.setItems(itemDtos);
        return orderDto;
    }
}
