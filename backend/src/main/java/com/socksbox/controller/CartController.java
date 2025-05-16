
package com.socksbox.controller;

import com.socksbox.dto.CartDto;
import com.socksbox.dto.CartItemDto;
import com.socksbox.dto.UpdateCartItemDto;
import com.socksbox.service.CartService;
import com.socksbox.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<CartDto> getUserCart(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<CartDto> addItemToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody CartItemDto cartItemDto) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        CartDto updatedCart = cartService.addItemToCart(userId, cartItemDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(updatedCart);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartDto> updateCartItemQuantity(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemDto updateDto) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        CartDto updatedCart = cartService.updateCartItemQuantity(userId, itemId, updateDto.getQuantity());
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartDto> removeItemFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long itemId) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        CartDto updatedCart = cartService.removeItemFromCart(userId, itemId);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping
    public ResponseEntity<CartDto> clearCart(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        Long userId = userService.getUserByEmail(email).getId();
        CartDto emptyCart = cartService.clearCart(userId);
        return ResponseEntity.ok(emptyCart);
    }
}
