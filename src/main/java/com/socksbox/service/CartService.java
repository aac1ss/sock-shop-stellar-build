
package com.socksbox.service;

import com.socksbox.dto.CartDto;
import com.socksbox.dto.CartItemDto;
import com.socksbox.entity.Cart;
import com.socksbox.entity.CartItem;
import com.socksbox.entity.Product;
import com.socksbox.entity.User;
import com.socksbox.exception.InsufficientStockException;
import com.socksbox.exception.ResourceNotFoundException;
import com.socksbox.repository.CartRepository;
import com.socksbox.repository.ProductRepository;
import com.socksbox.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public CartDto getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user with id " + userId));
        return convertToDto(cart);
    }

    @Transactional
    public CartDto addItemToCart(Long userId, CartItemDto cartItemDto) {
        // Find user's cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    // Create new cart if not exists
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
        
        // Find product
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + cartItemDto.getProductId()));
        
        // Check stock
        if (product.getInventory() < cartItemDto.getQuantity()) {
            throw new InsufficientStockException("Not enough stock available for product " + product.getName());
        }
        
        // Find if product already in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(cartItemDto.getProductId()) &&
                               item.getColor().equals(cartItemDto.getColor()) &&
                               item.getSize().equals(cartItemDto.getSize()))
                .findFirst();
        
        if (existingItem.isPresent()) {
            // Update quantity
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + cartItemDto.getQuantity();
            
            // Check if new quantity exceeds stock
            if (product.getInventory() < newQuantity) {
                throw new InsufficientStockException("Not enough stock available for product " + product.getName());
            }
            
            item.setQuantity(newQuantity);
        } else {
            // Add new item
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(cartItemDto.getQuantity());
            newItem.setColor(cartItemDto.getColor());
            newItem.setSize(cartItemDto.getSize());
            cart.getItems().add(newItem);
        }
        
        Cart updatedCart = cartRepository.save(cart);
        return convertToDto(updatedCart);
    }

    @Transactional
    public CartDto updateCartItemQuantity(Long userId, Long cartItemId, int quantity) {
        // Find user's cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user with id " + userId));
        
        // Find cart item
        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id " + cartItemId));
        
        // Check if quantity is valid
        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.getItems().remove(cartItem);
        } else {
            // Check stock
            Product product = cartItem.getProduct();
            if (product.getInventory() < quantity) {
                throw new InsufficientStockException("Not enough stock available for product " + product.getName());
            }
            
            cartItem.setQuantity(quantity);
        }
        
        Cart updatedCart = cartRepository.save(cart);
        return convertToDto(updatedCart);
    }

    @Transactional
    public CartDto removeItemFromCart(Long userId, Long cartItemId) {
        // Find user's cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user with id " + userId));
        
        // Find and remove cart item
        boolean removed = cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        
        if (!removed) {
            throw new ResourceNotFoundException("Cart item not found with id " + cartItemId);
        }
        
        Cart updatedCart = cartRepository.save(cart);
        return convertToDto(updatedCart);
    }

    @Transactional
    public CartDto clearCart(Long userId) {
        // Find user's cart
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user with id " + userId));
        
        cart.getItems().clear();
        Cart updatedCart = cartRepository.save(cart);
        return convertToDto(updatedCart);
    }

    private CartDto convertToDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setId(cart.getId());
        cartDto.setUserId(cart.getUser().getId());
        
        List<CartItemDto> itemDtos = new ArrayList<>();
        for (CartItem item : cart.getItems()) {
            CartItemDto itemDto = new CartItemDto();
            itemDto.setId(item.getId());
            itemDto.setProductId(item.getProduct().getId());
            itemDto.setProductName(item.getProduct().getName());
            itemDto.setQuantity(item.getQuantity());
            itemDto.setPrice(item.getProduct().getPrice());
            itemDto.setColor(item.getColor());
            itemDto.setSize(item.getSize());
            
            // Get the first image as thumbnail
            if (!item.getProduct().getImages().isEmpty()) {
                itemDto.setImageUrl(item.getProduct().getImages().get(0));
            }
            
            itemDtos.add(itemDto);
        }
        
        cartDto.setItems(itemDtos);
        return cartDto;
    }
}
