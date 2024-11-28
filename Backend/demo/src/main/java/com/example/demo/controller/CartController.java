package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.service.CartService;
import com.example.demo.DTO.AddItemRequestDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;

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
    public CartItem addItemToCart(@PathVariable Integer cartId, @RequestBody AddItemRequestDTO addItemRequest) {
        return cartService.addItemToCart(cartId, addItemRequest.getProductId(), addItemRequest.getQuantity());
    }

    // Get the total price of items in the cart
    @GetMapping("/{cartId}/total-price")
    public BigDecimal getTotalPrice(@PathVariable Integer cartId) {
        return cartService.getTotalPrice(cartId);
    }

    // Get cart by user email
    @GetMapping("/{userEmail}")
    public Cart getCartByEmail(@PathVariable String userEmail) {
        try {
            // Decode the email parameter
            String decodedEmail = URLDecoder.decode(userEmail, "UTF-8");
            
            // Fetch the cart based on the decoded email
            return cartService.getCartByEmail(decodedEmail);
        } catch (UnsupportedEncodingException e) {
            // Handle the exception if decoding fails
            e.printStackTrace();
            throw new RuntimeException("Error decoding the email: " + e.getMessage());
        }
    }

    // Add an item to the cart by user email
    @PostMapping("/{userEmail}/add-item-by-email")
    public CartItem addItemToCart(@PathVariable String userEmail, @RequestBody AddItemRequestDTO addItemRequest) {
        try {
            // Decode the email parameter
            String decodedEmail = URLDecoder.decode(userEmail, "UTF-8");
            
            // Add item to the cart based on the decoded email
            return cartService.addItemToCartByEmail(decodedEmail, addItemRequest.getProductId(), addItemRequest.getQuantity());
        } catch (UnsupportedEncodingException e) {
            // Handle the exception if decoding fails
            e.printStackTrace();
            throw new RuntimeException("Error decoding the email: " + e.getMessage());
        }
    }

    @DeleteMapping("/remove-item/{cartItemId}")
    public ResponseEntity<String> removeCartItemById(@PathVariable Integer cartItemId) {
        cartService.removeCartItemById(cartItemId);
        return ResponseEntity.ok("Item removed successfully.");
    }
}
