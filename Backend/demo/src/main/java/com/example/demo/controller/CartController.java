package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping // Get all carts
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> carts = cartService.getAllCarts();
        return ResponseEntity.ok(carts);
    }

    @GetMapping("/{id}") // Get cart by ID
    public ResponseEntity<Cart> getCartById(@PathVariable Integer id) {
        return cartService.getCartById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping // Create new cart
    public ResponseEntity<Cart> createCart(@RequestBody @Valid Cart cart) {
        Cart savedCart = cartService.saveCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCart);
    }

    @DeleteMapping("/{id}") // delete cart by ID
    public ResponseEntity<Void> deleteCartById(@PathVariable Integer id) {
        cartService.deleteCartById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<String> addItemToCart(
            @PathVariable Integer cartId,
            @RequestParam Integer productId,
            @RequestParam Integer quantity) {
        try {
            cartService.addItemToCart(cartId, productId, quantity);
            return ResponseEntity.ok("Item added to cart successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<String> removeItemFromCart(@PathVariable Integer cartId, @PathVariable Integer itemId) {
        try {
            cartService.removeItemFromCart(cartId, itemId);
            return ResponseEntity.ok("Item removed from cart successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
