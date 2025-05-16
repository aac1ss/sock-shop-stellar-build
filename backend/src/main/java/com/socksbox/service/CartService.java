
package com.socksbox.service;

import com.socksbox.dto.CartDto;
import com.socksbox.dto.CartItemDto;
import com.socksbox.entity.Cart;
import com.socksbox.entity.CartItem;
import com.socksbox.entity.Product;
import com.socksbox.entity.User;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CartItemRepository;
import com.socksbox.repository.CartRepository;
import com.socksbox.repository.ProductRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;

    public CartDto getCartByUserId(Long userId) {
        Cart cart = findOrCreateCart(userId);
        return convertToDto(cart);
    }

    @Transactional
    public CartDto addItemToCart(Long userId, CartItemDto cartItemDto) {
        Cart cart = findOrCreateCart(userId);
        
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        
        // Check if product is already in cart
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(cartItemDto.getProductId()) && 
                               equalOrNullStrings(item.getColor(), cartItemDto.getColor()) &&
                               equalOrNullStrings(item.getSize(), cartItemDto.getSize()))
                .findFirst()
                .orElse(null);
        
        if (existingItem != null) {
            // Update quantity of existing item
            existingItem.setQuantity(existingItem.getQuantity() + cartItemDto.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            // Add new item to cart
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(cartItemDto.getQuantity());
            newItem.setColor(cartItemDto.getColor());
            newItem.setSize(cartItemDto.getSize());
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }
        
        return convertToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto updateCartItemQuantity(Long userId, Long itemId, Integer quantity) {
        Cart cart = findOrCreateCart(userId);
        
        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        
        return convertToDto(cart);
    }

    @Transactional
    public CartDto removeItemFromCart(Long userId, Long itemId) {
        Cart cart = findOrCreateCart(userId);
        
        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        
        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);
        
        return convertToDto(cartRepository.save(cart));
    }

    @Transactional
    public CartDto clearCart(Long userId) {
        Cart cart = findOrCreateCart(userId);
        
        // Delete all cart items
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        
        return convertToDto(cartRepository.save(cart));
    }
    
    private Cart findOrCreateCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }
    
    private CartDto convertToDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setUserId(cart.getUser().getId());
        
        // Convert cart items to DTOs
        cartDto.setItems(cart.getItems().stream()
                .map(this::convertItemToDto)
                .collect(Collectors.toList()));
        
        // Calculate total amount
        BigDecimal totalAmount = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        cartDto.setTotalAmount(totalAmount);
        
        return cartDto;
    }
    
    private CartItemDto convertItemToDto(CartItem item) {
        CartItemDto itemDto = new CartItemDto();
        itemDto.setProductId(item.getProduct().getId());
        itemDto.setQuantity(item.getQuantity());
        itemDto.setColor(item.getColor());
        itemDto.setSize(item.getSize());
        return itemDto;
    }
    
    private boolean equalOrNullStrings(String s1, String s2) {
        if (s1 == null && s2 == null) return true;
        if (s1 == null || s2 == null) return false;
        return s1.equals(s2);
    }
}
