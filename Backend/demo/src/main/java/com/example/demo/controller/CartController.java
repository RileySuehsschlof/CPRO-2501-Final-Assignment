package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.service.CartService;

import jakarta.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Create a new cart for a user by email
    @PostMapping("/create")
    public Cart createCart(@RequestParam String userEmail) {
        return cartService.createCart(userEmail);
    }

    // Add an item to the cart by id
    @PostMapping("/{cartId}/add-item")
    public CartItem addItemToCart(@PathVariable Integer cartId, @RequestParam @Min(1) Integer productId, @RequestParam @Min(1) Integer quantity) {
        return cartService.addItemToCart(cartId, productId, quantity);
    }

    // Get the total price of items in the cart
    @GetMapping("/{cartId}/total-price")
    public BigDecimal getTotalPrice(@PathVariable Integer cartId) {
        return cartService.getTotalPrice(cartId);
    }

    // Get cart by user email
    @GetMapping("/{userEmail}")
    public Cart getCartByEmail(@PathVariable String userEmail) {
        return cartService.getCartByEmail(userEmail);
    }
}
